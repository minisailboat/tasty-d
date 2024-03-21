<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import Tabbar from "@/components/Tabbar.vue";
import Home from "./home/index.vue";
import Order from "./order/index.vue";
import My from "./my/index.vue";

onLoad(() => {});

const tabbar = ref([
	{
		title: "首页",
		icon: "home",
		selectedIcon: "home-fill",
	},
	{
		title: "订单",
		icon: "checkmark-circle",
		selectedIcon: "checkmark-circle-fill",
	},
	{
		title: "我的",
		icon: "account",
		selectedIcon: "account-fill",
	},
]);
const activeTab = ref(0);
</script>

<template>
	<view class="h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar
			v-show="activeTab !== 2"
			:title="activeTab === 1 ? tabbar[activeTab].title : ''"
			:class="activeTab === 0 ? 'bg-[#F7F7F7]' : ''"
		>
			<template #left>
				<view v-if="activeTab === 0" class="pr-2 flex items-center">
					<uv-icon name="map" :size="23" />
					<!-- <text class="ml-2">当前位置</text> -->
					<uv-text :lines="1" text="当前位置当前位置当前位置当前位置当前位置" />
				</view>
			</template>
			<template #right>
				<uv-icon v-if="activeTab === 0" name="search" :size="28" />
			</template>
		</NavBar>
		<view class="content flex-1 bg-[#F7F7F7]">
			<Home v-show="activeTab === 0" />
			<Order v-show="activeTab === 1" />
			<My v-show="activeTab === 2" />
		</view>
		<Tabbar :tabbar="tabbar" v-model:active="activeTab" />
	</view>
</template>

<style scoped lang="scss"></style>
