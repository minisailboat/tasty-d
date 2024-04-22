<script setup lang="ts">
import { changeUserPasswordApi } from '@/api/system/user'
import NavBar from '@/components/NavBar.vue'
import { useUserStore } from '@/stores/user'
import { reactive, ref } from 'vue'

const userStore = useUserStore()

//  表单
const formRef = ref<any>(null)
const formData = reactive({
	/** 旧密码 */
	oldPwd: '',
	/** 新密码 */
	newPwd: '',
	/** 确认密码 */
	confirmPwd: ''
})
const rules = reactive({
	oldPwd: {
		required: true,
		message: '请输入旧密码',
		trigger: 'blur'
	},
	newPwd: {
		required: true,
		message: '请输入新密码',
		trigger: 'blur'
	},
	confirmPwd: {
		validator: (rule: { message: string }, value: string) => {
			// 返回true表校验通过，返回false表示不通过
			if (value.trim() === '') {
				rule.message = '请确认密码'
				return false
			}
			const isEq = value === formData.newPwd
			if (!isEq) {
				rule.message = '两次密码输入不一致'
			}
			return isEq
		},
		message: '密码校验失败',
		trigger: ['blur']
	}
})

// 提交
async function submit() {
	try {
		await formRef.value?.validate()
		const { success, message } = await changeUserPasswordApi(formData)
		if (success) {
			formRef.value?.resetFields()
		}
		uni.showToast({
			title: message,
			icon: 'none',
			duration: 2000
		})
		uni.navigateBack({
			delta: 1,
			success: () => {
				userStore.logout()
			}
		})
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<view class="food h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar title="修改密码" back class="bg-[#fff]" />
		<uv-form ref="formRef" class="p-8 h-full bg-white" labelPosition="left" :model="formData" :rules="rules">
			<uv-form-item label="" prop="oldPwd" borderBottom>
				<uv-input
					v-model="formData.oldPwd"
					clearable
					type="password"
					placeholder="请输入密码"
					:border="'none'"
				/>
			</uv-form-item>
			<uv-form-item label="" prop="newPwd" borderBottom>
				<uv-input
					v-model="formData.newPwd"
					clearable
					type="password"
					placeholder="请输入密码"
					:border="'none'"
				/>
			</uv-form-item>
			<uv-form-item label="" prop="confirmPwd" borderBottom>
				<uv-input
					v-model="formData.confirmPwd"
					clearable
					type="password"
					placeholder="请确认密码"
					:border="'none'"
				/>
			</uv-form-item>
			<uv-button
				type="primary"
				text="提交"
				customStyle="margin-top: 10px; background: #65c6b0; border: none"
				@click="submit()"
			/>
		</uv-form>
	</view>
</template>

<style scoped lang="scss"></style>
