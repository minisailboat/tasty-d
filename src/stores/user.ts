import { getUserInfoApi, loginApi, logoutApi } from '@/api/login'
import type { LoginParam, LoginUserInfo } from '@/types/login'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const storeSetup = () => {
	const token = ref<string | null>()
	const tokenName = ref('')
	const userInfo = ref<LoginUserInfo>()
	const roles = ref<string[]>([]) // 当前用户角色
	const permissions = ref<string[]>([]) // 当前角色权限标识集合
	const isLogin = computed(() => {
		return token.value != null
	})

	// 登录
	const login = async (params: LoginParam) => {
		const { code, data, message } = await loginApi(params)
		if (code !== 0) {
			uni.showToast({
				title: message ?? '登录失败',
				icon: 'none',
				success: () => {}
			})
			return
		}
		token.value = data?.token ?? ''
		tokenName.value = data?.tokenName ?? ''
		uni.showToast({
			title: '登录成功',
			icon: 'none',
			success: () => {
				getInfo()
				uni.reLaunch({ url: '/pages/Layout' })
			}
		})
	}

	// 退出
	const logout = async () => {
		const { code, message } = await logoutApi()
		if (code !== 0) {
			uni.showToast({
				title: message ?? '获取用户信息失败',
				icon: 'none',
				success: () => {}
			})
		}
		removeToken()
		roles.value = []
		permissions.value = []
	}

	// 获取用户信息
	const getInfo = async () => {
		const { code, data, message } = await getUserInfoApi()
		if (code !== 0) {
			uni.showToast({
				title: message ?? '获取用户信息失败',
				icon: 'none',
				success: () => {}
			})
		}
		userInfo.value = data
	}

	// 移除token
	const removeToken = () => {
		token.value = null
	}

	return { userInfo, tokenName, token, roles, permissions, isLogin, login, logout, getInfo, removeToken }
}

export const useUserStore = defineStore('user', storeSetup, {
	persist: {
		// paths: ['userInfo', 'token', 'roles', 'permissions'],
		storage: localStorage
	}
})
