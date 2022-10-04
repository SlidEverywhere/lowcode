import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './Layout.scss'
import 'antd/dist/antd.min.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { MyRouteType } from './types/router'
const components = import.meta.glob('./components/**/test*.tsx')
const componentsPromise = Object.keys(components)
	.map((item) => components[item])
	.map((f) => f())
const routes: MyRouteType[] = []
Promise.all(componentsPromise).then((list) => {
	for (let module of list) {
		const md = module as any
		for (let key in md) {
			const Component = md[key]
			routes.push({
				path: '/' + Component.name.toLocaleLowerCase(),
				key: Component.name,
				element: Component,
			})
		}
	}

	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<React.StrictMode>
			<HashRouter>
				<Routes>
					<Route path='/' element={<App router={routes} />}>
						{routes.map((item) => (
							<Route
								path={item.path}
								key={item.key}
								element={item.element()}></Route>
						))}
					</Route>
				</Routes>
			</HashRouter>
		</React.StrictMode>
	)
})
