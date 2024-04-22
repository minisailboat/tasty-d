import type { OrderFoodInfo } from './shop/food'
import type { Store } from './shop/store'

export interface OrderInfo {
	value: OrderInfo
	store: Store
	cart: OrderFoodInfo[]
	totalPrice: number
}
