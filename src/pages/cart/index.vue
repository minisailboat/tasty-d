<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { watchEffect } from 'vue'
import { ref } from 'vue'

onLoad(() => {})
const cart = ref(Array.from({ length: 20 }, (_, index) => ({ name: `name_${index}`, value: index })))
const plus = () => {
	console.log('添加')
}
const minus = () => {
	console.log('减少')
}
const toFoodDetail = (food: any) => {
	console.log(food)
	uni.navigateTo({
		url: '/pages/menu/Detail'
	})
}
// 选择
const selected = ref<string[]>([])
const selectedAll = ref<string[]>([])
// 全选
watchEffect(() => {
	if (selectedAll.value[0] === 'all') {
		selected.value = Array.from({ length: 20 }, (_, index) => `name_${index}`)
	} else {
		selected.value = []
	}
})
// 结算
const calculateTotal = () => {
	console.log(selected.value)
}
</script>

<template>
	<view class="cart h-full flex flex-col relative">
		<view class="pb-16 overflow-y-auto">
			<!-- 购物车 -->
			<view class="mb-4 flex flex-col">
				<view class="mx-4 mb-2">
					<!-- <uv-text bold size="16" :lines="1" :text="`购物车`" /> -->
				</view>
				<!-- 列表 -->
				<view class="px-4">
					<uv-checkbox-group v-model="selected" activeColor="#65c6b0" :customStyle="{ width: '100%' }">
						<uv-checkbox
							shape="circle"
							:label="item.name"
							:name="item.name"
							:customStyle="{ width: '100%' }"
							v-for="item in cart"
							:key="item"
						>
							<view
								class="w-full h-[190rpx] mb-2 flex items-center"
								@click.stop="() => toFoodDetail(item)"
							>
								<uv-image
									class="mr-2"
									width="180rpx"
									height="180rpx"
									radius="12"
									src="https://cdn.uviewui.com/uview/album/1.jpg"
								></uv-image>
								<view class="w-full h-full p-2 rounded-xl bg-white box-border flex flex-col">
									<uv-text bold size="16" :lines="1" :text="`KFC(${item.value})`" />
									<view class="flex-1 flex justify-between">
										<view class="flex items-center">
											<view class="flex text-sm text-[#ff5722]">
												<text>￥</text>
												<uv-text bold size="18" :lines="1" color="#ff5722" :text="`46`" />
											</view>
										</view>
										<view class="flex items-end">
											<view class="flex text-sm" @click.stop>
												<uv-icon
													class="mr-1 p-1"
													name="plus-circle"
													:size="24"
													color="#65c6b0"
													@click="plus"
												/>
												<uv-text bold size="18" :lines="1" :text="2" />
												<uv-icon
													class="ml-1 p-1"
													name="minus-circle"
													:size="24"
													color="#65c6b0"
													@click="minus"
												/>
											</view>
										</view>
									</view>
								</view>
							</view>
						</uv-checkbox>
					</uv-checkbox-group>
				</view>
			</view>
		</view>
		<!-- 合计 -->
		<view class="w-full p-4 box-border absolute bottom-0">
			<view class="px-4 py-2 rounded-xl bg-white flex justify-center items-center">
				<view class="h-full flex">
					<uv-checkbox-group v-model="selectedAll" activeColor="#65c6b0">
						<uv-checkbox shape="circle" label="全选" name="all" />
					</uv-checkbox-group>
				</view>
				<view class="p-2 flex-1 flex justify-end">
					<text>{{ `合计：￥${0}` }}</text>
				</view>
				<uv-button type="primary" shape="circle" color="#65c6b0" text="去结算" @click="calculateTotal" />
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
satatchatchEffect onst
