import type { StoreCart } from '@/types/shop/food'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const storeSetup = () => {
	const storeCart = ref<StoreCart[]>()

	function getCatByStoreId(storeId: string) {
		let storeCartItem = storeCart.value?.find((item: StoreCart) => item.storeId === storeId)
		if (!storeCartItem) {
			storeCartItem = {
				storeId,
				cart: []
			}
			storeCart.value?.push(storeCartItem)
		}
		return storeCartItem
	}

	return {
		storeCart,
		getCatByStoreId
	}
}

export const useCartStore = defineStore('cart', storeSetup, {
	persist: {
		// paths: ['userInfo', 'token', 'roles', 'permissions'],
		storage: localStorage
	}
})
