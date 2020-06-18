<template>
  <view class="main-gb-color rounded mr-3 px-2 py-1" @click="$emit('click')">
    <text class="font-md text-light">{{name}}</text>
  </view>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
