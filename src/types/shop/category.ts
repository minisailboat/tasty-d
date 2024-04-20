export interface Category {
	createTime?: string
	createdBy?: number
	description?: string
	id?: number
	label?: string
	sortValue?: number
	state?: number
	storeId?: number
	updateTime?: string
	updatedBy?: number
}

export interface CategoryUpdateParam {
	description?: string
	id?: number
	label?: string
	sortValue?: number
	state?: number
	storeId?: number | null
}

export interface CategorySaveParam extends Omit<CategoryUpdateParam, 'id'> {}
