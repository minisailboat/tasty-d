export interface Store {
	id?: string
	createTime?: string
	createdBy?: string
	updateTime?: string
	updatedBy?: string
	adminId?: string
	cover?: string
	label?: string
	description?: string
	startTime?: string
	endTime?: string
	address?: string
	state?: number
	sortValue?: number
	deleted?: boolean
}

export interface StoreUpdateParam {
	id?: number
	adminId?: number
	label?: string
	description?: string
	startTime?: any
	endTime?: any
	address?: string
	cover?: any
	sortValue?: number
	state?: number
}

export interface StoreSaveParam extends Omit<StoreUpdateParam, 'id'> {}
