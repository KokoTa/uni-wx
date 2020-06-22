<template>
  <!-- 通用列表项 -->
  <view class="bg-white flex align-stretch" hover-class="bg-light" @click="$emit('click')">
    <view v-if="showLeftIcon" class="flex align-center justify-center py-2 pl-3">
      <slot name="icon"></slot>
      <image v-if="cover" :src="cover" mode="aspectFill" :style="coverStyle" />
    </view>
    <view
      class="flex-1 flex align-center justify-between p-3"
      :class="showBorderBottom ? 'border-bottom' : ''"
    >
      <slot name="left">
        <text class="font-md text-dark">{{title}}</text>
      </slot>
      <view v-if="showRight" class="flex align-center">
        <slot name="right"></slot>
        <text v-if="showRightIcon" class="iconfont text-light-muted font-md pl-1">&#xe60c;</text>
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
			showLeftIcon: {
				type: Boolean,
				default: true
			},
			// 显示右侧箭头
			showRight: {
				type: Boolean,
				default: false
			},
			showRightIcon: {
				type: Boolean,
				default: true
			},
			// 封面大小
			coverSize: {
				type: [String, Number],
				default: 75
      },
      // 是否显示底边
      showBorderBottom: {
        type: Boolean,
        default: true
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
