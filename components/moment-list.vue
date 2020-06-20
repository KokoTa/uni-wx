<template>
  <view>
    <view
      v-for="(item, index) in list"
      :key="index"
      class="p-3 flex align-start border-bottom border-light-secondary"
    >
      <!-- 头像 -->
      <Avatar src="/static/userpic/1.jpg" size="80"></Avatar>
      <!-- 内容 -->
      <view class="pl-2 flex-1 flex flex-column">
        <!-- 昵称 -->
        <text class="font-md text-hover-primary mb-1">{{item.username}}</text>
        <!-- 内容 -->
        <text class="font-md text-dark mb-1 ml-1">{{item.content}}</text>
        <!-- 图片 -->
        <view class="py-2 flex flex-wrap">
          <block v-for="(item2, index2) in item.image" :key="index2">
            <!-- 单图 -->
            <PreviewImage
              v-if="item.image.length === 1"
              :src="item.image[0]"
              imageClass="rounded"
              @click="previewImage"
            ></PreviewImage>
            <!-- 多图 -->
            <image
              v-if="item.image.length > 1"
              :key="index2"
              :src="item2"
              mode="aspectFill"
              style="width: 180rpx; height: 180rpx;"
              class="bg-secondary mr-2 mb-2 rounded"
              @click="previewImage(item2, item.image)"
            />
          </block>
        </view>
        <!-- 视频 -->
        <view v-if="item.video" class="py-2">
          <PreviewImage
            :src="item.video.poster"
            imageClass="rounded"
            @click="goVideo(item.video.src)"
          ></PreviewImage>
        </view>
        <!-- 时间|操作 -->
        <view class="flex align-center justify-between">
          <text class="font-sm text-light-muted">{{item.create_time | filterTime}}</text>
          <view class="rounded px-1 bg-light" @click="$emit('action', { item, index })">
            <text class="text-hover-primary iconfont font">&#xe62a;</text>
          </view>
        </view>
        <!-- 点赞|评论 -->
        <view class="bg-light mt-2">
          <!-- 点赞 -->
          <view
            v-if="item.supports && item.supports.length"
            class="border-bottom flex align-start p-2"
          >
            <text class="iconfont font-sm text-hover-primary">&#xe637;</text>
            <view class="flex flex-1 flex-wrap ml-1">
              <text
                v-for="(item2, index2) in item.supports"
                :key="index2"
                class="font text-hover-primary ml-1"
              >{{item2.username}}</text>
            </view>
          </view>
          <!-- 评论 -->
          <view v-if="item.comments && item.comments.length" class="flex align-start p-2">
            <text class="iconfont font-md text-hover-primary">&#xe64e;</text>
            <view class="flex flex-column flex-1 ml-1">
              <view v-for="(item2, index2) in item.comments" :key="index2" class="flex">
                <text class="text-hover-primary font">{{item2.username}}：</text>
                <text class="text-dark font flex-1">{{item2.content}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Avatar from '@/components/avatar.vue'
import PreviewImage from '@/components/preview-image.vue'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    filterTime(value) {
      return new Date()
    }
  },
  components: {
    Avatar,
    PreviewImage,
  },
  methods: {
    previewImage(src, arr) {
      uni.previewImage({
        current: src,
        urls: arr || [src]
      });
    },
    goVideo(url) {
      uni.navigateTo({
        url: '/pages/chat/video/video?url=' + url
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
