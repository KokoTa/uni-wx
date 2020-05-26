<template>
	<!-- 聊天项 -->
	<view class="flex align-start mb-3" :class="isSelf ? 'justify-end' : 'justify-start'">
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
</template>

<script>
	import Avatar from '@/components/avatar.vue'
	
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
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
			}
		}
	}
</script>

<style>
</style>
