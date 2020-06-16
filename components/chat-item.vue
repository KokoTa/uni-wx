<template>
  <view>
    <!-- 时间 -->
    <view v-if="showTime" class="flex align-center justify-center pd-4 pt-2 mb-2">
      <text class="font-sm text-light-muted">{{ showTime }}</text>
    </view>

    <!-- 撤回 -->
    <view
      v-if="item.isRemove"
      ref="isRemove"
      class="flex align-center justify-center pd-4 pt-2 chat-animate mb-2"
    >
      <text class="font-sm text-light-muted">你撤回了一条信息</text>
    </view>
    <!-- 聊天气泡项 -->
    <view
      v-else
      class="flex align-start mb-3"
      :class="isSelf ? 'justify-end' : 'justify-start'"
      @longpress="longpress"
    >
      <!-- 自己 -->
      <div v-if="isSelf" :class="labelClass" style="max-width: 500rpx;">
        <text v-if="item.type === 'text'" class="font-md">{{ item.data }}</text>
        <PreviewImage
          v-if="item.type === 'emoji' || item.type === 'image'"
          :src="item.data"
          @click="previewImage"
        ></PreviewImage>
        <view v-if="item.type === 'audio'" class="flex align-center" @click="openAudio">
          <text class="font">4'</text>
          <text v-if="isAudioPlaying">-</text>
        </view>
      </div>
      <Avatar v-if="isSelf" :src="item.avatar" size="70"></Avatar>

      <!-- 别人 -->
      <Avatar v-if="!isSelf" :src="item.avatar" size="70"></Avatar>
      <div v-if="!isSelf" :class="labelClass" style="max-width: 500rpx;">
        <text v-if="item.type === 'text'" class="font-md">{{ item.data }}</text>
        <PreviewImage
          v-if="item.type === 'emoji' || item.type === 'image'"
          :src="item.data"
          @click="previewImage"
        ></PreviewImage>
        <view v-if="item.type === 'audio'" class="flex align-center" @click="openAudio">
          <text v-if="isAudioPlaying">-</text>
          <text class="font">4'</text>
        </view>
      </div>
    </view>
  </view>
</template>

<script>
import Avatar from '@/components/avatar.vue';
import PreviewImage from '@/components/preview-image.vue'
import formatTime from '../libs/time.js';

import { mapState, mapActions } from 'vuex';

export default {
	props: {
		// 聊天数据
		item: {
			type: Object,
			default: () => {}
		},
		// 当前聊天索引
		index: Number,
		// 前一个聊天的时间
		preTime: {
			type: [String, Number],
			default: 0
		}
	},
	components: {
		Avatar,
		PreviewImage
	},
	computed: {
		...mapState({
			test: state => state.audio.test
		}),
		// 是否是自己
		isSelf() {
			const myId = 1; // 假设自己ID为1
			return this.item.user_id === myId;
		},
		// 是否显示时间
		showTime() {
			const nowTime = this.item.createTime;
			const preTime = this.preTime;
			return formatTime.getChatTime(nowTime, this.preTime);
		},
		// 气泡样式
		labelClass() {
			let showLabelClass = (this.item.type === 'text'  || this.item.type === 'audio')
			return showLabelClass ? (this.isSelf ? 'bg-chat-item p-2 rounded mr-3' : 'bg-white p-2 rounded ml-3') : 'mx-3 rounded'	 
		}
	},
	data() {
		return {
			innerAudioContext: null,
			isAudioPlaying: false
		}
	},
	methods: {
		...mapActions(['$audioOn', '$audioOff', '$audioEmit']),
		// 长按事件
		longpress(e) {
			let x = 0,
				y = 0;

			// #ifdef APP-PLUS-NVUE
			if (Array.isArray(e.changedTouches) && e.changedTouches.length) {
				x = e.changedTouches[0].screenX;
				y = e.changedTouches[0].screenY;
			}
			// #endif

			// #ifdef MP
			x = e.detail.x;
			y = e.detail.y;
			// #endif

			this.$emit('long', { x, y, index: this.index });
		},
		// 预览图片
		previewImage(url) {
			this.$emit('previewImage', url)
		},
		// 播放音频
		openAudio() {
			// 通知全局事件
			this.$audioEmit(this.index)
			if (!this.innerAudioContext) {
				this.innerAudioContext = uni.createInnerAudioContext()
				this.innerAudioContext.src = this.item.data
				this.innerAudioContext.play()

				this.innerAudioContext.onPlay(() => {
					this.isAudioPlaying = true
				})
				this.innerAudioContext.onPause(() => {
					this.isAudioPlaying = false
				})
				this.innerAudioContext.onStop(() => {
					this.isAudioPlaying = false
				})
				this.innerAudioContext.onError(() => {
					this.isAudioPlaying = false
				})
			} else {
				this.innerAudioContext.stop()
				this.innerAudioContext.play()
			}
		},
		// 监听音频的全局事件
		globalAudioChecker(index) {
			// 停止指定索引外的其他音频
			if (this.innerAudioContext && this.index !== index) this.innerAudioContext.stop()
		}
	},
	mounted() {
		// 注册全局事件
		if (this.item.type === 'audio') {
			this.$audioOn(this.globalAudioChecker)
		}

		// #ifdef APP-PLUS-NVUE
		// 移除时虽然DOM布局变化了，但是内容并不会马上改变，有时间差，所以要用动画过渡一下
		this.animation = weex.requireModule('animation');
		this.$watch('item.isRemove', (newVal, oldVal) => {
			if (newVal) {
				this.$nextTick(() => {
					this.animation.transition(this.$refs.isRemove, {
						styles: {
							opacity: 1
						},
						duration: 100,
						timingFunction: 'ease'
					});
				});
			}
		});
		// #endif
	},
	destroyed() {
		// 销毁音频
		if (this.innerAudioContext) {
			this.innerAudioContext.destroy()
			this.innerAudioContext = null
		}

		// 注销全局事件
		if (this.item.type === 'audio') {
			this.$audioOff(this.globalAudioChecker)
		}
	}
};
</script>

<style>
.chat-animate {
  /* #ifdef APP-PLUS-NVUE */
  opacity: 0;
  /* #endif */
}
</style>
