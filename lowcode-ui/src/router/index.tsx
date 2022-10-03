// 路由统一配置

import store from '@/store'
import api from '@/api/index'
// import PageLayout from '@/components/PageLayout'

import { getIsCanAccess } from '@/utils/appTools'
import { RoutesTypeNew } from '@/types/routes'
import { OnRouteBeforeType } from 'react-router-waiter'
import PageLayout from '@/views/PageLayout'
import pageRoutes from './routers/pageRoutes'

/**
 * @description: 全局路由配置
 * meta字段说明：↓↓↓
 * @param {string} title // 路由页面标题，以及侧边栏菜单中的标题
 * @param {element} icon // 侧边栏该路由菜单显示的图标
 * @param {string} accessId // 路由页面权限id
 * @param {boolean} noLogin // 路由页面是否需要登录访问
 * @param {boolean} hideMenu // 是否在侧边栏中隐藏该路由菜单
 */
// 白名单路径名
const allowRoutes: string[] = ['/login', '/403', '*', '/', '/index']

const routes: RoutesTypeNew = [
	{
		path: '/login',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/login/index'),
		meta: {
			title: '登录',
			hideMenu: true,
		},
	},
	{
		path: '/403',
		component: () =>
			import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/page403'),
		meta: {
			title: '403',
			hideMenu: true,
		},
	},
	{
		path: '*',
		component: () =>
			import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/page404'),
		meta: {
			title: '404',
			hideMenu: true,
		},
	},
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/',
		element: <PageLayout />,
		children: [...pageRoutes],
	},
	{
		path: '/test',
		component: () => import(/* webpackChunkName: "errorPage" */ '@/views/test'),
	},
]

// 动态修改页面title
function userAllowRoute(pathname: string): boolean {
	// 打印title
	// console.log(
	// 	pathname,
	// 	allowRoutes.find((el) => pathname === el)
	// )
	return !!allowRoutes.find((el) => pathname === el)
}

/**
 * @description: 全局路由拦截
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时就return一个该页的path路径
 */
// 路由判断是否在白名单内
const onRouteBefore: OnRouteBeforeType = ({ pathname, meta }) => {
	const { userStore } = store

	if (meta.title !== undefined) {
		document.title = meta.title
	}

	// 登录及权限判断
	if (!userAllowRoute(pathname)) {
		// 路由是否需要登录
		// const isAllow =
		if (userStore.isLogin) {
			// 用户是否已登录
			const { accessId } = meta
			const message = `${pathname}，${meta.title || ''}`
			const path403 = `/403?message=${encodeURIComponent(message)}`

			if (!userStore.isGotUserInfo) {
				// 是否已获取到用户（权限）信息
				return new Promise((resolve) => {
					api.getUserInfo().then((res: any) => {
						const data = res.data || {}
						userStore.setUserInfo(data)

						if (!getIsCanAccess(accessId)) {
							resolve(path403)
						}
					})
				})
			} else {
				if (!getIsCanAccess(accessId)) {
					return path403
				}
			}
		} else {
			// 未登录先弹窗，问一下要不要登录

			return `/login?redirectUrl=${encodeURIComponent(window.location.href)}`
		}
	}
}

export { routes, onRouteBefore }
