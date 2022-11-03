import axios from 'axios'

declare module 'axios' {
	export interface AxiosRequestConfig {
		cancelRepeat?: 'before' | 'after'
	}
	export default axios
}
