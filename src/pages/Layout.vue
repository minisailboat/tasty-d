<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import Tabbar from "@/components/Tabbar.vue";
import Home from "./home/index.vue";
import Order from "./order/index.vue";
import My from "./my/index.vue";
import type { TabbarItem } from "@/types/index";
import { TabbarEnum } from "@/enums";

onLoad(() => {});

const tabbar = ref<TabbarItem[]>([
	{
		key: TabbarEnum.HOME,
		title: "首页",
		icon: "home",
		selectedIcon: "home-fill",
	},
	{
		key: TabbarEnum.ORDER,
		title: "订单",
		icon: "file-text",
		selectedIcon: "file-text-fill",
	},
	{
		key: TabbarEnum.CART,
		title: "购物车",
		icon: "shopping-cart",
		selectedIcon: "shopping-cart-fill",
	},
	{
		key: TabbarEnum.MY,
		title: "我的",
		icon: "account",
		selectedIcon: "account-fill",
	},
]);
const activeTab = ref<number>(0);
</script>

<template>
	<view class="h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar
			v-show="tabbar[activeTab].key !== TabbarEnum.MY"
			:title="
				tabbar[activeTab].key === TabbarEnum.ORDER
					? tabbar[activeTab].title
					: ''
			"
			:class="tabbar[activeTab].key === TabbarEnum.HOME ? 'bg-[#F7F7F7]' : ''"
		>
			<template #left>
				<view
					v-if="tabbar[activeTab].key === TabbarEnum.HOME"
					class="pr-2 flex items-center"
				>
					<uv-icon name="map" :size="23" />
					<!-- <text class="ml-2">当前位置</text> -->
					<uv-text :lines="1" text="当前位置当前位置当前位置当前位置当前位置" />
				</view>
			</template>
			<template #right>
				<uv-icon
					v-if="tabbar[activeTab].key === TabbarEnum.HOME"
					name="search"
					:size="28"
				/>
			</template>
		</NavBar>
		<view class="content flex-1 bg-[#F7F7F7]">
			<Home v-show="tabbar[activeTab].key === TabbarEnum.HOME" />
			<Order v-show="tabbar[activeTab].key === TabbarEnum.ORDER" />
			<My v-show="tabbar[activeTab].key === TabbarEnum.MY" />
		</view>
		<Tabbar :tabbar="tabbar" v-model:active="activeTab" />
	</view>
</template>

<style scoped lang="scss"></style>
