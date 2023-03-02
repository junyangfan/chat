
// axios配置
export const axiosConfig: AxiosConfig = {
	baseURL_dev: 'http://127.0.0.1:9675',	// 测试环境地址
	baseURL_prod: '',		// 正式环境地址
	timeout: 3000,	// 超时时间
	withCredentials: false, // 是否允许携带cookie
	retries: 0,	// 请求失败重试次数
	shouldResetTimeout: true,	// 重试的时候是否重置超时时间
	retryDelay: 0,	// 每个请求之间的重试延迟时间(ms)
}


interface AxiosConfig {
	baseURL_dev: string
	baseURL_prod: string
	timeout: number
	withCredentials: boolean
	retries: number
	shouldResetTimeout: boolean
	retryDelay: any,
}
