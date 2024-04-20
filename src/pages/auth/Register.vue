<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
// import dayjs from 'dayjs'

const props = defineProps({
	show: Boolean
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
	formModel.sex = e.value
}

// 生日选择
const birthdayRef = ref<any>(null)
function birthdayConfirm(e: any) {
	// console.log('生日选择', e, dayjs(e.value).format('YYYY-MM-DD HH:mm:ss'))
	console.log('生日选择', e)
}
function formatterBirthday(type: string, value: any) {
	console.log(type, value)

	if (type === 'year') {
		return `${value}年`
	}
	if (type === 'month') {
		return `${value}月`
	}
	if (type === 'day') {
		return `${value}日`
	}
	return value
}

//  表单
const formRef = ref<any>(null)
const formModel = reactive({
	username: '',
	password: '',
	email: '',
	sex: sexData[0].value,
	phone: '',
	birthday: null,
	code: '1234'
})
const rules = reactive({
	userInfo: {
		name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
		sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
	}
})

// 切换登录
function toggleLogin() {
	show.value = !show.value
}
</script>

<template>
	<view class="h-full p-10 mb-40 flex flex-col items-center">
		<h2 class="text-2xl font-bold mb-4">注册</h2>
		<uv-form class="w-[90%]" ref="formRef" labelPosition="left" :model="formModel" :rules="rules">
			<uv-form-item label="" prop="formModel.username" borderBottom>
				<uv-input v-model="formModel.username" placeholder="请输入账号" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="" prop="formModel.password" borderBottom>
				<uv-input v-model="formModel.password" placeholder="请输入密码" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="" prop="formModel.password" borderBottom>
				<uv-input v-model="formModel.password" placeholder="请确认密码" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="" prop="formModel.email" borderBottom>
				<uv-input v-model="formModel.email" placeholder="请输入邮箱" :border="'none'" />
			</uv-form-item>
			<!-- <uv-form-item label="角色" prop="model1.password" borderBottom> </uv-form-item> -->
			<uv-form-item label="性别" prop="formModel.sex" borderBottom @click="showSexSelect">
				<uv-input
					v-model="sexAction.name"
					disabled
					disabledColor="#ffffff"
					placeholder="请选择性别"
					:border="'none'"
				/>
				<template v-slot:right>
					<uv-icon name="arrow-right"></uv-icon>
				</template>
			</uv-form-item>
			<!-- <uv-form-item label="状态" prop="model1.password" borderBottom> </uv-form-item> -->
			<uv-form-item label="手机" prop="formModel.phone" borderBottom>
				<uv-input v-model="formModel.phone" placeholder="请输入手机" :border="'none'" />
			</uv-form-item>
			<uv-form-item label="生日" prop="formModel.birthday" borderBottom @click="() => birthdayRef.open()">
				<uv-datetime-picker
					ref="birthdayRef"
					v-model="formModel.birthday"
					mode="date"
					:formatter="formatterBirthday"
					@confirm="birthdayConfirm"
				/>
			</uv-form-item>
			<uv-form-item label="" prop="model1.code" borderBottom>
				<uv-input v-model="formModel.code" placeholder="请输入验证码" :border="'none'" />
				<uv-image
					width="100px"
					height="40px"
					@click="() => {}"
					url="https://www.baidu.com/img/bd_logo1.png?where=super"
				/>
			</uv-form-item>
			<uv-button type="primary" text="提交" customStyle="margin-top: 10px" @click="() => {}"></uv-button>
			<uv-button text="登录" customStyle="margin-top: 10px" @click="toggleLogin()"></uv-button>
		</uv-form>

		<!-- 性别选择器 -->
		<uv-action-sheet ref="sexSelectRef" :actions="sexData" title="请选择性别" @select="sexSelect"></uv-action-sheet>
	</view>
</template>

<style scoped lang=""></style>
