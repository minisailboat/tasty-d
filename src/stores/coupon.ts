import { queryCouponSelfApi } from '@/api/user'
import type { Coupon } from '@/types/shop/coupon'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCouponStore = defineStore('coupon', () => {
	const couponData = ref<Coupon[]>([])
	const total = computed(() => couponData.value.reduce((total: number, current: any) => total + current.number, 0))
	// 1、待使用、2：已使用、3：已过期
	const unusedData = computed(() => couponData.value.filter((item: any) => item.state === 1))
	const usedData = computed(() => couponData.value.filter((item: any) => item.state === 2))
	const expiredData = computed(() => couponData.value.filter((item: any) => item.state === 3))
	async function loadCoupon(state?: number) {
		const { success, message, data } = await queryCouponSelfApi(state)
		if (success) {
			couponData.value = data ?? []
		}
		// uni.showToast({
		// 	title: success ? message : '获取优惠券失败',
		// 	icon: 'none'
		// })
	}

	return { couponData, total, unusedData, usedData, expiredData, loadCoupon }
})
