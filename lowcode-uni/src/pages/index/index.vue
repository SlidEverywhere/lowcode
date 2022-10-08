<template>
	<view class="content">
		<form class="form" @submit="formSubmit" @reset="formReset">
			<view class="form-content">
				<h2>请先登录 <span>PPT控制器</span></h2>
				<view >
					<view class="uni-form-item uni-column">
						<view class="title">手机号:</view>
						<input class="uni-input" type="number" v-model="formData.username" placeholder="请输入手机号" />
					</view>
					
					<view class="uni-form-item uni-column">
						<view class="title">密码:</view>
						<input class="uni-input" password v-model="formData.password" type="text" placeholder="请输入密码" />
					</view>
				</view>
				<view class="form-foot">
					<button  type="default" class="submit-button"  hover-class="submit-button-hover" plain="true" form-type="submit">登录</button>
					<button type="default" plain="true" form-type="reset">清除</button>
				</view>
			</view>
			
			<uni-popup ref="message" type="message">
							<uni-popup-message type="error" :message="messageText" :duration="2000"></uni-popup-message>
						</uni-popup>
			</form>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
	} from 'vue'
	import {login} from '@/api/login'
	const messageText = ref('')
	const message = ref(null)
	const formData= reactive({username:'',password:''})
	const  formSubmit = async() => {
		console.log(formData)
		const {data} = await login(formData)
		if(data.code===2000){
			try {
				uni.setStorageSync('token', data.data.token);
			} catch (e) {
				// error
			}
			uni.redirectTo({
				url: '../PPTList/PPTList'
			});
			console.log(data)
			return
		}
		
		
		
	}
	const formReset = () => {
		console.log('清除成功')
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: rgb(210, 224, 241);
		background: -moz-linear-gradient(0deg, rgba(210, 224, 241, 1) 0%, rgba(186, 212, 247, 1) 22%, rgba(204, 218, 247, 1) 52%, rgba(193, 218, 251, 1) 76%, rgba(182, 213, 251, 1) 100%);
		background: -webkit-linear-gradient(0deg, rgba(210, 224, 241, 1) 0%, rgba(186, 212, 247, 1) 22%, rgba(204, 218, 247, 1) 52%, rgba(193, 218, 251, 1) 76%, rgba(182, 213, 251, 1) 100%);
		background: linear-gradient(0deg, rgba(210, 224, 241, 1) 0%, rgba(186, 212, 247, 1) 22%, rgba(204, 218, 247, 1) 52%, rgba(193, 218, 251, 1) 76%, rgba(182, 213, 251, 1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d2e0f1", endColorstr="#b6d5fb", GradientType=1);
	}

	.form {
		width: 80%;
		margin: auto;
		height: 50%;
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(7px);
		-webkit-backdrop-filter: blur(7px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		-webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		border-radius: 14px;
		-webkit-border-radius: 14px;
		color: rgba(255, 255, 255, 0.898);
		padding: .25rem;

	}
	.form .form-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;	
	}

	.form h2 {
		text-align: center;
	}
	.form h2 span{
		color: #1E90FF;
	}
	.form-foot{
		display: flex;
		justify-content: space-around;
		font-weight: 500;
	}
	.form-foot button{
		width: 30%;
	}

	.uni-form-item {
		color: #000;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.2rem;
		margin: auto;
		margin-top: 15px;
		width: 90%;

	}

/* 	.uni-form-item+.uni-form-item{
	margin-top: 15px;
} */
	.title {
		color: #000;
	}

	.uni-input {
		padding-left: 0.2rem;
		;
		background-color: #fff;
		border-radius: .4rem;
		height: 2.5rem;
		width: 70%;
	}
	.form-foot .submit-button{
		border: 1px solid #1E90FF;
		color:#1E90FF
	}
	.form-foot .submit-button-hover{
		border: 1px solid #00BFFF;
		color:#00BFFF
	}
</style>
