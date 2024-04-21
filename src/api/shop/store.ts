import type { Store, StoreSaveParam, StoreUpdateParam } from '@/types/shop/store'
import type { ApiResult, PageParam, PageResult, UpdateStateParam } from '@/types/global'
import request from '@/utils/request'

const basePath = '/shop/shopStore'
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
export function pageStoreApi(param: PageParam<any>) {
	return request.post<ApiResult<PageResult<any>>>(Api.Page, {
		data: param
	})
}

/**
 * 查询所有
 * @returns
 */
export function queryStoreApi(param: Store = {}) {
	return request.post<Store[]>(Api.Common + '/noToken/query', { data: param })
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addStoreApi(param: StoreSaveParam) {
	return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateStoreApi(param: StoreUpdateParam) {
	return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteStoreApi(id: string) {
	return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteStoreApi(ids: string[]) {
	return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}

/**
 * 修改状态
 * @param param
 * @returns
 */
export function updateStoreStateApi(param: UpdateStateParam<string, number>) {
	return request.put<ApiResult<boolean>>(Api.UpdateState, { data: param })
}
