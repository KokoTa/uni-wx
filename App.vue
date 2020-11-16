

<script>
  import { mapActions } from 'vuex'

	export default {
    methods: {
      ...mapActions(['initSocket'])
    },
		onLaunch: function() {
			console.log('App Launch')

			// #ifdef APP-PLUS-NVUE
			// 全局加载图标
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
				'fontFamily': 'iconfont',
				'src': "url('https://at.alicdn.com/t/font_1365296_vumpzwvr0z.ttf')"
			})
			// #endif

      // 给 tabbar 加个角标
      uni.setTabBarBadge({
        index: 0,
        text: '1'
      })

      // 初始化 socket，没有 token 的话会直接跳到注册页
      this.initSocket()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/*每个页面公共css */
@import url("./common/free.css");
@import url("./common/common.css");

/* #ifndef APP-PLUS-NVUE */
@import url("./common/icon.css");
/* #endif */
</style>
