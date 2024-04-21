import type { ApiResult } from '@/types/global'
import type { Coupon } from '@/types/shop/coupon'
import request from '@/utils/request'

enum Api {
	Coupon = `/user/sppUserCoupon`,
	Wallet = `/user/userWallet`,
	Bill = `/bill/bill`
}

/**
 * 领取优惠券
 * @returns
 */
export function receiveCouponApi(couponId: string): Promise<ApiResult<Boolean>> {
	return request({
		url: `${Api.Coupon}/${couponId}`,
		method: 'POST'
	})
}

/**
 * 自己的优惠券列表
 * @param state：1、待使用、2：已使用、3：已过期
 * @returns
 */
export function queryCouponSelfApi(state?: number): Promise<ApiResult<Coupon[]>> {
	return request({
		url: `${Api.Coupon}/querySelf`,
		method: 'POST',
		data: {
			state
		}
	})
}

/**
 * 自己的余额
 * @returns
 */
export function queryBalanceSelfApi(): Promise<ApiResult<number>> {
	return request({
		url: `${Api.Wallet}/queryBalanceSelf`,
		method: 'GET'
	})
}

/**
 * 自己的账单
 * @returns
 */
export function queryBillSelfApi(): Promise<ApiResult<Bill[]>> {
	return request({
		url: `${Api.Bill}/queryBillSelf`,
		method: 'GET'
	})
}
