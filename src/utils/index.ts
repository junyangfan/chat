import { IRouteConfig } from '@/router'
import { LANG } from '@/enum'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { lookupLocalStorage } from '@/i18n'

// 获取指定storeReduce数据
export const storeReducer = (storeName: string) => useSelector((store: RootState) => store[storeName])

// 获取全局环境变量
export const useEnv = (key: string) => import.meta.env[key]

// 是否是正式环境
export const isProd = () => import.meta.env.VITE_APP_ENV === 'production'

/**
 * @description 获取本地语种
 */
export const getLocalLang = () => (window.localStorage.getItem(lookupLocalStorage) as string) || LANG.CN

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
	const value = window.localStorage.getItem(key)
	try {
		return JSON.parse(window.localStorage.getItem(key) as string)
	} catch (error) {
		return value
	}
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localDel = (key: string) => {
	window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
	window.localStorage.clear()
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: IRouteConfig[] = []): IRouteConfig => {
	let result: IRouteConfig = {
		element: undefined,
		path: '',
	}
	for (let item of routes) {
		if (item.path === path) {
			return item
		}
		if (item.children) {
			const res = searchRoute(path, item.children)
			if (Object.keys(res).length) {
				result = res
			}
		}
	}

	return result
}
