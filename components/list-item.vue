<template>
	<!-- 首页列表项 -->
	<view class="flex align-stretch" :class="item.isTop ? 'bg-light' : 'bg-white'" hover-class="bg-light" @longpress="longpress">
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
import BaseMixin from '@/common/mixin/base.js';

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
			let x = 0,
				y = 0;

			// #ifdef APP-PLUS-NVUE
			if (Array.isArray(e.changedTouches) && e.changedTouches.length) {
				x = e.changedTouches[0].screenX;
				y = e.changedTouches[0].screenY;
			}
			// #endif

			// #ifdef MP
			x = e.detail.x;
			y = e.detail.y;
			// #endif

			this.$emit('long', { x, y, index: this.index });
		}
	}
};
</script>

<style></style>
