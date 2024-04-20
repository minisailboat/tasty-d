import type { ApiResult } from '@/types/global'
import request from '@/utils/request'

const basePath = '/user'
enum Api {
	Page = `${basePath}/page`,
	Query = `${basePath}/query`,
	Common = `${basePath}`,
	Batch = `${basePath}/batch`,
	UpdateState = `${basePath}/state`,
	Existence = `${basePath}/existence`
}

/**
 * 领取优惠券
 * @returns
 */
export function receiveCouponApi(couponId: string): Promise<ApiResult<Boolean>> {
	return request({
		url: `${Api.Common}/sppUserCoupon/${couponId}`,
		method: 'POST'
	})
}
