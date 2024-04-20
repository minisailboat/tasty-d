// import { useUserStore } from '@/stores/user'
import type { ApiResult } from '@/types/global'
import type { CaptchaResult, LoginParam, LoginResult, LoginUserInfo } from '@/types/login'
import { cryptoEncode } from '@/utils/crypto'
import request from '@/utils/request'

enum Api {
	Login = '/login',
	Logout = '/logout',
	Captcha = '/captcha',
	GetUserInfo = '/system/user/info',
	GetUserMenu = '/system/user/menu'
}

/**
 * 用户登录
 * @param data 登录参数
 * @returns
 */
export async function loginApi(data: LoginParam): Promise<ApiResult<LoginResult>> {
	// 密码加密
	data.password && (data.password = cryptoEncode(data.password))
	return request({
		url: Api.Login,
		method: 'POST',
		data
	})
}

/**
 * 注销登录
 * @returns
 */
export function logoutApi(): Promise<ApiResult<LoginResult>> {
	return request({
		url: Api.Logout,
		method: 'GET'
	})
}

/**
 * 获取验证码
 * @returns
 */
export function captchaApi(): Promise<ApiResult<CaptchaResult>> {
	return request({
		url: Api.Captcha,
		method: 'GET'
	})
}

/**
 * 获取当前用户基本信息
 * @returns
 */
export function getUserInfoApi(): Promise<ApiResult<LoginUserInfo>> {
	return request({
		url: Api.GetUserInfo,
		method: 'GET'
	})
}
