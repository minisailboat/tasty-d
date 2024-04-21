import { queryStoreApi } from '@/api/shop/store'
import type { Store } from '@/types/shop/store'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreStore = defineStore('store', () => {
	const storeData = ref<Store[]>([]) // 账单数据

	async function loadStore() {
		console.log('loadBalance')
		const { data } = await queryStoreApi()
		console.log(data)

		storeData.value = data ?? []
	}

	return { storeData, loadStore }
})
