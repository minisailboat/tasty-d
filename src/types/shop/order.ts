import type { UserInfo } from '../system/user'
import type { Store } from './store'

export enum OrderStateEnum {
	/** 待支付 */
	WAIT_PAY = 0,
	/** 已支付 */
	PAID = 1,
	/** 待取餐 */
	WAIT_PICKUP = 2,
	/** 已完成 */
	COMPLETED = 3,
	/** 已取消 */
	CANCELED = 4,
	/** 超时未支付 */
	TIMEOUT_PAY = 5,
	/** 超时未接单 */
	TIMEOUT_PICKUP = 6
}

export interface Order {
	couponId?: number
	createTime?: string
	createdBy?: number
	id?: string
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
		label?: string
		foodId?: string
		number?: number
		price?: string
	}[]
	remark?: string
}

export interface OrderSaveParam extends Omit<OrderUpdateParam, 'id'> {}

export interface OrderDetailInfo extends Order {
	id: string
	state: OrderStateEnum
	store: Store
	payer: UserInfo
	payee: UserInfo
	billInfo: any
	couponInfo: {
		id: string
		label: string
		money: string
		description: string
	}
	foods: [
		{
			foodId: string
			storeId: string
			cover: string
			label: string
			description: string
			number: number
			price: string
		}
	]
	expires: number
	expiresUnit: string
	totalPrice: string
}
