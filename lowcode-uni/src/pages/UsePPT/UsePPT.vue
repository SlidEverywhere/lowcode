<template>
	<view class="use-ppt">
		<swiper class="swiper" :duration="1000" :disable-touch='true'>
						<swiper-item>
							<view class="swiper-item ">A</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item ">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item ">C</view>
						</swiper-item>
					</swiper>
	</view>
</template>

<script lang="ts" setup>
	import {getUrlParam} from '@/api/url'
	const Id = getUrlParam('PPTId')
	console.log(Id)
</script>

<style>
.use-ppt{
	height: 100%;
	background-color: #363636;
}
.swiper-item{
	width: 100%;
}
</style>
