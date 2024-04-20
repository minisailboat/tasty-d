export interface Food {
	cover?: string
	createTime?: string
	createdBy?: number
	description?: string
	id?: string
	label?: string
	price?: string
	sortValue?: number
	state?: number
	storeId?: number
	updateTime?: string
	updatedBy?: number
}

export interface FoodUpdateParam {
	cover?: string
	description?: string
	id?: number
	label?: string
	price?: string
	sortValue?: number
	state?: number
	storeId?: number | null
}

export interface FoodSaveParam extends Omit<FoodUpdateParam, 'id'> {}
