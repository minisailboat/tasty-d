<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'

const back = () => {
	uni.navigateBack()
}
</script>

<template>
	<div class="filter h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar>
			<template #left>
				<view class="pr-2 flex items-center">
					<uv-icon name="close-circle" :size="28" @click="() => back()" />
				</view>
			</template>
		</NavBar>
		<view>筛选页</view>
	</div>
</template>

<style scoped lang="scss"></style>
