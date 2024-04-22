<script setup lang="ts">
import { queryFoodCategoryApi } from '@/api/shop/category'
import { queryFoodApi } from '@/api/shop/food'
import NavBar from '@/components/NavBar.vue'
import type { Category } from '@/types/shop/category'
import type { Food } from '@/types/shop/food'
import type { Store } from '@/types/shop/store'
import { getCurrentInstance, onMounted, ref, watchEffect } from 'vue'

/** 店铺信息 */
const storeData = ref<Store>()

/** 店铺菜品分类 */
const activeCategory = ref<Category>()
const storeCategoryData = ref<Category[]>([])
async function loadStoreFoodCategory(storeId: string) {
	const { data } = await queryFoodCategoryApi({ storeId })
	if (data && data?.length > 0) {
		storeCategoryData.value = data
	}
}
function toggleCategory(category?: Category) {
	activeCategory.value = category
}

/** 店铺菜品 */
const storeFoodData = ref<Food[]>([])
async function loadStoreFood(param: Food) {
	const { data } = await queryFoodApi(param)
	storeFoodData.value = data ?? []
}
watchEffect(() => {
	if (storeData.value?.id) {
		const param: Food = {
			storeId: storeData.value.id
		}
		if (activeCategory.value) {
			param['categoryIds'] = [`${activeCategory.value?.id}`]
		}
		loadStoreFood(param)
	}
})

onMounted(() => {
	// 监听事件
	const instance = getCurrentInstance()?.proxy
	const eventChannel = instance?.getOpenerEventChannel()
	eventChannel.on('openStore', (store: Store) => {
		// 处理事件
		storeData.value = store

		// 加载店铺菜品分类
		if (storeData?.value?.id) {
			loadStoreFoodCategory(storeData.value.id)
		}
	})
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
					<view v-if="storeData?.id" class="w-full flex flex-nowrap overflow-auto">
						<div
							class="px-3 mr-4 py-1 min-w-[100rpx] flex justify-center rounded-full overflow-hidden"
							:class="!activeCategory ? 'bg-[#65c6b0] text-white' : 'bg-gray-200'"
							@click="toggleCategory()"
						>
							<!-- <uv-text size="14" :lines="1" :customStyle="{}" :text="`ALL`" /> -->
							<text>ALL</text>
						</div>
						<div
							class="px-3 py-1 min-w-[100rpx] flex justify-center rounded-full overflow-hidden"
							v-for="(category, index) in storeCategoryData"
							:key="index"
							:class="{
								'mr-4': index !== storeCategoryData.length - 1,
								'bg-gray-200': activeCategory?.id !== category.id,
								'bg-[#65c6b0] text-white': activeCategory?.id === category.id
							}"
							@click="toggleCategory(category)"
						>
							<!-- <uv-text size="14" :lines="1" :customStyle="{}" :text="category.label" /> -->
							<text class="text-nowrap text-ellipsis">{{ category.label }}</text>
						</div>
					</view>
				</view>
				<view class="flex flex-col pb-[170rpx]">
					<uv-text size="18" :lines="1" bold :customStyle="{ margin: '10rpx 0' }" :text="`菜单`" />
					<uv-empty
						v-show="storeFoodData.length === 0"
						mode="data"
						icon="https://cdn.uviewui.com/uview/empty/car.png"
					/>
					<view
						class="w-full h-[190rpx] mb-2 flex items-center"
						v-for="(foodItem, foodIndex) in storeFoodData"
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
