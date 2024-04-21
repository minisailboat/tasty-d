<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useStoreStore } from '@/stores/shop/store'
import type { Food } from '@/types/shop/food'
import type { Store } from '@/types/shop/store'
import { computed, getCurrentInstance, onMounted, ref, toRef } from 'vue'

/** 店铺信息 */
const storeData = ref<Store>()

/** 店铺 Top 菜品数据 */
const storeStore = useStoreStore()
const storeFoodTopMap = toRef(storeStore, 'storeFoodTopMap')
const foodData = computed(() => {
	const arr: any[] = []
	Array.from(storeFoodTopMap.value.values()).map((item) => {
		item.map((i: any) => {
			arr.push(i)
		})
	})
	return arr
})

/** 路由跳转 */
function toFoodDetail(food: Food) {
	uni.navigateTo({
		url: '/pages/store/Detail',
		success({ eventChannel }) {
			eventChannel.emit('openFood', food)
		}
	})
}

onMounted(() => {
	// 监听事件
	const instance = getCurrentInstance()?.proxy
	const eventChannel = instance?.getOpenerEventChannel()
	eventChannel.on('openStore', (store: Store) => {
		// 处理事件
		console.log('openStore', store)
		storeData.value = store
	})
})
</script>

<template>
	<div class="food h-screen flex flex-col bg-[#65c6b0] relative">
		<NavBar back backIconColor="#fff" class="w-full bg-[#0000002d] text-white z-[999] absolute" />
		<uv-image v-if="storeData?.cover" :src="storeData?.cover" width="100%" class="absolute" mode="widthFix" />
		<view class="flex-1 mt-56 p-4 reactive rounded-t-3xl overflow-auto z-[999] bg-white">
			<view class="h-full flex flex-col">
				<view class="flex flex-col">
					<uv-text size="18" :lines="1" bold :customStyle="{ margin: '10rpx 0' }" :text="storeData?.label" />
					<uv-text size="14" :lines="2" :customStyle="{ margin: '10rpx 0' }" :text="storeData?.description" />
				</view>
				<view class="w-full my-2">
					<view class="w-full flex flex-nowrap overflow-auto">
						<div
							class="px-3 py-1 min-w-[100rpx] flex bg-gray-200 rounded-full overflow-hidden"
							:class="{ 'mr-4': i !== 10 }"
							v-for="i in 10"
							:key="i"
						>
							<uv-text size="14" :lines="1" :customStyle="{}" :text="`分类分类分类${i}`" />
						</div>
					</view>
				</view>
				<view class="flex flex-col pb-[170rpx]">
					<uv-text size="18" :lines="1" bold :customStyle="{ margin: '10rpx 0' }" :text="`菜单`" />
					<view class="">
						<view
							class="w-full h-[190rpx] mb-2 flex items-center"
							v-for="(foodItem, foodIndex) in foodData"
							:key="foodIndex"
							@click="() => toFoodDetail(foodItem)"
						>
							<uv-image class="mr-2" width="180rpx" height="180rpx" radius="12" :src="foodItem.cover" />
							<view class="w-full h-full p-3 rounded-xl bg-white box-border flex flex-col">
								<view class="mb-3 flex justify-between">
									<uv-text bold size="16" :lines="1" :text="foodItem.label" />
									<view class="flex justify-end text-sm text-gray-400">
										<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
										<uv-text size="18" :lines="1" :text="foodItem.price" />
									</view>
								</view>
								<view class="flex text-sm text-gray-400">
									<uv-text size="14" :lines="2" :text="foodItem.description" />
									<view class="flex justify-end text-sm text-gray-400 translate-x-3">
										<uv-icon class="mr-1" name="plus-circle" :size="22" color="#9ca3af" />
										<view class="w-[50rpx] flex justify-center items-center">
											<span size="18">9</span>
										</view>
										<uv-icon class="mr-1" name="minus-circle" :size="22" color="#9ca3af" />
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="w-full absolute left-0 bottom-0">
					<view
						class="m-4 h-full shadow-lg rounded-3xl overflow-hidden bg-[#f8f8f8] flex justify-between items-center"
					>
						<view class="p-4 h-full font-bold text-[#65c6b0]">9.99</view>
						<view class="p-4 h-full text-white bg-[#65c6b0]">去结算</view>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<style scoped lang="scss"></style>
