<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Tabbar from '@/components/Tabbar.vue'
import Home from './home/index.vue'
import Order from './order/index.vue'
import Cart from './cart/index.vue'
import My from './my/index.vue'
import type { TabbarItem } from '@/types/index'
import { TabbarEnum } from '@/enums'
import { useUserStore } from '@/stores/user'

onLoad(() => {})

const tabbar = ref<TabbarItem[]>([
	{
		key: TabbarEnum.HOME,
		title: '首页',
		icon: 'home',
		selectedIcon: 'home-fill'
	},
	{
		key: TabbarEnum.ORDER,
		title: '订单',
		icon: 'file-text',
		selectedIcon: 'file-text-fill'
	},
	// {
	// 	key: TabbarEnum.CART,
	// 	title: '购物车',
	// 	icon: 'shopping-cart',
	// 	selectedIcon: 'shopping-cart-fill'
	// },
	{
		key: TabbarEnum.MY,
		title: '我的',
		icon: 'account',
		selectedIcon: 'account-fill'
	}
])
const activeTab = ref<TabbarItem>(tabbar.value[0])
const toFilter = () => {
	uni.navigateTo({
		url: '/pages/filter/index'
	})
}

const userStore = useUserStore()
onMounted(() => {
	userStore.getInfo()
})
</script>

<template>
	<view class="h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar
			v-show="![TabbarEnum.MY].includes(activeTab.key)"
			:title="[TabbarEnum.ORDER, TabbarEnum.CART].includes(activeTab.key) ? activeTab.title : ''"
			:class="activeTab.key === TabbarEnum.HOME ? '' : ''"
		>
			<template #left>
				<view v-if="activeTab.key === TabbarEnum.HOME" class="pr-2 flex items-center">
					<uv-icon name="scan" :size="28" />
					<!-- <uv-icon name="map" :size="23" />
					<uv-text :lines="1" text="当前位置当前位置当前位置当前位置当前位置" /> -->
				</view>
			</template>
			<template #right>
				<uv-icon v-if="activeTab.key === TabbarEnum.HOME" name="search" :size="28" @click="toFilter" />
			</template>
		</NavBar>
		<view class="content flex-1 overflow-y-auto">
			<Home v-show="activeTab.key === TabbarEnum.HOME" />
			<Order v-if="activeTab.key === TabbarEnum.ORDER" />
			<Cart v-show="activeTab.key === TabbarEnum.CART" />
			<My v-show="activeTab.key === TabbarEnum.MY" />
		</view>
		<Tabbar :tabbar="tabbar" v-model:active="activeTab" />
	</view>
</template>

<style scoped lang="scss"></style>
