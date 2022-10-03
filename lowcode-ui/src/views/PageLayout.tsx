import { Outlet } from 'react-router-dom'
import pageRoutes from '@/router/routers/pageRoutes'
import { Link } from 'react-router-dom'
console.log(pageRoutes)

function PageLayout() {
	return (
		<>
			<ul>
				{pageRoutes.map((route) => (
					<li key={route.path}>
						<Link to={route.path}>{route.meta!.title}</Link>
					</li>
				))}
			</ul>
			<Outlet />
		</>
	)
}

export default PageLayout
