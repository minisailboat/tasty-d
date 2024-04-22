import type { Food, FoodSaveParam, FoodUpdateParam } from '@/types/shop/food'
import type { ApiResult, PageParam, PageResult, UpdateStateParam } from '@/types/global'
import request from '@/utils/request'
import type { Store } from '@/types/shop/store'

const basePath = '/shop/shopStoreFood'
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
export function pageFoodApi(param: PageParam<any>) {
	return request.post<ApiResult<PageResult<any>>>(Api.Page, {
		data: param
	})
}

/**
 * 查询所有
 * @returns
 */
export function queryFoodApi(param: Food = {}): Promise<ApiResult<Food[]>> {
	// return request.post<ApiResult<Food[]>>(Api.Query, { data: param })
	return request({
		url: Api.Common + '/noToken/query',
		method: 'POST',
		data: param
	})
}

/**
 * 查询所有
 * @returns
 */
export function queryWithFoodApi(label: string): Promise<ApiResult<Store[]>> {
	return request({
		url: Api.Common + '/noToken/queryWithFood',
		method: 'POST',
		data: {
			label
		}
	})
}

/**
 * 获取指定店铺 Top n 菜品
 */
export function queryFoodTopApi(storeId: string, top: number) {
	return request.get<ApiResult<Food[]>>(`${Api.Common}/noToken/${storeId}/top/${top}`)
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addFoodApi(param: FoodSaveParam) {
	return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateFoodApi(param: FoodUpdateParam) {
	return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteFoodApi(id: string) {
	return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteFoodApi(ids: string[]) {
	return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}

/**
 * 修改状态
 * @param param
 * @returns
 */
export function updateFoodStateApi(param: UpdateStateParam<string, number>) {
	return request.put<ApiResult<boolean>>(Api.UpdateState, { data: param })
}
