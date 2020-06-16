<template>
  <image
    :src="src"
    :class="imageClass"
    :style="imageSize"
    @click="emit('click', src)"
    @load="loadImage"
  />
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			imageClass: {
				type: String,
				default: ''
			},
			maxWidth: {
				type: Number,
				default: 500
			},
			maxHeight: {
				type: Number,
				default: 500
			}
		},
		computed: {
			imageSize() {
				return `width: ${this.width}rpx; height: ${this.height}rpx;`
			}
		},
		data() {
			return {
				width: 100,
				height: 100
			}
		},
		methods: {
			loadImage(e) {
				const { width, height } = e.detail
				const maxHeight = uni.upx2px(this.maxHeight)
				const maxWidth = uni.upx2px(this.maxWidth)
				if (height <= maxHeight && width <= maxWidth) {
					this.width = width
					this.height = height
				} else if (height > maxHeight) {
					this.width = maxHeight * (width / height)
					this.height = maxHeight
				} else if (width < maxWidth) {
					this.width = maxWidth
					this.height = maxWidth * (height / width)
				}
			}
		}
	}
</script>

<style>
</style>
