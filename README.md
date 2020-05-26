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
17. `textarea` 如果在 `fixed` 容器中，则它需要添加 `:fixed="true"`
18. `text` 不能嵌套 `text`，uni 的 slot 默认会用 `text` 在最外侧包裹一层，因此如果是自定义的 text 组件，请不要使用 slot