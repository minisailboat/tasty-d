<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import Register from './Register.vue'
import Login from './Login.vue'

const showLoginForm = ref(true)
</script>

<template>
	<view class="h-screen bg-[#65c6b0] flex flex-col justify-between">
		<NavBar back />
		<view class="flex-1 mt-40 reactive rounded-t-3xl overflow-hidden bg-white">
			<view class="h-full flex flex-col items-center overflow-auto">
				<Login v-if="showLoginForm" v-model:show="showLoginForm" />
				<Register v-else v-model:show="showLoginForm" />
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
