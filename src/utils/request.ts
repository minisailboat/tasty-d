import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'

const axiosConfig = {
	baseURL: import.meta.env.VITE_BASE_URL,
	// baseURL: '/',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
}

const request = axios.create(axiosConfig)

/**
 * 显示错误信息
 * @param code 不可为空，http响应码，非接口返回的 { code:xxx }
 * @param msg 可为空，接口返回的 { message:xxx }
 */
const showErrorMsg = (code: number, msg?: string) => {
	const userStore = useUserStore()
	// uni.hideToast()
	// uni.hideLoading()
	switch (code) {
		case 401: {
			console.log('登录过期')
			// 登录过期处理
			uni.showToast({
				// title: msg ?? '登录状态已过期',
				title: '请先登录',
				icon: 'none',
				duration: 2000,
				success: () => {
					console.log('登录过期success')
					userStore.removeToken()
					// uni.navigateTo({ url: '/pages/auth/index' })
				}
			})
			break
		}
		case 403: {
			// 无权限处理
			uni.showToast({
				title: msg ?? '没有权限',
				icon: 'error',
				duration: 2000,
				success: () => {}
			})
			break
		}
		case 500: {
			// 系统错误
			uni.showToast({
				title: msg ?? '系统错误',
				icon: 'error',
				duration: 2000,
				success: () => {}
			})
			break
		}
		default: {
			// 未知错误
			uni.showToast({
				title: msg ?? '未知错误',
				icon: 'error',
				duration: 2000,
				success: () => {}
			})
			break
		}
	}
}

// 请求拦截器
request.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const userStore = useUserStore()
		// 设置token
		if (userStore.token && config.headers) {
			config.headers[userStore.tokenName] = userStore.token
		}
		return config
	},
	(error) => {
		console.log(error)
	}
)

// 响应拦截器
request.interceptors.response.use(
	async (response: AxiosResponse) => {
		return response.data
	},
	(error) => {
		// 解构错误信息，拿到AxiosResponse
		const { message, response } = error
		// 解构AxiosResponse，拿到错误码和接口响应数据
		const { status, data } = response
		console.log('相应状态', status, typeof status, status === 401)

		showErrorMsg(status, data.message ?? message)
		return Promise.reject(data)
	}
)

export default request
