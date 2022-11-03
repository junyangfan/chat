/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import qs from 'qs'
import { getLocalLang, isProd } from '@/utils'
import { axiosConfig } from '@/config'
import { message } from 'antd'
import { MD5 } from 'crypto-js'
import store from '@/store'
import i18n from '@/i18n'

const CancelToken = axios.CancelToken
const getToken = () => store.getState().globalReducer.token

const {
	baseURL_dev,
	baseURL_prod,
	timeout,
	withCredentials,
	retries,
	shouldResetTimeout,
	retryDelay,
} = axiosConfig

// 请求列表
const pendingReqKeys = new Map()

// 配置通用请求头
const headers = {
	language: getLocalLang(),
	'Content-Type': 'application/json',
	Authorization: getToken(),
}

// 创建axios实例
const axiosService = axios.create({
	baseURL: isProd() ? baseURL_prod : baseURL_dev,
	timeout,
	withCredentials,
})

axiosRetry(axiosService, {
	retries,
	shouldResetTimeout,
	retryDelay: (retryCount) => retryCount * retryDelay,
	retryCondition: (error) => {
		// return axiosRetry.isNetworkOrIdempotentRequestError(error)
		return error.message.includes('timeout')
	},
})

axiosService.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		config.headers = {
			...headers,
			...config.headers,
		}
		// config.cancelRepeat
		// 字段用来判断是否需要取消重复请求，
		// - before取消之前的请求
		// - after取消之后的请求
		// - 没配置字段或者为undefined则不取消重复请求
		reqIntercept(config)
		return config
	},
	(error) => errorHandler(error)
)

axiosService.interceptors.response.use(
	(response: AxiosResponse) => {
		const { config, data } = response
		rspIntercept(config)
		// 错误处理
		if (data && !data.success) {
			return errorHandler(data)
		}

		// do something.....

		return data
	},
	(error) => {
		const { response, config } = error
		rspIntercept(config)
		if (response) {
			return errorHandler(error)
		}
		if (axios.isCancel(error)) {
			return
		}
		return errorHandler(error)
	}
)

export default axiosService

// 获取请求key
const getReqKey = (config: AxiosRequestConfig) => {
	// 请求方式、请求地址、请求参数生成的字符串来作为是否重复请求的依据
	const { method, url, params, data } = config
	return MD5(
		[method, url, qs.stringify(params), qs.stringify(data)].join('&')
	).toString()
}

// 请求拦截调用
const reqIntercept = (config: AxiosRequestConfig) => {
	if (!config) {
		return
	}
	const key = getReqKey(config)
	if (config.cancelRepeat) {
		// 取消之前的请求
		if (config.cancelRepeat === AxiosCancelReq.BEFORE) {
			if (pendingReqKeys.has(key)) {
				// 取消请求 & 移除key
				pendingReqKeys.get(key)()
				pendingReqKeys.delete(key)
			}
			config.cancelToken = new CancelToken((cancel) => {
				pendingReqKeys.set(key, cancel)
			})
		}
		// 取消之后的请求
		if (config.cancelRepeat === AxiosCancelReq.AFTER) {
			if (pendingReqKeys.has(key)) {
				return (config.cancelToken = new CancelToken((cancel) => cancel()))
			}
			pendingReqKeys.set(key, null)
		}
	}
}

// 响应拦截调用
const rspIntercept = (config: AxiosRequestConfig) => {
	if (!config) {
		return
	}
	const key = getReqKey(config)
	const fn = pendingReqKeys.get(key)
	fn && fn()
	pendingReqKeys.delete(key)
}

// 错误处理
const errorHandler = (error: any) => {
	const isCusMsg = error.code && errorMessage.findIndex((i) => i.code === error.code) !== -1
	if (isCusMsg) {
		const msg = errorMessage.find((i) => i.code === error.code)?.msg
		message.error(`错误码：${error.code}，${msg}`)
		return Promise.reject(error)
	}
	message.error('未知异常，请联系管理员！')
	return Promise.reject(error)
}

export enum AxiosCancelReq {
	BEFORE = 'before',
	AFTER = 'after',
}

const errorMessage = [
	{ code: 400, msg: '错误请求' },
	{ code: 401, msg: '未授权，请刷新系统重新登录' },
	{ code: 403, msg: '拒绝访问' },
	{ code: 404, msg: '请求地址出错' },
	{ code: 405, msg: '请求方法未允许' },
	{ code: 408, msg: '请求超时' },
	{ code: 500, msg: '服务器内部错误' },
	{ code: 501, msg: '服务未实现' },
	{ code: 502, msg: '网关错误' },
	{ code: 503, msg: '服务不可用' },
	{ code: 504, msg: '网关超时' },
	{ code: 505, msg: 'HTTP版本不受支持' },
]
