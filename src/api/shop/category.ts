import type { ApiResult, PageParam, PageResult, UpdateStateParam } from '@/types/global'
import type { Category, CategorySaveParam, CategoryUpdateParam } from '@/types/shop/category'
import request from '@/utils/request'

const basePath = '/shop/shopStoreFoodCategory'
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
export function pageCategoryApi(param: PageParam<any>) {
	return request.post<ApiResult<PageResult<any>>>(Api.Page, {
		data: param
	})
}

/**
 * 查询所有
 * @returns
 */
export function queryFoodCategoryApi(param: Category = {}): Promise<ApiResult<Category[]>> {
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
export function addCategoryApi(param: CategorySaveParam) {
	return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateCategoryApi(param: CategoryUpdateParam) {
	return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteCategoryApi(id: string) {
	return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteCategoryApi(ids: string[]) {
	return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}

/**
 * 修改状态
 * @param param
 * @returns
 */
export function updateCategoryStateApi(param: UpdateStateParam<string, number>) {
	return request.put<ApiResult<boolean>>(Api.UpdateState, { data: param })
}
