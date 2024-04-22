import type { OrderFoodInfo } from './shop/food'
import type { OrderStateEnum } from './shop/order'
import type { Store } from './shop/store'

export interface OrderInfo {
	id: string | null
	state: OrderStateEnum | null
	store: Store
	cart?: OrderFoodInfo[]
	foods?: OrderFoodInfo[]
	totalPrice: number
}
