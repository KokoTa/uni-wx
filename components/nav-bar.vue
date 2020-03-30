<template>
	<!-- 导航栏 -->
	<view>
		<!-- 导航栏固定 -->
		<view class="bg-light" :class="fixed ? 'position-fixed fixed-top' : ''">
			<!-- 状态栏 -->
			<view :style="`height: ${appStatusBarHeight}px`"></view>
			<!-- 导航 -->
			<view class="w-100 flex align-center justify-between" style="height: 90rpx;">
				<!-- 左侧 -->
				<view class="flex align-center ml-3">
					<!-- 标题 -->
					<text class="font-md">{{ title }}</text>
				</view>
				<!-- 右侧 -->
				<view class="flex align-center">
					<!-- 搜索按钮 -->
					<IconButton :icon="'\ue6e3'"></IconButton>
					<!-- 添加按钮 -->
					<IconButton :icon="'\ue682'"></IconButton>
				</view>
			</view>
		</view>
		<!-- 导航栏占位 -->
		<view v-if="fixed" :style="barHeightStyle"></view>
	</view>
</template>

<script>
	import IconButton from "@/components/icon-button.vue"
	
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: true
			}
		},
		components: {
			IconButton
		},
		data() {
			return {
				appStatusBarHeight: 0,
				navBarHeight: 0
			}
		},
		mounted() {
			// #ifdef APP-PLUS-NVUE
			this.appStatusBarHeight = plus.navigator.getStatusbarHeight()
			// #endif
			// 由于动态获取的值是 px，而我们自己设置的头是 rpx，因此需要做转换，统一转成 px
			// PS: upx 就是 rpx
			this.navBarHeight = this.appStatusBarHeight + uni.upx2px(90)
		},
		computed: {
			barHeightStyle() {
				return `height: ${this.navBarHeight}px`
			}
		}
	}
</script>

<style>

</style>
