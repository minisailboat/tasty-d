<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'

const couponData = ref([])
</script>

<template>
	<view class="food h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar title="我的账单" back class="bg-[#fff]" />
		<uv-empty v-if="couponData.length === 0" mode="list" style="margin: auto" />
		<uv-list v-else>
			<uv-list-item
				v-for="item in couponData"
				:title="item"
				:rightText="`${0}元`"
				:border="true"
				clickable
			></uv-list-item>
		</uv-list>
	</view>
</template>

<style scoped lang="scss"></style>
