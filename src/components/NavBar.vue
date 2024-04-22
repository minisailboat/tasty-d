<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	class: {
		type: String,
		default: ''
	},
	back: {
		type: Boolean,
		default: false
	}
})

const back = () => {
	uni.navigateBack()
}
</script>

<template>
	<view class="navbar px-4 h-[120rpx] box-border flex justify-between items-center" :class="props.class">
		<view class="flex-1 h-full flex justify-start items-center">
			<slot name="left">
				<view v-if="props.back" class="pr-2 flex items-center">
					<uv-icon name="arrow-left" :size="28" @click="() => back()" />
				</view>
			</slot>
		</view>
		<view class="h-full flex justify-start items-center">
			<slot name="default">{{ props.title }}</slot>
		</view>
		<view class="flex-1 h-full flex justify-end items-center">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<style scoped lang="scss">
.navbar {
	padding-top: var(--status-bar-height);
}
</style>
