import { useLocation } from 'react-router-dom'
import { searchRoute, storeReducer } from '@/utils'
import { routerConfig } from '@/router'
import Redirect from '@/components/Redirect'

const AuthRouter = (props: { children: JSX.Element }) => {
	// 获取跳转pathname
	const { pathname } = useLocation()
	// 获取对应的路由表信息
	const route = searchRoute(pathname, routerConfig)

	// 判断当前路由是否需要权限(不需要则直接放行)
	if (!route.meta?.needLogin) {
		return props.children
	}

	const { token } = storeReducer('globalReducer')
	// 判断是否有token
	if (!token) {
		return <Redirect to="/login"></Redirect>
	}

	// * 当前账号有权限返回 Router，正常访问页面
	return props.children
}

export default AuthRouter
