import type { ApiResult, PageParam, PageResult, UpdateStateParam } from '@/types/global'
import type { Coupon, CouponSaveParam, CouponUpdateParam } from '@/types/shop/coupon'
import request from '@/utils/request'

const basePath = '/coupon/coupon'
enum Api {
	Page = `${basePath}/page`,
	Query = `${basePath}/query`,
	Common = `${basePath}`,
	Batch = `${basePath}/batch`,
	UpdateState = `${basePath}/state`,
	Existence = `${basePath}/existence`
}

/**
 * 分页查询
 * @returns
 */
export function pageCouponApi(param: PageParam<Coupon>) {
	return request.post<ApiResult<PageResult<Coupon>>>(Api.Page, {
		data: param
	})
}

/**
 * 查询所有
 * @returns
 */
export function queryCouponApi(param: Coupon = {}): Promise<ApiResult<Coupon[]>> {
	return request({
		url: Api.Common + '/noToken/query',
		method: 'POST',
		data: param
	})
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addCouponApi(param: CouponSaveParam) {
	return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateCouponApi(param: CouponUpdateParam) {
	return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteCouponApi(id: string) {
	return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteCouponApi(ids: string[]) {
	return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}

/**
 * 修改状态
 * @param param
 * @returns
 */
export function updateCouponStateApi(param: UpdateStateParam<string, number>) {
	return request.put<ApiResult<boolean>>(Api.UpdateState, { data: param })
}
