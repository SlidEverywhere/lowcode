import { HashRouter } from 'react-router-dom'
import { routes, onRouteBefore } from './router'
import RouterWaiter from 'react-router-waiter'

import { useStore } from './hooks/storeHook'
import api from './api/index'
import { useState, useEffect } from 'react'
import { getRoutePath } from './utils/appTools'

function App() {
	const store = useStore()
	const { userStore } = store

	const [isRender, setIsRender] = useState(false)

	useEffect(() => {
		console.log('---update---', document.lastModified)
		// console.log('store', store)

		// 判断路由是否可渲染
		const path = getRoutePath()
		if (['/login'].includes(path)) {
			setIsRender(true)
		} else {
			if (!userStore.isGotUserInfo) {
				// token 放进来
				api.getUserInfo().then((res: any) => {
					const data = res.data || {}
					userStore.setUserInfo(data.user)
					setIsRender(true)
				})
			}
		}
	}, [])

	return (
		<HashRouter>
			{isRender ? (
				<RouterWaiter routes={routes} onRouteBefore={onRouteBefore} />
			) : null}
		</HashRouter>
	)
}

export default App
