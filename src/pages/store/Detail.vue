<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import type { Food } from '@/types/shop/food'
import { getCurrentInstance, onMounted, ref } from 'vue'

const foodData = ref<Food>()

onMounted(() => {
	// 监听事件
	const instance = getCurrentInstance()?.proxy
	const eventChannel = instance?.getOpenerEventChannel()
	eventChannel.on('openFood', (food: Food) => {
		// 处理事件
		console.log('openFood', food)
		foodData.value = food
	})
})
</script>

<template>
	<div class="food-detail h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar back :title="foodData?.label" />
		{{ foodData?.id }}
	</div>
</template>

<style scoped lang="scss"></style>
