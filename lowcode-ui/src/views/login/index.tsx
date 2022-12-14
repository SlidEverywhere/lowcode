// 登录页
import './index.less'
import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { getRoutePath } from '@/utils/appTools'
import { useStore } from '@/hooks/storeHook'
import tools from '@/utils/tools'
import api from '@/api/index'

function Index() {
	const navigate = useNavigate()

	const { userStore } = useStore()

	// url参数
	const query = tools.getQueryObject()
	const redirectUrl = decodeURIComponent(query.redirectUrl || '')

	// form实例
	const [form] = Form.useForm()

	// 提交表单
	function onSubmit() {
		form.validateFields().then((values: any) => {
			console.log(values)
			const { username, password } = values
			// setTimeout(() => {
				// const ticket = 'token123'
				// 先请求注册接口
				api
					.register({ username, password })
					.then((res: any) => {
						// console.log('111');
						console.log('注册'+res.code);
						
						
						if (res.code === 2000) {
							console.log('注册成功直接跳转'+ res.data.token);
							
							const data = res.data || {}
							
							userStore.setTicket(data.token)

							// api.getUserInfo(data.token).then((res: any) => {
									// 	const data = res.data || {}
									// 	console.log(data);
										
									// 	userStore.setUserInfo(data.user)
									// 	console.log(userStore);
									// })
							// console.log(userStore);
							navigate('/index')
							
						}else {
							// 请求登录接口
							api
							.login({ username, password })
							.then((res: any) => {
								console.log('登录',res.code);
								
								if (res.code === 2000) {
									const data = res.data || {}
									userStore.setTicket(data.token)

									// api.getUserInfo(data.token).then((res: any) => {
									// 	const data = res.data || {}
									// 	console.log(data);
										
									// 	userStore.setUserInfo(data.user)
									// 	console.log(userStore);
									// })
									console.log('登陆成功');
									navigate('/index')
									// console.log(userStore);
									// console.log(userStore.ticket);
									
								}
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				
					

				// userStore.setTicket(ticket)

			// }, 200)
		})
	}

	return (
		<div className='v-login-index'>
			<h4 className='title'>基于低代码和跨端技术实现的 web 幻灯片应用</h4>

			<Form
				className='formWrap'
				name='login'
				form={form}
				size='large'
				initialValues={{ password: '123456', remember: true }}>
				<Form.Item
					name='username'
					rules={[
						{
							pattern: new RegExp(
								/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
								'g'
							),
							message: '请输入11位电话号',
						},
						{ required: true, message: '必填' }
					]}>
					<Input prefix={<UserOutlined />} placeholder='请输入电话号' />
				</Form.Item>

				<Form.Item
					name='password'
					rules={[{ required: true, message: '必填' }]}>
					<Input.Password prefix={<LockOutlined />} placeholder='请输入密码' />
				</Form.Item>

				<Form.Item>
					<div className='moreWrap'>
						<Form.Item name='remember' valuePropName='checked' noStyle>
							<Checkbox>自动登录</Checkbox>
						</Form.Item>
						<a className='login-form-forgot' href=''>
							忘记密码
						</a>
					</div>
				</Form.Item>

				<Form.Item>
					<Button type='primary' className='loginBtn' onClick={onSubmit}>
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Index
