<template>
	<!-- 通用列表项 -->
	<view class="bg-white flex align-stretch" hover-class="bg-light">
		<view class="flex align-center justify-center py-2 px-3">
			<slot name="icon"></slot>
			<image v-if="cover" :src="cover" mode="aspectFill" style="width: 75rpx; height: 75rpx;" />
		</view>
		<view class="flex-1 border-bottom flex align-center justify-between pr-3">
			<text class="font-md text-dark">{{title}}</text>
			<view v-if="showRight" class="flex align-center">
				<slot name="right"></slot>
				<text class="iconfont text-light-muted font-md">&#xe60c;</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 封面
			cover: {
				type: String,
				default: ''
			},
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 显示右侧箭头
			showRight: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style></style>
