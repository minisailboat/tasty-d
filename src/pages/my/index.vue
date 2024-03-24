<script setup lang="ts"></script>

<template>
	<view class="my h-full flex flex-col relative">
		<view class="w-full h-4/6 bg-[#65c6b0] absolute top-0"></view>
		<view class="w-full h-4/6 rounded-t-3xl bg-[#F7F7F7] flex flex-col items-center absolute bottom-0">
			<view class="-translate-y-1/2 flex flex-col justify-center items-center relative">
				<uv-image width="180rpx" height="180rpx" radius="12" src="https://cdn.uviewui.com/uview/album/1.jpg" />
				<view class="bg-white rounded-xl absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3">
					<uv-icon class="p-2" name="edit-pen-fill" size="20" />
				</view>
			</view>
			<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
				<uv-icon class="mr-4 p-2" name="account-fill" size="24" color="#c8c8d3" />
				<uv-text size="16" :lines="1" :text="`开饭叫我`" />
				<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
			</view>
			<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
				<uv-icon class="mr-4 p-2" name="phone-fill" size="24" color="#c8c8d3" />
				<uv-text size="16" :lines="1" :text="`绑定手机`" />
				<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
			</view>
			<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
				<uv-icon class="mr-4 p-2" name="empty-permission" bold size="24" color="#c8c8d3" />
				<uv-text size="16" :lines="1" :text="`修改密码`" />
				<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
			</view>
			<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
				<uv-icon class="mr-4 p-2" name="shopping-cart-fill" size="24" color="#c8c8d3" />
				<uv-text size="16" :lines="1" :text="`我的订单`" />
				<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
			</view>
			<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
				<uv-icon class="mr-4 p-2" name="coupon-fill" size="24" color="#c8c8d3" />
				<uv-text size="16" :lines="1" :text="`我的优惠卷`" />
				<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
			</view>
			<view class="w-3/4 h-10 mb-4 rounded bg-[#04041508] flex justify-center items-center">
				<uv-icon class="mr-4 p-2" name="red-packet" bold size="24" color="#c8c8d3" />
				<uv-text size="16" :lines="1" :text="`我的钱包`" />
				<uv-icon class="p-2" name="arrow-right" size="20" color="#c8c8d3" />
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
