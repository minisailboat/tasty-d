<script setup lang="ts">
import { captchaApi } from '@/api/login'
import { useUserStore } from '@/stores/user'
import { computed, reactive, ref, watchEffect } from 'vue'

const props = defineProps({
	show: Boolean,
	registerData: {
		type: Object
	}
})
const emits = defineEmits(['update:show'])

const show = computed({
	get() {
		return props.show
	},
	set(val) {
		emits('update:show', val)
	}
})

// 表单
const formRef = ref<any>(null)
const formData = reactive({
	// account: props.registerData?.account ?? 'superAdmin',
	account: props.registerData?.account ?? 'shufen',
	password: props.registerData?.password ?? '123456',
	code: '',
	key: ''
})
const rules = reactive({
	userInfo: {
		name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
		sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
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

const userStore = useUserStore()

async function submit() {
	try {
		console.log(userStore)
		await formRef.value?.validate()
		await userStore?.login(formData)
	} catch (error) {
		console.log(error)
	}
}

// 登录切换
function toggleLogin() {
	show.value = !show.value
}
</script>

<template>
	<view class="h-full p-10 flex flex-col items-center">
		<h2 class="text-2xl font-bold mb-4">登录</h2>
		<uv-form class="w-[90%]" ref="formRef" labelPosition="left" :model="formData" :rules="rules">
			<uv-form-item label="" prop="formData.account" borderBottom>
				<uv-input v-model="formData.account" clearable placeholder="请输入账号" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="" prop="formData.password" borderBottom>
				<uv-input
					v-model="formData.password"
					type="password"
					clearable
					placeholder="请输入密码"
					:border="'none'"
				/>
			</uv-form-item>
			<uv-form-item class="w-full" label="" labelWidth="auto" prop="code" borderBottom>
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
			<uv-button text="注册" customStyle="margin-top: 10px" @click="toggleLogin()"></uv-button>
		</uv-form>
	</view>
</template>

<style scoped lang=""></style>
