<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import NavBar from "@/components/NavBar.vue";
import Tabbar from "@/components/Tabbar.vue";

onLoad(() => {});
</script>

<template>
	<view class="home h-screen flex flex-col">
		<NavBar />
		<view class="content flex-1 bg-[#F7F7F7]"></view>
		<Tabbar />
	</view>
</template>

<style scoped lang="scss"></style>
