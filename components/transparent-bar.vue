<template>
  <!-- 导航栏 -->
  <view>
    <!-- 导航栏固定 -->
    <view class="position-fixed fixed-top" :style="navBarStyle">
      <!-- 状态栏占位 -->
      <view :style="'height:' + appStatusBarHeight +'px'"></view>
      <!-- 导航栏 -->
      <view class="w-100 flex align-center justify-between" style="height: 90rpx;">
        <!-- 左侧 -->
        <view class="flex align-center ml-3">
          <!-- 返回 -->
          <view
            class="flex align-center justify-center"
            hover-class="bg-hover-light"
            style="height: 90rpx; width: 90rpx;"
            @click="back"
          >
            <text class="iconfont font-md" :style="fontColorStyle">{{ '\ue60d' }}</text>
          </view>
          <!-- 标题 -->
          <text class="font-md">{{ title }}</text>
        </view>
        <!-- 右侧 -->
        <view class="flex align-center">
          <slot name="right">
            <!-- 添加按钮 -->
            <view
              class="flex align-center justify-center"
              hover-class="bg-hover-light"
              style="height: 90rpx; width: 90rpx;"
              @click="back"
            >
              <text class="iconfont font-md" :style="fontColorStyle">{{ '\ue682' }}</text>
            </view>
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
      },
      scrollTop: {
        type: [Number, String],
        default: 0
      }
		},
		computed: {
      // 透明度
      opacity() {
        const start = uni.upx2px(400)
        const end = uni.upx2px(500)
        const h = end - start
        let opacity = 0

        if (this.scrollTop > start) {
          opacity = (this.scrollTop - start) / h
        }

        return opacity > 1 ? 1 : opacity
      },
      navBarStyle() {
        return `background-color: rgba(255, 255, 255, ${this.opacity})`
      },
      fontColorStyle() {
        if (this.opacity > 0) {
          return `color: rgba(0, 0, 0, ${this.opacity})`
        }
        return 'color: #fff'
      }
		},
		data() {
			return {
				appStatusBarHeight: 0
			}
		},
		mounted() {
			// #ifdef APP-PLUS-NVUE
			this.appStatusBarHeight = plus.navigator.getStatusbarHeight()
			// #endif
		},
		methods: {
			open() {
				this.$emit('open')
			},
			back () {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
</style>
