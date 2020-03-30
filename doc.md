# nvue 笔记

1. 样式不能简写，比如 `padding: 0 0 0 0;`，必须指定如 `padding-left: 0;`
2. 引入自定义 icon 需要使用 weex 的模块加载, icon 必须使用 text 包裹
3. text 组件不能换行
4. 设置全屏高度用 `flex: 1`，而非 `min-height: 100%; height: auto;`
5. 取消原生APP导航 `titleNView: false`
6. 取消滚动条 `scrollIndicator: "none"`
7. 只支持 Flex 布局
8. 获取 APP 状态栏高度 `plus.navigator.getStatusbarHeight()`，动态获取的值单位为 `px`
9. text 里不能用插槽，可以用 props 代替，详情见 `icon-button` 组件
10. 组件里面不能用 `onLoad` 生命周期