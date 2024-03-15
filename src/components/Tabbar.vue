<script setup lang="ts">
import { computed } from "vue";

interface TabbarItem {
	title: string;
	icon: string;
	selectedIcon: string;
}

interface TabbarProps {
	tabbar: TabbarItem[];
	active: number;
}

const props = withDefaults(defineProps<TabbarProps>(), {
	tabbar: () => [],
	active: 0,
});
const emit = defineEmits(["update:active"]);

const hide = computed(() => {
	return props.tabbar.length <= 0;
});
const tabbarItemActive = (index: number) => {
	return props.active === index;
};
const onTabClick = (index: number) => {
	emit("update:active", index);
};
</script>

<template>
	<view v-if="!hide" class="tabbar h-[120rpx] flex justify-evenly items-center">
		<view
			class="tabbar-item w-full h-full flex justify-center items-center"
			v-for="(tab, tabIdx) in props.tabbar"
			:class="tabbarItemActive(tabIdx) && 'font-bold'"
			@click="onTabClick(tabIdx)"
		>
			<uv-icon
				:name="tabbarItemActive(tabIdx) ? tab.selectedIcon : tab.icon"
				:size="28"
			/>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
