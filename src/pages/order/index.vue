<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

onLoad(() => {})

const current = ref(0)
const list = [
	{
		name: '全部',
		key: 'all'
	},
	{
		name: '待支付',
		key: 'pending'
	},
	{
		name: '已支付',
		key: 'paid'
	},
	{
		name: '已取消',
		key: 'cancelled'
	}
]
const onTabChange = ({ index }: { index: number }) => {
	current.value = index
}
const show = (key: string) => {
	return list[current.value].key === key || list[current.value].key === 'all'
}
const toOrderDetail = (order: any) => {
	console.log(order)
	uni.navigateTo({
		url: '/pages/order/Detail'
	})
}
</script>

<template>
	<view class="order h-full flex flex-col">
		<uv-tabs :current="current" :list="list" :scrollable="false" @change="onTabChange"></uv-tabs>
		<!-- 待支付 -->
		<view v-show="show('pending')" class="mb-4 flex flex-col">
			<!-- 订单类型 -->
			<view class="mx-4 mb-2">
				<uv-text bold size="16" :lines="1" :text="`待支付`" />
			</view>
			<!-- 订单列表 -->
			<view class="px-4">
				<view
					class="w-full h-[190rpx] mb-2 flex items-center"
					v-for="item in 2"
					:key="item"
					@click="() => toOrderDetail(item)"
				>
					<uv-image
						class="mr-2"
						width="180rpx"
						height="180rpx"
						radius="12"
						src="https://cdn.uviewui.com/uview/album/1.jpg"
					/>
					<view class="w-full h-full p-2 rounded-xl bg-white box-border flex flex-col">
						<uv-text bold size="16" :lines="1" :text="`KFC(${item})`" />
						<view class="flex justify-between">
							<view>
								<view class="flex text-sm text-gray-400">
									<uv-icon class="mr-1" name="clock" :size="16" color="#9ca3af" />
									<uv-text size="14" :lines="1" :text="`2024-04-04 12:12:12`" />
								</view>
								<view class="flex text-sm text-gray-400">
									<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
									<uv-text size="14" :lines="1" :text="`微信`" />
								</view>
							</view>
							<view class="flex items-end">
								<view class="flex text-sm text-[#ff5722]">
									<text>￥</text>
									<uv-text bold size="18" :lines="1" color="#ff5722" :text="`46`" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 已支付 -->
		<view v-show="show('paid')" class="mb-4 flex flex-col">
			<!-- 订单类型 -->
			<view class="mx-4 mb-2">
				<uv-text bold size="16" :lines="1" :text="`已支付`" />
			</view>
			<!-- 订单列表 -->
			<view class="px-4">
				<view
					class="w-full h-[190rpx] mb-2 flex items-center"
					v-for="item in 2"
					:key="item"
					@click="() => toOrderDetail(item)"
				>
					<uv-image
						class="mr-2"
						width="180rpx"
						height="180rpx"
						radius="12"
						src="https://cdn.uviewui.com/uview/album/1.jpg"
					/>
					<view class="w-full h-full p-2 rounded-xl bg-white box-border flex flex-col">
						<uv-text bold size="16" :lines="1" :text="`KFC(${item})`" />
						<view class="flex justify-between">
							<view>
								<view class="flex text-sm text-gray-400">
									<uv-icon class="mr-1" name="clock" :size="16" color="#9ca3af" />
									<uv-text size="14" :lines="1" :text="`2024-04-04 12:12:12`" />
								</view>
								<view class="flex text-sm text-gray-400">
									<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
									<uv-text size="14" :lines="1" :text="`微信`" />
								</view>
							</view>
							<view class="flex items-end">
								<view class="flex text-sm text-[#ff5722]">
									<text>￥</text>
									<uv-text bold size="18" :lines="1" color="#ff5722" :text="`46`" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 已取消 -->
		<view v-show="show('cancelled')" class="mb-4 flex flex-col">
			<!-- 订单类型 -->
			<view class="mx-4 mb-2">
				<uv-text bold size="16" :lines="1" :text="`已取消`" />
			</view>
			<!-- 订单列表 -->
			<view class="px-4">
				<view
					class="w-full h-[190rpx] mb-2 flex items-center"
					v-for="item in 6"
					:key="item"
					@click="() => toOrderDetail(item)"
				>
					<uv-image
						class="mr-2"
						width="180rpx"
						height="180rpx"
						radius="12"
						src="https://cdn.uviewui.com/uview/album/1.jpg"
					/>
					<view class="w-full h-full p-2 rounded-xl bg-white box-border flex flex-col">
						<uv-text bold size="16" :lines="1" :text="`KFC(${item})`" />
						<view class="flex justify-between">
							<view>
								<view class="flex text-sm text-gray-400">
									<uv-icon class="mr-1" name="clock" :size="16" color="#9ca3af" />
									<uv-text size="14" :lines="1" :text="`2024-04-04 12:12:12`" />
								</view>
								<view class="flex text-sm text-gray-400">
									<uv-icon class="mr-1" name="red-packet" :size="16" color="#9ca3af" />
									<uv-text size="14" :lines="1" :text="`微信`" />
								</view>
							</view>
							<view class="flex items-end">
								<view class="flex text-sm text-[#ff5722]">
									<text>￥</text>
									<uv-text bold size="18" :lines="1" color="#ff5722" :text="`46`" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
