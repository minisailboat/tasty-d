import { queryBalanceSelfApi, queryBillSelfApi } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBillStore = defineStore('bill', () => {
	const balance = ref(0) // 账户余额
	const billData = ref<Bill[]>([]) // 账单数据

	async function loadBalance() {
		try {
			const { data } = await queryBalanceSelfApi()
			balance.value = data ?? 0
		} catch (error) {
			console.log(error)
		}
	}

	async function loadBill() {
		try {
			const { data } = await queryBillSelfApi()
			billData.value = data ?? []
		} catch (error) {
			console.log(error)
		}
	}

	return { balance, billData, loadBalance, loadBill }
})
