export interface Order {
	couponId?: number
	createTime?: string
	createdBy?: number
	id?: number
	remark?: string
	sortValue?: number
	state?: number
	storeId?: number
	updateTime?: string
	updatedBy?: number
	userId?: number
}

export interface OrderUpdateParam {
	couponId?: number | null
	foods: {
		label: string
		foodId: string
		number: number
		price: string
	}[]
	remark?: string
}

export interface OrderSaveParam extends Omit<OrderUpdateParam, 'id'> {}
