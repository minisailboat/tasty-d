<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted, toRef } from 'vue'
import { useCouponStore } from '@/stores/coupon'
import { useBillStore } from '@/stores/bill'

// 获取用户信息
const userStore = useUserStore()
const isLogin = toRef(userStore, 'isLogin')
const userInfo = toRef(userStore, 'userInfo')

// 账单信息
const billStore = useBillStore()
const balance = toRef(billStore, 'balance')

// 优惠券信息
const couponStore = useCouponStore()
const couponTotal = toRef(couponStore, 'total')

// 路由跳转
function toAuth(isLogin: boolean) {
	uni.navigateTo({
		url: '/pages/auth/index',
		success({ eventChannel }) {
			eventChannel.emit('toRegister', isLogin)
		}
	})
}
function toLogout() {
	uni.showToast({
		title: '正在退出登录...',
		icon: 'none',
		success: () => {}
	})
	userStore.logout()
}
function toBill() {
	uni.navigateTo({
		url: '/pages/bill/index'
	})
}
function toCoupon() {
	uni.navigateTo({
		url: '/pages/coupon/index'
	})
}

// 初始化
onMounted(() => {
	if (isLogin.value) {
		billStore.loadBalance()
		couponStore.loadCoupon()
	}
})
</script>

<template>
	<view class="my h-full flex flex-col relative">
		<view class="w-full h-4/6 bg-[#65c6b0] absolute top-0"></view>
		<view class="w-full h-3/6 mb-20 rounded-t-3xl bg-[#F7F7F7] flex flex-col items-center absolute bottom-0">
			<view class="-translate-y-1/2 flex flex-col justify-center items-center relative">
				<uv-image width="180rpx" height="180rpx" radius="12" :src="isLogin ? userInfo?.avatar : ''">
					<template v-slot:error>
						<view style="font-size: 24rpx">{{ isLogin ? '加载失败' : '游客' }}</view>
					</template>
				</uv-image>
				<view
					v-if="isLogin"
					class="bg-white rounded-xl absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3"
				>
					<uv-icon class="p-2" name="edit-pen-fill" size="20" />
				</view>
			</view>
			<template v-if="!isLogin">
				<uv-button
					class="w-3/4"
					type="primary"
					text="登录"
					customStyle="margin-top: 10px; background: #65c6b0; border: none"
					@click="toAuth(true)"
				/>
				<uv-button class="w-3/4" text="注册" customStyle=" margin-top: 10px" @click="toAuth(false)" />
			</template>
			<template v-else>
				<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
					<uv-icon class="mr-4 p-2" name="account-fill" size="24" color="#c8c8d3" />
					<uv-text size="16" :lines="1" :text="userInfo?.username" />
					<!-- <uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" /> -->
				</view>
				<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center" @click="toBill()">
					<uv-icon class="mr-4 p-2" name="red-packet" bold size="24" color="#c8c8d3" />
					<uv-text size="16" :lines="1" :text="`我的余额`" />
					<span class="pr-1">{{ balance }}</span>
					<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
				</view>
				<view
					class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center"
					@click="toCoupon()"
				>
					<uv-icon class="mr-4 p-2" name="coupon-fill" size="24" color="#c8c8d3" />
					<uv-text size="16" :lines="1" :text="`我的优惠卷`" />
					<span class="pr-1">{{ couponTotal }}</span>
					<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
				</view>
				<!-- <view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
					<uv-icon class="mr-4 p-2" name="shopping-cart-fill" size="24" color="#c8c8d3" />
					<uv-text size="16" :lines="1" :text="`我的订单`" />
					<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
				</view> -->
				<!-- <view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
					<uv-icon class="mr-4 p-2" name="phone-fill" size="24" color="#c8c8d3" />
					<uv-text size="16" :lines="1" :text="`绑定手机`" />
					<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
				</view> -->
				<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
					<uv-icon class="mr-4 p-2" name="empty-permission" bold size="24" color="#c8c8d3" />
					<uv-text size="16" :lines="1" :text="`修改密码`" />
					<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
				</view>
				<view class="w-3/4 pb-10">
					<uv-button
						class="w-full"
						type="error"
						text="退出登录"
						customStyle=" margin-top: 10px"
						@click="toLogout()"
					></uv-button>
				</view>
			</template>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
