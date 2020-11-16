<template>
  <!-- 导航栏 -->
  <view>
    <!-- 导航栏固定 -->
    <view class="bg-light" :class="getClass">
      <!-- 状态栏 -->
      <view :style="'height:' + appStatusBarHeight +'px'"></view>
      <!-- 导航 -->
      <view class="w-100 flex align-center justify-between" style="height: 90rpx;">
        <!-- 左侧 -->
        <view class="flex align-center ml-3">
          <!-- 返回 -->
          <IconButton v-if="showBack" :icon="'\ue60d'" @click="back"></IconButton>
          <!-- 标题 -->
          <slot name="title">
            <text class="font-md">{{ getTitle }}</text>
          </slot>
        </view>
        <!-- 右侧 -->
        <view v-if="showRight" class="flex align-center">
          <slot name="right">
            <!-- 搜索按钮 -->
            <IconButton :icon="'\ue6e3'" @click="openSearch"></IconButton>
            <!-- 添加按钮 -->
            <IconButton :icon="'\ue682'" @click="openExtend"></IconButton>
          </slot>
        </view>
      </view>
      <!-- 扩展菜单栏 -->
      <Popup
        ref="popup"
        :bodyWidth="320"
        :bodyHeight="525"
        bodyBgClass="bg-dark"
        transformOrigin="right top"
      >
        <view
          class="flex flex-column"
          style="width: 320rpx; height: 525rpx;"
        >
          <view
            v-for="(item, index) in menus"
            class="flex-1 flex align-center"
            hover-class="bg-hover-dark"
            :key="index"
          >
            <text class="iconfont font-md pl-3 pr-2 text-white">{{ item.icon }}</text>
            <text class="font-md text-white">{{ item.name }}</text>
          </view>
        </view>
      </Popup>
    </view>
    <!-- 导航栏占位 -->
    <view v-if="fixed" :style="barHeightStyle"></view>
  </view>
</template>

<script>
	import IconButton from "@/components/icon-button.vue"
	import Popup from "@/components/popup.vue"

	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: true
			},
			noreadnum: {
				type: Number,
				default: 0
			},
			bgColor: {
				type: String,
				default: 'bg-white'
			},
			showBack: {
				type: Boolean,
				default: false
			},
			showRight: {
				type: Boolean,
				default: true
      },
      backEvent: {
        type: Boolean,
        default: false
      }
		},
		components: {
			IconButton,
			Popup
		},
		computed: {
			barHeightStyle() {
				return `height: ${this.navBarHeight}px`
			},
			getTitle() {
				return `${this.title}${this.noreadnum > 0 ? `(${this.noreadnum})` : ''}`
			},
			getClass() {
				const fixedClass = this.fixed ? 'position-fixed fixed-top' : ''
				return `${this.bgColor} ${fixedClass}`
			}
		},
		data() {
			return {
				appStatusBarHeight: 0,
				navBarHeight: 0,
				menus: [
					{
						name: '发起群聊',
						event: 'setTop',
						icon: '\ue633'
					},
					{
						name: '添加朋友',
						event: 'delChat',
						icon: '\ue65d'
					},
					{
						name: '扫一扫',
						event: 'delChat',
						icon: '\ue614'
					},
					{
						name: '收付款',
						event: 'delChat',
						icon: '\ue66c'
					},
					{
						name: '帮助与反馈',
						event: 'delChat',
						icon: '\ue62a'
					}
				]
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
		methods: {
			open() {
				this.$emit('open')
			},
			openSearch() {
				uni.navigateTo({
					url: '/pages/common/search/search'
				})
			},
			openExtend() {
				this.$refs.popup.show(uni.upx2px(415), uni.upx2px(50))
			},
			back () {
        if (this.backEvent === false) {
          uni.navigateBack({
            delta: 1
          })
        } else {
          this.$emit('back')
        }
			}
		}
	}
</script>

<style>
</style>
