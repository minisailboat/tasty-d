<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import type { Food } from '@/types/shop/food'
import { getCurrentInstance, onMounted, ref } from 'vue'

const foodData = ref<Food>()

onMounted(() => {
	// 监听事件
	const instance: any = getCurrentInstance()?.proxy
	const eventChannel = instance?.getOpenerEventChannel()
	eventChannel.on('openFood', (food: Food) => {
		// 处理事件
		console.log('openFood', food)
		foodData.value = food
	})
})
</script>

<template>
	<div class="food-detail h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar
			back
			:title="foodData?.label"
			backIconColor="#fff"
			class="w-full bg-[#0000002d] text-white z-[999] absolute"
		/>
		<uv-image v-if="foodData?.cover" :src="foodData?.cover" width="100%" class="absolute" mode="widthFix" />
		<view class="flex-1 mt-56 p-4 reactive rounded-t-3xl overflow-auto z-[999] bg-white">
			<view class="h-full flex flex-col">
				<view class="flex flex-col">
					<uv-text size="18" :lines="1" bold :customStyle="{ margin: '10rpx 0' }" :text="foodData?.label" />
					<p>{{ foodData?.description }}</p>
				</view>
			</view>
		</view>
	</div>
</template>

<style scoped lang="scss"></style>
