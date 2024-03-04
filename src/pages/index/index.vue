<script setup lang="ts">
const change = (e: any) => {
	console.log("弹窗打开状态：", e);
};
</script>

<template>
	<view class="content" style="height: 1000px">
		<uv-drop-down
			ref="dropDown"
			sign="dropDown_1"
			:defaultValue="[0, '0', 'all']"
		>
			<uv-drop-down-item name="order" type="2" label="综合排序" value="all">
				123
			</uv-drop-down-item>
			<uv-drop-down-item name="type" type="2" label="文档格式" value="0">
				456
			</uv-drop-down-item>
			<uv-drop-down-item name="vip_type" type="1" label="VIP文档" :value="0">
				678
			</uv-drop-down-item>
		</uv-drop-down>
		<uv-drop-down-popup sign="dropDown_1" @popupChange="change">
			<view style="width: 750rpx; height: 300rpx; background-color: #fff">
				asd
			</view>
		</uv-drop-down-popup>
	</view>
</template>

<style></style>
