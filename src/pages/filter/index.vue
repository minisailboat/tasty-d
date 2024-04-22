<script setup lang="ts">
import { queryWithFoodApi } from '@/api/shop/food'
import NavBar from '@/components/NavBar.vue'
import type { Food } from '@/types/shop/food'
import type { Store } from '@/types/shop/store'
import { ref } from 'vue'

const keyword = ref('')
const storeData = ref<Store[]>([])
async function search() {
	uni.showLoading({
		title: '搜索中'
	})
	const { data } = await queryWithFoodApi(keyword.value)
	uni.hideLoading()
	console.log(data)
	storeData.value = data! ?? []
}

/** 路由跳转 */
const back = () => {
	uni.navigateBack()
}
function toStore(store: Store) {
	uni.navigateTo({
		url: '/pages/store/index',
		success({ eventChannel }) {
			eventChannel.emit('openStore', store)
		}
	})
}
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
	<div class="filter h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar>
			<template #left>
				<view class="pr-2 flex items-center">
					<uv-icon name="close-circle" :size="28" @click="() => back()" />
				</view>
			</template>
		</NavBar>
		<view class="p-4">
			<uv-input
				placeholder="前置图标"
				v-model="keyword"
				prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399"
				@confirm="() => search()"
			/>
		</view>
		<view class="flex-1 overflow-y-auto">
			<!-- 店铺 -->
			<view class="mb-4 flex flex-col" v-for="(storeItem, storeIndex) in storeData" :key="storeIndex">
				<view class="mx-4 mb-2 flex">
					<uv-text bold size="16" :lines="1" :text="storeItem.label" />
					<uv-button shape="circle" :plain="true" :hairline="true" size="small" @click="toStore(storeItem)">
						更多
					</uv-button>
				</view>
				<view class="px-4">
					<view
						class="w-full h-[190rpx] mb-2 flex items-center"
						v-for="(foodItem, foodIndex) in storeItem.foods ?? []"
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
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<style scoped lang="scss"></style>
