<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

onLoad(() => {})

const list = ref([
	'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	'https://cdn.uviewui.com/uview/swiper/swiper2.png',
	'https://cdn.uviewui.com/uview/swiper/swiper1.png'
])
const toFoods = () => {
	uni.navigateTo({
		url: '/pages/menu/index'
	})
}
const toFoodDetail = (food: any) => {
	console.log(food)
	uni.navigateTo({
		url: '/pages/menu/Detail'
	})
}
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
			@click="(index: number) => toFoodDetail(list[index])"
		/>
		<!-- 优惠活动 -->
		<view class="mb-4 flex flex-col">
			<!-- 优惠标题 -->
			<view class="mx-4 mb-2">
				<uv-text bold size="16" :lines="1" :text="``" />
			</view>
			<!-- 优惠列表 -->
			<view class="pl-4 flex flex-nowrap overflow-x-scroll">
				<view class="" v-for="item in 3" :key="item">
					<view
						class="w-[250rpx] h-[150rpx] mr-4 p-2 box-border rounded-xl bg-white flex flex-col"
						@click="() => toFoodDetail(item)"
					>
						<uv-text bold size="14" :lines="1" :text="`香辣鸡腿堡(${item})`" />
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="`100`" />
						</view>
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="star-fill" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="`100`" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 优惠活动 -->
		<view class="mb-4 flex flex-col">
			<!-- 优惠标题 -->
			<view class="mx-4 mb-2">
				<uv-text bold size="16" :lines="1" :text="``" />
			</view>
			<!-- 优惠列表 -->
			<view class="pl-4 flex flex-nowrap overflow-x-scroll">
				<view class="relative" v-for="item in 3" :key="item">
					<view
						class="w-[350rpx] h-[200rpx] mr-4 p-3 box-border rounded-xl bg-white flex flex-col"
						@click="() => toFoodDetail(item)"
					>
						<uv-text bold size="16" :lines="1" :text="`香辣鸡腿堡(${item})`" />
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="`100`" />
						</view>
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="star-fill" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="`100`" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="mb-4 flex flex-col">
			<!-- 优惠标题 -->
			<view class="mx-4 mb-2 flex">
				<uv-text bold size="16" :lines="1" :text="`推荐`" />
				<uv-button shape="circle" :plain="true" :hairline="true" size="small" @click="toFoods">更多</uv-button>
			</view>
			<!-- 列表 -->
			<view class="px-4">
				<view
					class="w-full h-[190rpx] mb-2 flex items-center"
					v-for="item in 3"
					:key="item"
					@click="() => toFoodDetail(item)"
				>
					<uv-image
						class="mr-2"
						width="180rpx"
						height="180rpx"
						radius="12"
						src="https://cdn.uviewui.com/uview/album/1.jpg"
					/>
					<view class="w-full h-full p-2 rounded-xl bg-white box-border flex flex-col">
						<uv-text bold size="16" :lines="1" :text="`香辣鸡腿堡(${item})`" />
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="map" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="`100`" />
						</view>
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="`100`" />
						</view>
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="star-fill" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="`100`" />
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
