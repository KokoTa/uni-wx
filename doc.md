# nvue 笔记

1. nvue 内的样式不能简写，比如 `padding: 0 0 0 0;`，必须指定如 `padding-left: 0;`
2. nvue 引入自定义 icon 需要使用 weex 的模块加载, icon 必须使用 text 包裹，且 text 内不能换行
3. nvue 设置全屏高度用 `flex: 1`，而非 `min-height: 100%; height: auto;`
4. 取消原生APP导航 `titleNView: false`
5. 取消滚动条 `scrollIndicator: "none"`