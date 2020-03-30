<template>
	<text class="bg-danger text-white rounded-circle font-sm badge" :class="badgeClass" :style="badgeStyle">{{ count }}</text>
</template>

<script>
	export default {
		props: {
			badgeClass: {
				type: String,
				default: ''
			},
			badgeStyle: {
				type: String,
				default: ''
			},
			count: {
				type: Number,
				default: 1
			}
		}
	}
</script>

<style scoped>
.badge {
	padding-left: 14rpx;
	padding-right: 14rpx;
	padding-top: 6rpx;
	padding-bottom: 6rpx;
}
</style>
