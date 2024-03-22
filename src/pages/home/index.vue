<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

onLoad(() => {})

const list = ref([
	'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	'https://cdn.uviewui.com/uview/swiper/swiper2.png',
	'https://cdn.uviewui.com/uview/swiper/swiper1.png'
])
</script>

<template>
	<view class="home h-full flex flex-col">
		<!-- 轮播图 -->
		<uv-swiper
			class="mb-4"
			:list="list"
			previousMargin="30"
			nextMargin="30"
			circular
			radius="15"
			bgColor="#F7F7F7"
			height="170"
		/>
		<view class="mb-4 flex flex-col">
			<!-- 优惠标题 -->
			<view class="mx-4 mb-2">
				<text>商品推荐</text>
			</view>
			<!-- 店铺列表 -->
			<view class="px-4">
				<view class="mb-2 relative overflow-hidden" v-for="item in 2" :key="item">
					<view class="w-full h-[180rpx] rounded-xl bg-[#fad281] flex flex-col">
						<text class="text-20 text-black">优惠券({{ item }})</text>
						<text class="text-12 text-gray">100</text>
					</view>
					<uv-image
						class="absolute bottom-0 right-0 z-[999] translate-x-2 translate-y-2"
						width="180rpx"
						height="180rpx"
						src="https://cdn.uviewui.com/uview/album/1.jpg"
					/>
				</view>
			</view>
		</view>
		<!-- 优惠活动 -->
		<view class="mb-4 flex flex-col">
			<!-- 优惠标题 -->
			<view class="mx-4 mb-2">
				<text>优惠活动</text>
			</view>
			<!-- 优惠列表 -->
			<view class="pl-4 flex flex-nowrap overflow-x-scroll">
				<view class="relative" v-for="item in 20" :key="item">
					<view class="w-[400rpx] h-[250rpx] p-2 rounded-xl bg-[#fad281] mr-4 flex flex-col">
						<text class="text-20 text-black">优惠券({{ item }})</text>
						<text class="text-12 text-gray">100</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 附近美食 -->
		<view class="mb-4 flex flex-col">
			<!-- 优惠标题 -->
			<view class="mx-4 mb-2">
				<text>附近美食</text>
			</view>
			<!-- 店铺列表 -->
			<view class="px-4">
				<view class="mb-2 relative" v-for="item in 10" :key="item">
					<view class="w-full h-[180rpx] rounded-xl bg-[#fad281] flex flex-col">
						<text class="text-20 text-black">优惠券({{ item }})</text>
						<text class="text-12 text-gray">100</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
