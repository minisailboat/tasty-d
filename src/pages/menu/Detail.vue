<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { getCurrentInstance, onMounted, ref } from 'vue'

const foodId = ref<string>()

onMounted(() => {
	// 监听事件
	const instance = getCurrentInstance()?.proxy
	const eventChannel = instance?.getOpenerEventChannel()
	eventChannel.on('openFood', (id: string) => {
		// 处理事件
		console.log('openFood', id)
		foodId.value = id
	})
})
</script>

<template>
	<div class="food-detail h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar back />
		菜品详情({{ foodId }})
	</div>
</template>

<style scoped lang="scss"></style>
