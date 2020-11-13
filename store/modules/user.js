import { request } from '../../api/request.js'

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    initUser(state, params) {
      state.userInfo = params.data
      uni.setStorageSync('token', state.userInfo.token)
    }
  },
  actions: {
    async initLogin({ commit }, data) {
      const loginResult = await request({
        url: '/login',
        data
      })
      if (loginResult) {
        commit('initUser', loginResult.data)
      }
    }
  }
}
