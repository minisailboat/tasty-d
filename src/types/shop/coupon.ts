export interface Coupon {
	createTime?: string
	createdBy?: number
	description?: string
	expireTime?: string
	id?: number
	label?: string
	money?: number
	number?: number
	sortValue?: number
	state?: number
	updateTime?: string
	updatedBy?: number
}

export interface CouponUpdateParam {
	description?: string
	expireTime?: string
	id?: number
	label?: string
	money?: number
	number?: number
	sortValue?: number
	state?: number
}

export interface CouponSaveParam extends Omit<CouponUpdateParam, 'id'> {}
