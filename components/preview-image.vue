<template>
  <image
    :src="src"
    :class="imageClass"
    :style="imageSize"
    @click="$emit('click', src)"
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
				default: 200
			},
			maxHeight: {
				type: Number,
				default: 200
			}
		},
		computed: {
			imageSize() {
				return `width: ${this.width}px; height: ${this.height}px;`
			}
		},
		data() {
			return {
				width: 200,
				height: 200
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
				} else if (width > maxWidth) {
					this.width = maxWidth
					this.height = maxWidth * (height / width)
				}
				this.$emit('load', { width: this.width, height: this.height })
			}
		}
	}
</script>

<style>
</style>
