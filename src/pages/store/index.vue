<script setup lang="ts">
import { queryFoodCategoryApi } from '@/api/shop/category'
import { queryFoodApi } from '@/api/shop/food'
import NavBar from '@/components/NavBar.vue'
import type { Category } from '@/types/shop/category'
import type { Food, OrderFoodInfo } from '@/types/shop/food'
import type { Store } from '@/types/shop/store'
import { computed, getCurrentInstance, onMounted, ref, watchEffect } from 'vue'

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

/** 购物车 */
// const cartStore = useCartStore()
const cart = ref<OrderFoodInfo[]>([])
const cartPopupRef = ref<any>(null)
/** 统计总金额 */
const totalPrice = computed(() => {
	return cart.value.reduce((total, item: OrderFoodInfo) => {
		return total + Number(item.price) * item.number
	}, 0)
})
/** 打开购物车弹窗 */
function openCartPopup() {
	cartPopupRef.value.open()
}
/** 加入购物车 */
function addFood(food: Food) {
	let cartFood = cart.value.find((item) => item.foodId === food.id)
	if (!cartFood) {
		cartFood = {
			foodId: String(food.id),
			storeId: String(food.storeId),
			cover: food.cover!,
			label: food.label!,
			description: food.description!,
			number: 1,
			price: food.price!
		}
		cart.value.push(cartFood)
		return
	}
	cartFood.number += 1
}
/** 移出购物车 */
function removeFood(food: Food) {
	const cartFood = cart.value.find((item) => item.foodId === food.id)
	if (!cartFood) {
		return
	}
	if (cartFood.number === 1) {
		cart.value = cart.value.filter((item) => item.foodId !== food.id)
	} else {
		cartFood.number -= 1
	}
}

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
								<view class="px-1 flex justify-end text-sm text-gray-400 translate-x-3" @click.stop>
									<view class="flex" @click.stop="addFood(foodItem)">
										<uv-icon class="mr-1" name="plus-circle" :size="22" color="#9ca3af" />
									</view>
									<view class="w-[50rpx] flex justify-center items-center">
										<span size="18">{{
											cart.find((item) => item.foodId === foodItem.id)?.number ?? 0
										}}</span>
									</view>
									<view class="flex" @click.stop="removeFood(foodItem)">
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
						@click="openCartPopup()"
					>
						<view class="p-4 h-full font-bold text-[#65c6b0]">
							{{ totalPrice }}
						</view>
						<view class="p-4 h-full text-white bg-[#65c6b0]" @click.stop="() => {}">去结算</view>
					</view>
					<!-- 购物车 -->
					<uv-popup ref="cartPopupRef" mode="bottom" :round="20">
						<view v-if="cart.length === 0" class="px-4 py-8">
							<uv-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/car.png" />
						</view>
						<view v-else class="flex flex-col">
							<view class="flex-1 min-h-[200px] max-h-[250px] overflow-auto">
								<uv-list class="mt-4">
									<uv-list-item
										v-for="(cartItem, cartindex) in cart"
										:key="`${cartItem.foodId}_${cartindex}`"
										:title="cartItem.label"
										:rightText="`${cartItem.price}元 x ${cartItem.number}`"
									/>
								</uv-list>
							</view>
							<view class="p-4">
								<uv-button
									:text="'去结算'"
									type="primary"
									customStyle="background: #65c6b0; border: none"
									@click="() => {}"
								/>
							</view>
						</view>
					</uv-popup>
				</view>
			</view>
		</view>
	</div>
</template>

<style scoped lang="scss"></style>
