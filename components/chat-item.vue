<template>
	<view>
		<!-- 时间 -->
		<view class="flex align-center justify-center pd-4 pt-2">
			<text class="font-sm text-light-muted">{{showTime}}</text>
		</view>
		<!-- 聊天气泡项 -->
		<view class="flex align-start mb-3" :class="isSelf ? 'justify-end' : 'justify-start'" @longpress="longpress">
			<!-- 自己 -->
			<div v-if="isSelf" class="bg-chat-item p-2 rounded mr-3" style="max-width: 500rpx;">
				<text class="font-md">{{item.data}}</text>
			</div>
			<Avatar v-if="isSelf" :src="item.avatar" size="70"></Avatar>						
			<!-- 别人 -->
			<Avatar v-if="!isSelf" :src="item.avatar" size="70"></Avatar>
			<div v-if="!isSelf" class="bg-white p-2 rounded ml-3" style="max-width: 500rpx;">
				<text class="font-md">{{item.data}}</text>
			</div>
		</view>
	</view>
</template>

<script>
	import Avatar from '@/components/avatar.vue'
	import formatTime from '../libs/time.js'
	
	export default {
		props: {
			// 聊天数据
			item: {
				type: Object,
				default: () => {}
			},
			// 当前聊天索引
			index: Number,
			// 前一个聊天的时间
			preTime: {
				type: [String, Number],
				default: 0
			}
		},
		components: {
			Avatar
		},
		computed: {
			// 是否是自己
			isSelf() {
				const myId = 1 // 假设自己ID为1
				return this.item.user_id === myId
			},
			// 是否显示时间
			showTime() {
				const nowTime = this.item.createTime
				const preTime = this.preTime
				return formatTime.getChatTime(nowTime, this.preTime)
			}
		},
		methods: {
			// 长按事件
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
			},
		}
	}
</script>

<style>
</style>
