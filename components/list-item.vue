<template>
	<!-- 列表项 -->
	<view class="flex align-stretch" hover-class="bg-light" @click="" @longpress="longpress">
		<!-- 头像 -->
		<view class="flex align-center justify-center position-relative" style="width: 145rpx;">
			<Avatar :src="item.avatar" :size="92"></Avatar>
			<Badge v-if="item.noreadnum > 0" badgeClass="position-absolute" badgeStyle="top: 15rpx; right: 15rpx" :count="item.noreadnum"></Badge>
		</view>
		<!-- 内容 -->
		<view class="flex flex-column border-bottom border-light-secondary flex-1 py-3 pr-3">
			<!-- 上半部分 -->
			<view class="flex align-center justify-between mb-1">
				<text class="font-md">{{ item.nickname }}</text>
				<text class="font-sm text-light-muted">{{ item.update_time | formatTime }}</text>
			</view>
			<!-- 下半部分 -->
			<text class="font text-ellipsis text-light-muted">{{ item.data }}</text>
		</view>
</view>
</template>

<script>
	import Avatar from '@/components/avatar.vue';
	import Badge from '@/components/badge.vue';
	import BaseMixin from '@/common/mixin/base.js'

	export default {
		props: {
			item: Object,
			index: Number
		},
		mixins: [BaseMixin],
		components: {
			Avatar,
			Badge
		},
		methods: {
			longpress(e) {
				console.log(e)
			}
		}
	};
</script>

<style></style>
