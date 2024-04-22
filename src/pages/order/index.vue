<script setup lang="ts">
import { orderDetailApi } from '@/api/shop/order'
import type { OrderDetailInfo } from '@/types/shop/order'
import { OrderStateEnum } from '@/types/shop/order'
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

const list = [
	{
		name: '全部',
		key: -1
	},
	{
		name: '待支付',
		key: OrderStateEnum.WAIT_PAY
	},
	{
		name: '已支付',
		key: OrderStateEnum.PAID
	},
	{
		name: '待取餐',
		key: OrderStateEnum.WAIT_PICKUP
	},
	{
		name: '已完成',
		key: OrderStateEnum.COMPLETED
	},
	{
		name: '已取消',
		key: OrderStateEnum.CANCELED
	},
	{
		name: '超时未支付',
		key: OrderStateEnum.TIMEOUT_PAY
	},
	{
		name: '超时未接单',
		key: OrderStateEnum.TIMEOUT_PICKUP
	}
]
const current = ref(0)
const onTabChange = ({ index }: { index: number }) => {
	current.value = index
	loadOrder()
}
const toOrderDetail = (order: OrderDetailInfo) => {
	uni.navigateTo({
		url: '/pages/pay/index',
		success: ({ eventChannel }) => {
			eventChannel.emit('onPay', {
				id: order.id,
				state: order.state,
				store: order.store,
				cart: order.foods,
				totalPrice: order.totalPrice
			})
		}
	})
}

/** 获取所有订单详情 */
const orderDetailData = ref<OrderDetailInfo[]>([])
async function loadOrder() {
	const { data } = await orderDetailApi()
	orderDetailData.value = data ?? []
}
const orderfilter = computed(() => {
	switch (list[current.value].key) {
		case OrderStateEnum.WAIT_PAY:
			return orderDetailData.value.filter((item) => item.state === OrderStateEnum.WAIT_PAY)
		case OrderStateEnum.PAID:
			return orderDetailData.value.filter((item) => item.state === OrderStateEnum.PAID)
		case OrderStateEnum.WAIT_PICKUP:
			return orderDetailData.value.filter((item) => item.state === OrderStateEnum.WAIT_PICKUP)
		case OrderStateEnum.COMPLETED:
			return orderDetailData.value.filter((item) => item.state === OrderStateEnum.COMPLETED)
		case OrderStateEnum.CANCELED:
			return orderDetailData.value.filter((item) => item.state === OrderStateEnum.CANCELED)
		case OrderStateEnum.TIMEOUT_PAY:
			return orderDetailData.value.filter((item) => item.state === OrderStateEnum.TIMEOUT_PAY)
		case OrderStateEnum.TIMEOUT_PICKUP:
			return orderDetailData.value.filter((item) => item.state === OrderStateEnum.TIMEOUT_PICKUP)
		case -1:
		default:
			return orderDetailData.value
	}
})
function orderStateText(state: OrderStateEnum) {
	switch (state) {
		case OrderStateEnum.WAIT_PAY:
			return '待支付'
		case OrderStateEnum.PAID:
			return '已支付'
		case OrderStateEnum.WAIT_PICKUP:
			return '待取餐'
		case OrderStateEnum.COMPLETED:
			return '已完成'
		case OrderStateEnum.CANCELED:
			return '已取消'
		case OrderStateEnum.TIMEOUT_PAY:
			return '超时未支付'
		case OrderStateEnum.TIMEOUT_PICKUP:
			return '超时未取餐'
	}
	// return state === OrderStateEnum.PAID ? '余额支付' : ''
}

onMounted(() => {
	loadOrder()
})
</script>

<template>
	<view class="order h-full flex flex-col">
		<uv-tabs
			class="fixed z-10 left-0 right-0 bg-white"
			lineColor="#65c6b0"
			:current="current"
			:list="list"
			@change="onTabChange"
		/>
		<!-- <view class="mb-4 flex flex-col">
			<view class="mx-4 mb-2">
				<uv-text bold size="16" :lines="1" :text="`待支付`" />
			</view> -->
		<view class="mt-[100rpx] flex-1 px-4" :class="orderfilter.length === 0 ? 'flex flex-col justify-center' : ''">
			<uv-empty
				v-show="orderfilter.length === 0"
				mode="data"
				icon="https://cdn.uviewui.com/uview/empty/car.png"
			/>
			<view
				class="w-full h-[190rpx] mb-2 flex items-center"
				v-for="(item, index) in orderfilter"
				:key="`${item.id}_${index}`"
				@click="() => toOrderDetail(item)"
			>
				<uv-image class="mr-2" width="180rpx" height="180rpx" radius="12" :src="item.store.cover" />
				<view class="w-full h-full p-2 rounded-xl bg-white box-border flex flex-col">
					<uv-text bold size="16" :lines="1" :text="`${item.store.label}`" />
					<view class="flex justify-between">
						<view>
							<view class="flex text-sm text-gray-400">
								<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
								<uv-text size="14" :lines="1" :text="orderStateText(item.state)" />
							</view>
							<view class="flex text-sm text-gray-400">
								<uv-icon class="mr-1" name="clock" :size="16" color="#9ca3af" />
								<uv-text
									size="14"
									:lines="1"
									:text="
										dayjs(item.createTime).add(item.expires, 'minute').format('YYYY-MM-DD HH:mm')
									"
								/>
							</view>
						</view>
						<view class="flex items-end">
							<view class="flex text-sm text-[#ff5722]">
								<text>￥</text>
								<uv-text bold size="18" :lines="1" color="#ff5722" :text="item.totalPrice" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- </view> -->
	</view>
</template>

<style scoped lang="scss"></style>
