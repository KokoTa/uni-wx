import { request } from '../../api/request.js'

export default {
  state: {
    userInfo: {},
    socket: {}
  },
  mutations: {
    initUser(state, params) {
      state.userInfo = params.data
      uni.setStorageSync('token', state.userInfo.token)
    },
    initSocket(state, socket) {
      state.socket = socket
    }
  },
  actions: {
    async initLogin({ commit }, data) {
      const loginResult = await request({
        url: '/login',
        data
      })
      if (loginResult) {
        // 初始化用户信息
        commit('initUser', loginResult.data)
      }
    },
    async initSocket({ commit }) {
      const token = uni.getStorageSync('token')
      if (token) {
        // 初始化 websocket
        const socketTask = uni.connectSocket({
         url: 'ws://localhost:7001/api/ws?token=' + token,
         complete: () => {}
        })
        socketTask.onOpen(() => {
         console.log('open')
        })
        socketTask.onMessage((msg) => {
         console.log(msg)
        })
        socketTask.onClose(() => {
         console.log('close')
        })
        socketTask.onError((err) => {
         console.log(err)
        })
        commit('initSocket', socketTask)
      } else {
        uni.reLaunch({
          url: '/pages/common/login/login'
        })
      }
    }
  }
}
