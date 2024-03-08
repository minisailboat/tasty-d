<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { nextTick, ref } from "vue";

const collapse = ref();
const list = ref<number[]>([]);
const accordionValue = ref("");
const open = (e: any) => {
	console.log(e);
	accordionValue.value = e;
	// 模拟请求
	uni.showLoading({
		title: "请求中",
		mask: true,
	});
	list.value.length = 3;
	setTimeout(() => {
		for (let index = 0; index < 20; index++) {
			list.value.push(index);
		}
		nextTick(() => {
			// 再次调用 init 重新初始化内部高度
			collapse?.value?.init();
			uni.showToast({
				icon: "success",
				title: "请求成功",
			});
			uni.hideLoading();
		});
	}, 1000);
};
onLoad(() => {});
</script>

<template>
	<!-- <view class="content" style="height: 1000px"> -->
	<view class="content">
		<uv-collapse ref="collapse" accordion :value="accordionValue" @open="open">
			<uv-collapse-item title="文档指南" name="docs" @click.stop>
				<uv-list>
					<uv-list-item v-for="item in list" :key="item">{{
						item
					}}</uv-list-item>
				</uv-list>
			</uv-collapse-item>
		</uv-collapse>
	</view>
</template>

<style></style>
