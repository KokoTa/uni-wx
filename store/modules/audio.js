export default {
	state: {
		test: '测试',
		events: [] // 全局事件
	},
	mutations: {
		// 注册全局事件
		regEvent(state, event) {
			state.events.push(event)
		},
		// 执行全局事件
		doEvent(state, params) {
			state.events.forEach((event) => event(params))
		},
		// 注销全局事件
		removeEvent(state, event) {
			const index = state.events.findIndex(item => item === event)
			if (index !== -1) {
				state.events.splice(index, 1)
			}
		}
	},
	actions: {
		// 分发
		$audioOn({ commit }, event) {
			commit('regEvent', event)
		},
		// 执行
		$audioEmit({ commit }, params) {
			commit('doEvent', params)
		},
		// 注销
		$audioOff({ commit }, event) {
			commit('removeEvent', event)
		}
	}
}