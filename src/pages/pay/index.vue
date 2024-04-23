<script setup lang="ts">
import { addOrderApi, orderPayApi } from '@/api/shop/order'
import NavBar from '@/components/NavBar.vue'
import { useBillStore } from '@/stores/bill'
import { useCouponStore } from '@/stores/coupon'
import { useUserStore } from '@/stores/user'
import type { OrderInfo } from '@/types/pay'
import { OrderStateEnum, type OrderSaveParam } from '@/types/shop/order'
import { computed, getCurrentInstance, onMounted, reactive, ref, toRef, watchEffect } from 'vue'

// 用户状态
const userStore = useUserStore()
const isLogin = toRef(userStore, 'isLogin')

// 订单信息
const orderData = ref<OrderInfo>()
const hasOrder = computed(() => {
	return orderData.value !== undefined && orderData.value.id !== null
})
const canPay = computed(() => {
	return orderData.value !== undefined && orderData.value.state === OrderStateEnum.WAIT_PAY
})

// 账单信息
const billStore = useBillStore()
const balance = toRef(billStore, 'balance')

// 优惠券信息
const couponStore = useCouponStore()
const allCouponData = toRef(couponStore, 'couponData')
const couponData = computed(() => {
	return allCouponData.value.filter((item) => {
		return item.state === 1 && item.number
	})
})
const couponPrice = computed(() => {
	if (model.couponId && orderData.value) {
		const coupon = couponData.value.find((item) => item.id === model.couponId)
		if (!coupon?.money) return orderData.value?.totalPrice
		const money = orderData.value?.totalPrice - coupon?.money
		return money < 0 ? 0 : money
	}
	return orderData.value?.totalPrice
})

watchEffect(() => {
	if (isLogin.value) {
		billStore.loadBalance()
		couponStore.loadCoupon()
	}
})

// 订单信息
const model = reactive<OrderSaveParam>({
	foods: [],
	couponId: null,
	remark: ''
})

// 支付选项
const payOptions = ref<any>([
	{
		name: `余额支付(${balance.value ?? 0})`,
		value: 1,
		disabled: false
	}
])
const activePay = ref(1)

// 下单
async function placeOrder() {
	if (!orderData.value) {
		uni.showToast({
			title: '请选择商品',
			icon: 'none'
		})
		return
	}
	const { success, message, data } = await addOrderApi(model)
	console.log('下单', success, message, data)
	if (!success) {
		uni.showToast({
			title: message,
			icon: 'none'
		})
		return
	}
	orderData.value = {
		id: data?.id ?? null,
		state: data?.state ?? null,
		store: data?.store!,
		cart: data?.foods ?? [],
		totalPrice: data?.totalPrice!
	}
	uni.showToast({
		title: '下单成功',
		icon: 'none'
	})
}

// 支付
async function pay() {
	if (!orderData.value) {
		uni.showToast({
			title: '请先下单',
			icon: 'none'
		})
		return
	}
	uni.showLoading({
		title: '支付中...',
		mask: true
	})
	await orderPayApi(orderData.value?.id!)
	uni.hideLoading()
	uni.showToast({
		title: '支付成功',
		icon: 'none'
	})
	uni.navigateTo({
		url: '/pages/Layout',
		success: ({ eventChannel }) => {
			eventChannel?.emit('openOrder')
		},
		fail(e) {
			console.log('fail', e)
		}
	})
}

const navTitle = computed(() => {
	if (hasOrder.value) {
		return canPay ? '订单支付' : '订单详情'
	} else {
		return '下订单'
	}
})

// 初始化
onMounted(() => {
	// 监听事件
	const instance: any = getCurrentInstance()?.proxy
	const eventChannel = instance?.getOpenerEventChannel()

	eventChannel.on('onPay', (data: OrderInfo) => {
		// 处理事件
		orderData.value = data

		console.log(data)

		// 添加菜品信息
		for (const item of data.cart ?? []) {
			model.foods.push({
				label: item.label,
				foodId: item.foodId,
				number: item.number,
				price: item.price
			})
		}
	})

	// 加载优券
	couponStore.loadCoupon()
})

/** 路由跳转 */
function toLogin() {
	uni.navigateTo({
		url: '/pages/auth/index'
	})
}
</script>

<template>
	<view class="h-screen flex flex-col">
		<NavBar :title="navTitle" back />
		<view v-if="!isLogin" class="flex-1 flex flex-col justify-center items-center">
			<uv-empty mode="permission" :text="'请先登录'" />
			<uv-button class="mt-4" type="primary" @click="toLogin()"> 登录 </uv-button>
		</view>
		<view v-else class="p-4">
			<view
				class="w-full h-[190rpx] mb-2 flex items-center"
				v-for="(foodItem, foodIndex) in orderData?.cart"
				:key="foodIndex"
				@click="() => {}"
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
							<view class="w-[50rpx] flex justify-center items-center">
								<span class="text-lg"> x{{ foodItem.number ?? 0 }} </span>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<text>支付方式：</text>
				<uv-radio-group v-model="activePay">
					<uv-radio
						:customStyle="{ margin: '8px' }"
						v-for="(item, index) in payOptions"
						:label="item.name"
						:name="item.value"
						:key="index"
						activeColor="#65c6b0"
					>
					</uv-radio>
				</uv-radio-group>
			</view>
			<view v-if="couponData.length > 0">
				<text>优惠券:</text>
				<uv-radio-group v-model="model.couponId" :disabled="!canPay">
					<uv-radio
						:customStyle="{ margin: '8px' }"
						v-for="(item, index) in couponData"
						:label="`${item.label}(${item.money}元x${item.number})`"
						:name="item.id"
						:key="index"
						activeColor="#65c6b0"
					>
					</uv-radio>
				</uv-radio-group>
			</view>
			<view>
				<view class="mb-2">
					<text>备注:</text>
				</view>
				<uv-textarea v-model="model.remark" :disabled="hasOrder" placeholder="请输入内容"></uv-textarea>
			</view>
		</view>
		<view v-if="isLogin" class="w-full absolute left-0 bottom-0">
			<view
				class="m-4 min-h-[106rpx] shadow-lg rounded-3xl overflow-hidden bg-[#f8f8f8] flex items-center"
				:class="hasOrder && !canPay ? 'justify-end' : 'justify-between'"
			>
				<view class="px-4 h-full font-bold">
					<text class="text-3xl mr-3 text-[#65c6b0]">
						{{ couponPrice }}
					</text>
					<text v-if="model.couponId" class="text-gray-400 line-through decoration-[#c66565]">
						{{ orderData?.totalPrice }}
					</text>
				</view>
				<view v-if="!hasOrder" class="p-4 h-full text-white bg-[#65c6b0]" @click.stop="placeOrder()">
					立即下单
				</view>
				<view v-else-if="canPay" class="p-4 h-full text-white bg-[#65c6b0]" @click.stop="pay()">立即支付</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
