<template>
	<!-- 通用列表项 -->
	<view class="bg-white flex align-stretch" hover-class="bg-light">
		<view class="flex align-center justify-center py-2 px-3">
			<slot name="icon"></slot>
			<image v-if="cover" :src="cover" mode="aspectFill" :style="coverStyle" />
		</view>
		<view class="flex-1 border-bottom flex align-center justify-between pr-3">
			<slot name="left">
				<text class="font-md text-dark">{{title}}</text>
			</slot>
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
			},
			// 封面大小
			coverSize: {
				type: [String, Number],
				default: 75
			}
		},
		computed: {
			coverStyle() {
				return `width: ${this.coverSize}rpx; height: ${this.coverSize}rpx;`
			}
		}
	}
</script>

<style></style>
