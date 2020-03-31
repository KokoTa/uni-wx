<template>
	<!-- 弹出层 -->
	<view v-if="status" sytle="z-index: 9999; overflow: hidden;">
		<!-- 蒙版 -->
		<view 
			v-if="mask"
			class="position-fixed top-0 left-0 right-0 bottom-0"
			:style="getMaskColor"
			@click="hide">
		</view>
		<!-- 弹出框内容 -->
		<view ref="popup" class="position-fixed animated" :class="getBodyClass" :style="getBodyStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 蒙版颜色
			maskColor: {
				type: Boolean,
				default: false
			},
			// 是否开启蒙版
			mask: {
				type: Boolean,
				default: true
			},
			// 是否处于底部
			fixedBottom: {
				type: Boolean,
				default: false
			},
			// 弹出层内容宽度
			bodyWidth: {
				type: Number,
				defualt: 0
			},
			// 弹出层内容高度
			bodyHeight: {
				type: Number,
				default: 0
			},
			// 弹出层内容背景色
			bodyBgClass: {
				type: String,
				default: 'bg-white'
			},
			// 弹出框内容显示源位置
			transformOrigin: {
				type: String,
				default: 'left top'
			}
		},
		computed: {
			getMaskColor() {
				let i = this.maskColor ? 0.5 : 0
				return `background-color: rgba(0, 0, 0, ${i});`
			},
			getBodyClass() {
				let bodyClass = this.fixedBottom ? 'left-0 right-0 bottom-0' : 'rounded border'
				return `${bodyClass} ${this.bodyBgClass}`
			},
			getBodyStyle() {
				const left = this.x > -1 ? `left: ${this.x}px;` : ''
				const top = this.y > -1 ? `top: ${this.y}px;` : ''
				return left + top
			}
		},
		data () {
			return {
				status: false,
				x: -1,
				y: -1,
				maxX: 0,
				maxY: 0
			}
		},
		mounted() {
			try {
				const res = uni.getSystemInfoSync()
				// 边界处理
				this.maxX = res.windowWidth - uni.upx2px(this.bodyWidth)
				this.maxY = res.windowHeight - uni.upx2px(this.bodyHeight)
			} catch(err) {
				console.log(err)
			}
			
			// #ifdef APP-PLUS-NVUE
			this.animation = weex.requireModule('animation')
			// #endif
		},
		methods: {
			show(x = -1, y = -1) {
				this.x = (x > this.maxX) ? this.maxX : x
				this.y = (y > this.maxY) ? this.maxY : y
				this.status = true
				
				// #ifdef APP-PLUS-NVUE
				this.$nextTick(() => {
					this.animation.transition(this.$refs.popup, {
						styles: {
							transform: 'scale(1, 1)',
							transformOrigin: this.transformOrigin,
							opacity: 1
						},
						duration: 100,
						timingFunction: 'ease'
					})
				})
				// #endif
			},
			hide() {
				// #ifdef APP-PLUS-NVUE
				this.$nextTick(() => {
					this.animation.transition(this.$refs.popup, {
						styles: {
							transform: 'scale(0, 0)',
							transformOrigin: this.transformOrigin,
							opacity: 0
						},
						duration: 100,
						timingFunction: 'ease'
					}, () => this.status = false)
				})
				// #endif
				
				// #ifndef APP-PLUS-NVUE
				this.status = false
				// #endif
			}
		}
	}
</script>

<style scoped>
.animated {
	/* #ifdef APP-PLUS-NVUE */
	transform: scale(0, 0);
	opacity: 0;
	/* #endif */
}
</style>
