<script setup lang="ts">
import type { TabbarItem } from '@/types'
import { computed } from 'vue'

interface TabbarProps {
	tabbar: TabbarItem[]
	active: TabbarItem
}

const props = defineProps<TabbarProps>()
const emit = defineEmits(['update:active'])

const hide = computed(() => {
	return props.tabbar.length <= 0
})
const isActive = (current: TabbarItem) => {
	return props.active.key === current.key
}
const onTabClick = (current: TabbarItem) => {
	emit('update:active', current)
}
</script>

<template>
	<view
		v-if="!hide"
		class="tabbar h-[120rpx] flex justify-evenly items-center rounded-t-3xl overflow-hidden bg-white"
	>
		<view
			class="tabbar-item w-full h-full flex justify-center items-center"
			v-for="(tab, index) in props.tabbar"
			:key="`${tab.key}_${index}`"
			@click="onTabClick(tab)"
		>
			<uv-icon
				:class="isActive(tab) ? 'active' : ''"
				:name="isActive(tab) ? tab.selectedIcon : tab.icon"
				:size="28"
			/>
		</view>
	</view>
</template>

<style scoped lang="scss">
.tabbar-item {
	.active {
		::v-deep(.uvicon) {
			span {
				color: $color-primary;
			}
		}
	}
}
</style>
