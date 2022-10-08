<template>
	<view class="use-ppt">
		<swiper class="swiper" :duration="1000" :disable-touch='false' :current='current'>
						<swiper-item class="item">
							<view class="swiper-item " v-for="item in imageList"><img :src="item.image" alt=""></view>
						</swiper-item>
						
					</swiper>
					<img v-show="!!nextpage" class='next-image' :src="nextpage" alt="">
					<h2 v-show="!nextpage" class='next-image'  >已经是最后一页</h2>
					<view class="button">
						<button  type="default" class="btn retreat-btn"  hover-class="btn-hover" plain="true" @click="retreat">&lt;</button>
						<button  type="default" class="btn retreat-btn"  hover-class="btn-hover" plain="true" @click="go">&gt;</button>
					</view>
	</view>
</template>

<script lang="ts" setup>
	import {getUrlParam} from '@/api/url'
	import {join,control} from '@/api/ppT'
import { ref } from 'vue';
	const Id = getUrlParam('PPTId')
	let sessionId:string 
	const current = ref(0)
	const imageList = ref([])
	const nextpage = ref('')
	
	async function usePPT(){
		const{data}= await join(Id!)
		if(data.code===2000){
			sessionId=data.data.sessionId
			imageList.value=data.data.slide.content
			current.value=data.data.slide.currentPage>imageList.value.length?imageList.value.length-1:data.data.slide.currentPage
			nextpage.value = imageList.value[current.value+1]?.image
			console.log(nextpage.value)
		}
		console.log(data)
	}
	// 后退
	async function retreat(){
		if(current.value-1>=0){
			await control({action:'Prev'},sessionId)
			current.value-1
			return
		}
		
	}
	// 前进
	async function go(){
		if(current.value+1<=imageList.value.length){
			await control({action:'NEXT'},sessionId)
			current.value+1
			return
		}
		
	}
	usePPT()
</script>

<style>
.use-ppt{
	height: 100%;
	position: relative;
	background-color: #363636;
}
.swiper{
	display: flex;
}
.next-image{
	position: absolute;
	right: 5px;
	top: 5px;
	width: 100px;
	height: 70px;
	color: #fff;
	background-color: #B5B5B5;
	font-size: 13px;
	
}
h2.next-image {
	line-height: 70px;
	padding: 0px 5px;
}
.swiper-item img{
	width: 100%;
	height: auto;
}
.button{
	display: flex;
	margin-top: 20px;
}
.button .btn{
	border: 1px solid #eee;
	color: #eee;
}
.button .btn-hover{
	border: 1px solid #999;
	color: #999;
}
</style>
