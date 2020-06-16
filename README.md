# nvue 笔记

1. 样式不能简写，比如 `padding: 0 0 0 0;`，必须指定如 `padding-left: 0;`
2. 引入自定义 icon 需要使用 weex 的模块加载, icon 必须使用 text 包裹
3. text 组件不能换行
4. 设置全屏高度用 `flex: 1`，而非 `min-height: 100%; height: auto;`
5. 取消原生APP导航 `titleNView: false`
6. 取消滚动条 `scrollIndicator: "none"`
7. 只支持 Flex 布局
8. 获取 APP 状态栏高度 `plus.navigator.getStatusbarHeight()`，动态获取的值单位为 `px`，累加时记得调用 `uni.upx2px()` 转换单位，upx 就是 rpx
9. text 里不能用插槽，可以用 props 代替，详情见 `icon-button` 组件
10. 组件里面不能用 `onLoad` 生命周期
11. `image` 必须设置宽高
12. 不支持 `z-index`
13. 自定义组件只能用 `.vue` 格式的
14. `view` 的 onpress(长按) 不能获取到坐标，替换成 `div` 后可以(新版本已修复)
15. 小程序 和 APP 获取点击坐标的方式不同，前者在 `detail`，后者在 `changedTouches`
16. APP 的动画要调用 weex 的 `weex.requireModule('animation')`
17. `textarea` 如果在 `fixed` 容器中，则它需要添加 `:fixed="true"`，为了解决键盘顶起窗口问题，需要添加 `:adjust-position="false"`
18. `text` 不能嵌套 `text`，uni 的 slot 默认会用 `text` 在最外侧包裹一层，因此如果是自定义的 text 组件，请不要使用 slot
19. 接 17 的问题，设置后会发现 `textarea` 就算键盘弹出来了还是会固定在屏幕最底部，此时需要监听键盘高度变化 `uni.onKeyboardHeightChange`
20. 通过 API 获取的长度值单位都是 px
21. nvue 中的 `scroll-view` 无法监听 `click` 事件，需要手动加一层蒙版
22. nvue 不支持 `max-width` 等属性，不支持 `百分比` 单位
23. `uni.createInnerAudioContext` 多个实例在 nvue 中同一时间只能播放一个，而在小程序中同一时间则会播放多个，这里用 vuex 实现发布订阅，让点击的实例播放，其他实例停止。当然用 `uni.$on` 等 API 可以更方便的实现
24. 编译小程序时不能在 html 中使用 `模板字符串`，但 js 里可以使用，因此对于 `:style='...'` 的内容要用计算属性来赋值
