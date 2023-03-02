import { useRoutes, RouteObject } from 'react-router-dom'
import LazyLoad from '@/components/LazyLoad'
import Home from '@/pages/Home'

export const routerConfig: IRouteConfig[] = [
	{
		path: '/',
		element: <Home />,
		meta: {
			needLogin: true,
		},
	},
	{
		path: '/entry',
		element: LazyLoad('Entry'),
		meta: {
			needLogin: true,
		},
	},
	{
		path: '/login',
		element: LazyLoad('Login'),
	},
	{
		path: '/mine',
		element: LazyLoad('Mine'),
		meta: {
			needLogin: true,
		},
	},
	{
		path: '*',
		element: LazyLoad('404'),
	},
]

const Router = () => useRoutes(routerConfig as RouteObject[])

export default Router

export interface IRouteConfig {
  children?: IRouteConfig[]
  element: React.ReactNode
  index?: boolean
  path: string
  meta?: MetaProps
}

export interface MetaProps {
  keepAlive?: boolean
  needLogin?: boolean
  title?: string
  key?: string
}
