<script setup lang="ts">
import { updateUserApi } from '@/api/system/user'
import NavBar from '@/components/NavBar.vue'
import { useUserStore } from '@/stores/user'
import { reactive, ref, toRef } from 'vue'
import dayjs from 'dayjs'
import { uploadFileApi } from '@/api/system/file'

const userStore = useUserStore()
const userInfo = toRef(userStore, 'userInfo')

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
	id: userInfo.value?.id!,
	username: userInfo.value?.username!,
	// email: '',
	sex: userInfo.value?.sex!,
	// mobile: '',
	birthday: undefined,
	roleIds: userInfo.value?.roles!,
	avatar: [
		{
			url: userInfo.value?.avatar!
		}
	]
})
const rules = reactive({
	username: {
		required: true,
		message: '请输入用户名',
		trigger: 'blur'
	}
})

// 删除图片
function deletePic(event: { name: string; index: any }) {
	formData.avatar.splice(event.index, 1)
}
// 新增图片
async function afterRead(event: { file: ConcatArray<never>; name: any }) {
	console.log(event)
	// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
	let lists: any = [].concat(event.file)
	let fileListLen = formData.avatar.length
	lists.map((item: any) => {
		formData.avatar.push({
			...item,
			status: 'uploading',
			message: '上传中'
		})
	})
	for (const item of lists) {
		console.log(item)
	}
}

// 提交
async function submit() {
	try {
		await formRef.value?.validate()
		const { success, message } = await updateUserApi(formData)
		if (success) {
			formRef.value?.resetFields()
		}
		uni.showToast({
			title: message,
			icon: 'none',
			duration: 2000
		})
		uni.navigateBack({
			delta: 1
		})
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<view class="food h-screen flex flex-col bg-[#F7F7F7]">
		<NavBar title="修改信息" back class="bg-[#fff]" />
		<uv-form ref="formRef" class="p-8 h-full bg-white" labelPosition="left" :model="formData" :rules="rules">
			<uv-form-item label="用户名" prop="username" borderBottom>
				<uv-input v-model="formData.username" clearable placeholder="请输入用户名" :border="'none'" />
			</uv-form-item>
			<!-- <uv-form-item label="" prop="email" borderBottom>
				<uv-input v-model="formData.email" clearable type="email" placeholder="请输入邮箱" :border="'none'" />
			</uv-form-item> -->
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
			<!-- <uv-form-item label="手机" prop="mobile" borderBottom>
				<uv-input v-model="formData.mobile" clearable placeholder="请输入手机" :border="'none'" />
			</uv-form-item> -->
			<uv-form-item label="生日" prop="birthday" borderBottom @click="() => birthdayRef.open()">
				{{ dayjs(formData.birthday).format('YYYY-MM-DD') }}
				<uv-datetime-picker ref="birthdayRef" v-model="formData.birthday" mode="date" />
			</uv-form-item>
			<!-- <uv-form-item label="角色" prop="roleIds" borderBottom>
				<uv-input v-model="formData.roleIds" clearable placeholder="请输入手机" :border="'none'" />
			</uv-form-item> -->
			<uv-form-item label="" prop="avatar" borderBottom>
				<view class="flex-col">
					<view class="pb-2">
						<text>头像</text>
					</view>
					<uv-upload
						:fileList="formData.avatar"
						name="avatar"
						:maxCount="1"
						:previewFullImage="true"
						@afterRead="afterRead"
						@delete="deletePic"
					></uv-upload>
				</view>
			</uv-form-item>
			<uv-button
				type="primary"
				text="提交"
				customStyle="margin-top: 10px; background: #65c6b0; border: none"
				@click="submit()"
			/>
		</uv-form>

		<!-- 性别选择器 -->
		<uv-action-sheet ref="sexSelectRef" :actions="sexData" title="请选择性别" @select="sexSelect"></uv-action-sheet>
	</view>
</template>

<style scoped lang="scss"></style>
