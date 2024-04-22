<script setup lang="ts">
import { queryCouponApi } from '@/api/shop/coupon'
import { receiveCouponApi } from '@/api/user'
import { useStoreStore } from '@/stores/shop/store'
import type { Coupon } from '@/types/shop/coupon'
import type { Food } from '@/types/shop/food'
import type { Store } from '@/types/shop/store'
import { computed, onMounted, ref, toRef } from 'vue'

/** 优惠卷数据 */
const couponData = ref<Coupon[]>([])
async function loadCoupon() {
	const { data } = await queryCouponApi()
	couponData.value = data!
}

/** 领取优惠卷 */
const couponPopupRef = ref<any>(null)
const activeCoupon = ref<Coupon>()
function openCouponPopup(data: Coupon) {
	activeCoupon.value = data
	couponPopupRef.value.open()
}
async function receiveCoupon(id: string) {
	const { success, message } = await receiveCouponApi(id)
	if (success) {
		loadCoupon()
		couponPopupRef.value.close()
		return
	}
	uni.showToast({
		title: message,
		icon: 'none'
	})
}

/** 店铺数据 */
const storeStore = useStoreStore()
const storeData = toRef(storeStore, 'storeData')

/** 店铺 Top 菜品数据 */
const storeFoodTopMap = toRef(storeStore, 'storeFoodTopMap')

/** 轮播图数据 */
// const bannerData = ref<string[]>([
// 	'https://cdn.uviewui.com/uview/swiper/swiper3.png',
// 	'https://cdn.uviewui.com/uview/swiper/swiper2.png',
// 	'https://cdn.uviewui.com/uview/swiper/swiper1.png'
// ])
const bannerData = computed(() => {
	return Array.from(storeFoodTopMap.value.values())
		.filter((item) => item.length > 0)
		.map((item) => item[0])
})

/** 路由跳转 */
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

/** 加载数据初始化 */
onMounted(() => {
	// 加载优券
	loadCoupon()
	// 加载店铺
	storeStore.loadStore()
})
</script>

<template>
	<view class="home h-full flex flex-col">
		<!-- 轮播图 -->
		<uv-swiper
			class="mb-4"
			:list="bannerData.map((i) => i.cover ?? '')"
			previousMargin="30"
			nextMargin="30"
			circular
			radius="15"
			bgColor="#F7F7F7"
			height="170"
			@click="(index: number) => toFoodDetail(bannerData[index])"
		/>
		<!-- 优惠活动 -->
		<view class="mb-4 flex flex-col">
			<!-- 优惠标题 -->
			<view class="mx-4 mb-2">
				<uv-text bold size="16" :lines="1" :text="`优惠券`" />
			</view>
			<!-- 优惠列表 -->
			<view class="pl-4 flex flex-nowrap overflow-x-scroll">
				<view class="" v-for="(item, index) in couponData" :key="index">
					<view
						class="w-[250rpx] h-[150rpx] mr-4 p-2 box-border rounded-xl bg-white flex flex-col"
						@click="() => openCouponPopup(item)"
					>
						<uv-text bold size="14" :lines="1" :text="item.label" />
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="item.money" />
						</view>
						<view class="flex text-sm text-gray-400">
							<uv-icon class="mr-1" name="coupon" :size="16" color="#9ca3af" />
							<uv-text size="14" :lines="1" :text="item.number" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 领取优惠券 -->
		<uv-popup ref="couponPopupRef" mode="bottom" :round="20">
			<uv-list class="mt-4">
				<uv-list-item :title="activeCoupon?.label"></uv-list-item>
				<uv-list-item :title="activeCoupon?.description" :disabled="true"></uv-list-item>
				<uv-list-item :title="'金额'" :rightText="activeCoupon?.money + '元'"></uv-list-item>
				<uv-list-item :title="'剩余量'" :rightText="activeCoupon?.number + '张'"></uv-list-item>
				<uv-list-item :title="'有效期'" :rightText="activeCoupon?.expireTime"></uv-list-item>
			</uv-list>
			<view class="p-4">
				<uv-button
					:text="'领取'"
					type="primary"
					customStyle="background: #65c6b0; border: none"
					@click="receiveCoupon(String(activeCoupon?.id))"
				/>
			</view>
		</uv-popup>
		<!-- 店铺 -->
		<view
			class="mb-4 flex flex-col"
			v-for="(storeItem, storeIndex) in storeData"
			:key="storeIndex"
			v-show="storeFoodTopMap.get(storeItem.id).length > 0"
		>
			<view class="mx-4 mb-2 flex">
				<uv-text bold size="16" :lines="1" :text="storeItem.label" />
				<uv-button shape="circle" :plain="true" :hairline="true" size="small" @click="toStore(storeItem)">
					更多
				</uv-button>
			</view>
			<view class="px-4">
				<view
					class="w-full h-[190rpx] mb-2 flex items-center"
					v-for="(foodItem, foodIndex) in storeFoodTopMap.get(storeItem.id)"
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
</template>

<style scoped lang="scss"></style>
