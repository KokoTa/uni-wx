<template>
  <view class="flex flex-wrap">
    <view
      v-for="(item, index) in imageList"
      :key="index"
      style="width: 230rpx; height: 230rpx;"
      class="flex align-center justify-center position-relative"
    >
      <image
        :src="item"
        style="width: 220rpx; height: 220rpx;"
        class="rounded"
        @click="preview(item)"
      />
      <view
        class="position-absolute flex align-center justify-center bg-danger rounded-circle top-0 right-0"
        style="width: 40rpx; height: 40rpx;"
        @click.prevent="deleteImage(item)"
      >
        <text class="font-sm" style="color: #fff;">x</text>
      </view>
    </view>
    <view
      v-if="imageList.length <= 9"
      style="width: 230rpx; height: 230rpx;"
      class="flex align-center justify-center"
      @click="chooseImage"
    >
      <view
        style="width: 220rpx; height: 220rpx;"
        class="flex align-center justify-center bg-light rounded"
      >
        <text style="font-size: 100rpx" class="text-light-muted">+</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageList: []
    };
  },
  methods: {
    chooseImage() {
      uni.chooseImage({
        count: 9 - this.imageList.length,
        sizeType: ['compressed'],
        success: (res) => {
          if (this.imageList.length === 9) return
          const list = [...this.imageList, ...res.tempFilePaths]
          if (list.length > 9) this.imageList = list.slice(0, 9)
          this.imageList = list
          this.$emit('imageList', this.imageList)
        }
      });
    },
    preview(src) {
      uni.previewImage({
        current: src,
        urls:this.imageList
      })
    },
    deleteImage(src) {
      const index = this.imageList.indexOf(src)
      if (index !== -1) this.imageList.splice(index, 1)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
