import type { OrderSaveParam, OrderUpdateParam } from '@/types/shop/order'
import type { ApiResult, PageParam, PageResult, UpdateStateParam } from '@/types/global'
import request from '@/utils/request'

const basePath = '/shop/shopOrder'
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
export function pageOrderApi(param: PageParam<any>) {
	return request.post<ApiResult<PageResult<any>>>(Api.Page, {
		data: param
	})
}

/**
 * 查询订单详情
 * @returns
 */
export function orderDetailApi(id: string) {
	return request.get<ApiResult<any>>(`${Api.Common}/detail/${id}`)
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addOrderApi(param: OrderSaveParam) {
	return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 出单
 * @param param
 * @returns
 */
export function sellOrderApi(id: number | string) {
	return request.put<ApiResult<boolean>>(`${Api.Common}/sell/${id}`)
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateOrderApi(param: OrderUpdateParam) {
	return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteOrderApi(id: string) {
	return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteOrderApi(ids: string[]) {
	return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}

/**
 * 修改状态
 * @param param
 * @returns
 */
export function updateOrderStateApi(param: UpdateStateParam<string, number>) {
	return request.put<ApiResult<boolean>>(Api.UpdateState, { data: param })
}
