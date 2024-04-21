<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useBillStore } from '@/stores/bill'
import { useUserStore } from '@/stores/user'
import { onMounted, toRef } from 'vue'

// 用户信息
const userStore = useUserStore()
const userInfo = toRef(userStore, 'userInfo')

// 账单信息
const billStore = useBillStore()
const billData = toRef(billStore, 'billData')

function isPlus(item: Bill) {
	// 收款人是否是自己
	const isEq = item.payeeId === userInfo.value?.id
	return isEq ? '+' : '-'
}

onMounted(() => {
	billStore.loadBalance()
	billStore.loadBill()
})
</script>

<template>
	<view class="food h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar title="我的账单" back class="bg-[#fff]" />
		<uv-empty v-if="billData.length === 0" mode="list" style="margin: auto" />
		<uv-list v-else>
			<uv-list-item
				v-for="item in billData"
				:rightText="`${isPlus(item)}${item.balance}元`"
				:border="true"
				clickable
			>
				<template #header>
					<view class="flex flex-col justify-between">
						<text> {{ item.label }} </text>
						<text class="text-sm mt-2 text-gray-400">
							{{ item.createTime }}
						</text>
					</view>
				</template>
			</uv-list-item>
		</uv-list>
	</view>
</template>

<style scoped lang="scss"></style>
