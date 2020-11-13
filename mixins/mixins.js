export default {
  onShow() {
    const token = uni.getStorageSync('token')
    if (!token) {
      uni.reLaunch({
        url: '/pages/common/login/login'
      })
    }
  }
}