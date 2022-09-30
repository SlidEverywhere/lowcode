import {
	Link,
	RelativeRoutingType,
	Outlet,
	useMatch,
	useResolvedPath,
} from 'react-router-dom'
import { MyRouteType } from './types/router'
interface props {
	router: MyRouteType[]
}
function activate(to: RelativeRoutingType) {
	const pathName = useResolvedPath(to).pathname
	const match = useMatch({ path: pathName, end: true })
	// console.log('match', match)
	return match
}

function App(props: props) {
	return (
		<div className='App'>
			<header>
				<h1>找到组件名，导航测试</h1>
			</header>
			<main>
				<nav>
					<ul>
						{props.router.map((item) => (
							<li
								style={{
									backgroundImage: activate(item.key as RelativeRoutingType)
										? `linear-gradient( 135deg, #FFF6B7 10%, #F6416C 100%)`
										: 'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)',
								}}
								key={item.key}>
								<Link className='link' to={item.path}>
									{item.path}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<aside className='content'>
					<div className='out-content'>
						<Outlet />
					</div>
				</aside>
			</main>
		</div>
	)
}

export default App
