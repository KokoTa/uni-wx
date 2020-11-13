import config from '../config/config.js'

const { baseUrl } = config

export async function request({url, data, method = 'post'}) {
  const [err, res] = await uni.request({
    url: `${baseUrl}${url}`, data, method
  })

  console.log(err, res)

  if (err) {
    uni.showToast({
      icon: 'none',
      title: err.errMsg,
      duration: 2000
    })
    return
  }

  if (res.data.code !== 0) {
    const isArray = Array.isArray(res.data.msg)
    uni.showToast({
      icon: 'none',
      title: isArray ? res.data.msg[0].err[0] : res.data.msg,
      duration: 2000
    })
    return
  }

  return res
}
