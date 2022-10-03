import * as React from 'react'
import { useState } from 'react'

import { Outlet } from 'react-router-dom'
import pageRoutes from '@/router/routers/pageRoutes'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Avatar, MenuProps, Image } from 'antd'
import Icon from '@ant-design/icons'
import userAvatar from '@/assets/images/user/Avatar.svg'
// import { useNavigate } from 'react-router-dom'
// import {useStore} from '@/hooks/storeHook'

// const {userStore} = useStore()
// const navigate = useNavigate()

// 点击头像内容事件
const avatarClick: MenuProps['onClick'] = ({ key }) => {
	// 处理路由跳转，或其他操作
	console.log(`Click on item ${key}`)
}

const menu = () => {
	// 获取用户信息
	const [userName, setuserName] = useState('183677_OP')
	return (
		<Menu
			onClick={avatarClick}
			items={[
				{
					label: (
						<>
							<Avatar src={userAvatar} />
							<span className='information'>{userName}</span>
						</>
					),
					key: '1',
				},
				{
					label: '我的文件',
					key: '2',
				},
				{
					label: '退出',
					key: '3',
				},
			]}
		/>
	)
}

// 退出登录的逻辑
// function onLogout () {
// 	userStore.setTicket('')
// 	navigate('/login')
// }

function PageLayout() {
	return (
		<div className='layout'>
			<header className='headLayout'>
				{/* 我们的图标 */}
				<Image />
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
					<Dropdown overlay={menu()} trigger={['click']}>
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
