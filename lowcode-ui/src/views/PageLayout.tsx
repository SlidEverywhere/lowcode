import { ReactNode } from 'react'

import { Outlet } from 'react-router-dom'
import pageRoutes from '@/router/routers/pageRoutes'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Avatar, Image, MenuProps } from 'antd'
import Icon from '@ant-design/icons'
import userAvatar from '@/assets/images/user/Avatar.svg'

// 点击头像内容事件
const avatarClick: MenuProps['onClick'] = ({ key }) => {
	console.log(`Click on item ${key}`)
}
// const avatarLabel: ReactNode = (
// 	<>
// 		<Avatar src={userAvatar} />
// 	</>
// )

const menu = (
	<Menu
		onClick={avatarClick}
		items={[
			{
				label: '111',
				key: '1',
			},
			{
				label: '2nd menu item',
				key: '2',
			},
			{
				label: '3rd menu item',
				key: '3',
			},
		]}
	/>
)

function PageLayout() {
	return (
		<div className='layout'>
			<header className='headLayout'>
				<nav>
					<ul>
						{pageRoutes.map((route) => (
							<li key={route.path}>
								<Link to={route.path}>{route.meta!.title}</Link>
							</li>
						))}
					</ul>
				</nav>
				<span className='avatar'>
					<Dropdown overlay={menu} trigger={['click']}>
						<Avatar src={userAvatar} />
					</Dropdown>
				</span>
			</header>
			<main className='content'>
				<Outlet />
			</main>
		</div>
	)
}

export default PageLayout
