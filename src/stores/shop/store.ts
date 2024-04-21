import { queryFoodTopApi } from '@/api/shop/food'
import { queryStoreApi } from '@/api/shop/store'
import type { Store } from '@/types/shop/store'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreStore = defineStore('store', () => {
	// 菜品数据
	const storeFoodTopMap = ref(new Map())
	function loadFoodTop(storeId: string, top: number) {
		queryFoodTopApi(storeId, top).then(({ data }) => {
			storeFoodTopMap.value.set(storeId, data)
		})
		return storeFoodTopMap
	}

	// 店铺数据
	const storeData = ref<Store[]>([])
	async function loadStore() {
		const { data } = await queryStoreApi()
		data.map((item) => {
			storeFoodTopMap.value.set(item.id, [])
			loadFoodTop(item.id!, 2)
		})
		storeData.value = data ?? []
	}

	return { storeData, loadStore, storeFoodTopMap, loadFoodTop }
})
