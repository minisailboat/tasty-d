export interface Food {
	cover?: string
	createTime?: string
	createdBy?: number
	description?: string
	id?: string | number
	label?: string
	price?: string
	sortValue?: number
	state?: number
	storeId?: string | number
	categoryIds?: (string | number)[]
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

export interface OrderFoodInfo {
	foodId: string
	storeId: string
	cover: string
	label: string
	description: string
	number: number
	price: string
}

export interface StoreCart {
	storeId: string
	cart: Array<OrderFoodInfo>
}

export interface FoodSaveParam extends Omit<FoodUpdateParam, 'id'> {}
