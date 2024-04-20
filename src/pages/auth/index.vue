<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { getCurrentInstance, onMounted, ref, watchEffect } from 'vue'
import Register from './Register.vue'
import Login from './Login.vue'

onMounted(() => {
	// 监听事件
	const instance = getCurrentInstance()?.proxy
	const eventChannel = instance?.getOpenerEventChannel()
	eventChannel.on('toRegister', (isLogin: boolean) => {
		// 处理事件
		console.log('toRegister', isLogin)

		showLoginForm.value = isLogin
	})
})

// 登录注册切换
const showLoginForm = ref(true)

// 注册回显
const registerData = ref()
function registerSuccess(data: any) {
	registerData.value = data
	console.log(data, registerData.value)
}

watchEffect(() => {
	if (!showLoginForm.value) {
		registerData.value = {}
	}
})
</script>

<template>
	<view class="h-screen bg-[#65c6b0] flex flex-col justify-between">
		<NavBar back />
		<view class="flex-1 mt-40 reactive rounded-t-3xl overflow-hidden bg-white">
			<view class="h-full flex flex-col items-center overflow-auto">
				<Login v-if="showLoginForm" v-model:show="showLoginForm" :registerData="registerData" />
				<Register v-else v-model:show="showLoginForm" @registerSuccess="registerSuccess" />
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
