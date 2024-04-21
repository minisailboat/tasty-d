<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useCouponStore } from '@/stores/coupon'
import type { Coupon } from '@/types/shop/coupon'
import { onMounted, ref, toRef } from 'vue'

// 优惠券信息
const couponStore = useCouponStore()
const couponData = toRef(couponStore, 'couponData')

const couponPopupRef = ref<any>(null)
const activeCoupon = ref<Coupon>()
function openCouponPopup(data: Coupon) {
	activeCoupon.value = data
	couponPopupRef.value.open()
}

onMounted(() => {
	couponStore.loadCoupon()
})
</script>

<template>
	<view class="food h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar title="我的优惠券" back class="bg-[#fff]" />
		<uv-empty v-if="couponData.length === 0" mode="list" style="margin: auto" />
		<uv-list v-else>
			<uv-list-item
				v-for="item in couponData"
				:title="item.label"
				:rightText="`${item?.money}元 x ${item.number}`"
				:border="true"
				clickable
				@click="openCouponPopup(item)"
			></uv-list-item>
		</uv-list>
		<uv-popup ref="couponPopupRef" mode="bottom" :round="20">
			<uv-list class="mt-4">
				<uv-list-item :title="activeCoupon?.label"></uv-list-item>
				<uv-list-item :title="activeCoupon?.description" :disabled="true"></uv-list-item>
				<uv-list-item :title="'金额'" :rightText="activeCoupon?.money + '元'"></uv-list-item>
				<uv-list-item :title="'剩余量'" :rightText="activeCoupon?.number + '张'"></uv-list-item>
				<uv-list-item :title="'有效期'" :rightText="activeCoupon?.expireTime"></uv-list-item>
			</uv-list>
		</uv-popup>
	</view>
</template>

<style scoped lang="scss"></style>
