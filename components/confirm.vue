<template>
  <Popup ref="popup" :maskColor="true" transformOrigin="center center" :isCenter="true">
    <view class="bg-white rounded" style="width: 600rpx;">
      <!-- 头部 -->
      <view class="p-4 flex flex-column">
        <text class="font-md font-weight-bold mb-3">{{title}}</text>
        <slot></slot>
      </view>
      <!-- 底部 -->
      <view style="height: 100rpx;" class="border-top flex align-stretch">
        <view class="flex-1 border-right flex align-center justify-center" @click="hide">
          <text class="font-md text-muted">取消</text>
        </view>
        <view class="flex-1 flex align-center justify-center" @click="confirm">
          <text class="font-md main-font-color">确定</text>
        </view>
      </view>
    </view>
  </Popup>
</template>

<script>
import Popup from '@/components/popup.vue'

export default {
  components: {
    Popup
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      callback: null
    }
  },
  methods: {
    show(callback = false) {
      this.callback = callback
      this.$refs.popup.show()
    },
    hide() {
      this.$refs.popup.hide()
    },
    confirm() {
      if (typeof this.callback === 'function') {
        this.callback(() => {
          this.hide()
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
