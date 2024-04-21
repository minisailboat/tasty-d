<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import dayjs from 'dayjs'
import { captchaApi } from '@/api/login'
import { userRegisterApi } from '@/api/system/user'

const props = defineProps({
	show: Boolean
})

const emits = defineEmits(['update:show', 'registerSuccess'])

const show = computed({
	get() {
		return props.show
	},
	set(val) {
		emits('update:show', val)
	}
})

// 性别选择
const sexSelectRef = ref<any>(null)
const sexData = reactive([
	{
		name: '男',
		value: '1'
	},
	{
		name: '女',
		value: '2'
	},
	{
		name: '保密',
		value: '3'
	}
])
const sexAction = ref(sexData[0])
function showSexSelect() {
	sexSelectRef.value.open()
	uni.hideKeyboard()
}
function sexSelect(e: any) {
	console.log(e)
	sexAction.value = e
	formData.sex = e.value
}

// 生日选择
const birthdayRef = ref<any>(null)

//  表单
const formRef = ref<any>(null)
const formData = reactive({
	account: '',
	username: '',
	password: '',
	confirmPassword: '',
	birthday: undefined,
	sex: sexData[0].value,
	email: '',
	mobile: null,
	key: '',
	code: ''
})
const rules = reactive({
	// userInfo: {
	// 	name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	// 	sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
	// },
	account: {
		required: true,
		message: '请输入账号',
		trigger: 'blur'
	},
	username: {
		required: true,
		message: '请输入用户名',
		trigger: 'blur'
	},
	password: {
		required: true,
		message: '请输入密码',
		trigger: 'blur'
	},
	// 校验是否等于密码
	confirmPassword: {
		validator: (rule: { message: string }, value: string) => {
			// 返回true表校验通过，返回false表示不通过
			if (value.trim() === '') {
				rule.message = '请确认密码'
				return false
			}
			const isEq = value === formData.password
			if (!isEq) {
				rule.message = '两次密码输入不一致'
			}
			return isEq
		},
		message: '密码校验失败',
		trigger: ['blur']
	},
	sex: {
		required: true,
		message: '请选择性别',
		trigger: 'change'
	},
	code: {
		required: true,
		message: '请输入验证码',
		trigger: 'blur'
	}
})

// 验证码
const captchaUrl = ref('')
const getCaptcha = async () => {
	const { code, data } = await captchaApi()
	if (code === 0) {
		captchaUrl.value = data?.base64 ?? ''
		formData.code = data?.text ?? ''
		formData.key = data?.key!
	}
}
watchEffect(() => {
	if (!show) return
	getCaptcha()
})

// 提交
async function submit() {
	try {
		await formRef.value?.validate()
		const registerData = {
			...formData,
			birthday: dayjs(formData.birthday).format('YYYY-MM-DD')
		}
		const { success, message } = await userRegisterApi(registerData)
		if (success) {
			formRef.value?.resetFields()
		}
		uni.showToast({
			title: message,
			icon: 'none',
			duration: 2000
		})
		emits('update:show', true)
		emits('registerSuccess', registerData)
	} catch (error) {
		console.log(error)
	}
}

// 切换登录
function toggleLogin() {
	show.value = !show.value
}
</script>

<template>
	<view class="h-full p-10 mb-40 flex flex-col items-center">
		<h2 class="text-2xl font-bold mb-4">注册</h2>
		<uv-form class="w-[90%]" ref="formRef" labelPosition="left" :model="formData" :rules="rules">
			<uv-form-item label="" prop="account" borderBottom>
				<uv-input v-model="formData.account" clearable placeholder="请输入账号" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="" prop="username" borderBottom>
				<uv-input v-model="formData.username" clearable placeholder="请输入用户名" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="" prop="password" borderBottom>
				<uv-input
					v-model="formData.password"
					clearable
					type="password"
					placeholder="请输入密码"
					:border="'none'"
				/>
			</uv-form-item>
			<uv-form-item label="" prop="confirmPassword" borderBottom>
				<uv-input
					v-model="formData.confirmPassword"
					clearable
					type="password"
					placeholder="请确认密码"
					:border="'none'"
				/>
			</uv-form-item>
			<uv-form-item label="" prop="email" borderBottom>
				<uv-input v-model="formData.email" clearable type="email" placeholder="请输入邮箱" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="性别" prop="sex" borderBottom @click="showSexSelect">
				<uv-input
					v-model="sexAction.name"
					clearable
					disabled
					disabledColor="#ffffff"
					placeholder="请选择性别"
					:border="'none'"
				/>
				<template v-slot:right>
					<uv-icon name="arrow-right"></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="手机" prop="mobile" borderBottom>
				<uv-input v-model="formData.mobile" clearable placeholder="请输入手机" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="生日" prop="birthday" borderBottom @click="() => birthdayRef.open()">
				{{ dayjs(formData.birthday).format('YYYY-MM-DD') }}
				<uv-datetime-picker ref="birthdayRef" v-model="formData.birthday" mode="date" />
			</uv-form-item>
			<uv-form-item class="w-full" label="" prop="code" borderBottom>
				<view class="w-4/6 h-[38px] mr-2">
					<uv-input class="flex-1" v-model="formData.code" clearable />
				</view>
				<uv-image :src="captchaUrl" width="218rpx" height="76rpx" mode="aspectFit" @click="getCaptcha()" />
			</uv-form-item>
			<uv-button
				type="primary"
				text="提交"
				customStyle="margin-top: 10px; background: #65c6b0; border: none"
				@click="submit()"
			></uv-button>
			<uv-button text="登录" customStyle="margin-top: 10px" @click="toggleLogin()"></uv-button>
		</uv-form>

		<!-- 性别选择器 -->
		<uv-action-sheet ref="sexSelectRef" :actions="sexData" title="请选择性别" @select="sexSelect"></uv-action-sheet>
	</view>
</template>

<style scoped lang=""></style>
