<script setup lang="ts"></script>

<template>
	<view
		class="navbar px-4 h-[120rpx] box-border flex justify-between items-center"
	>
		<view slot="left">1</view>
		<view slot="default">2</view>
		<view slot="right">3</view>
	</view>
</template>

<style scoped lang="scss">
.navbar {
	padding-top: var(--status-bar-height);
}
</style>
