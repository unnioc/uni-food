// 基础域名配置
const BASE_URL = 'http://localhost:3000'

/**
 * 封装的基础请求函数
 * @param {Object} options 请求参数
 * @param {string} options.url 请求路径 (例如 /banners)
 * @param {string} options.method 请求方法 (GET, POST等)
 * @param {Object} options.data 请求数据
 */
const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success: (res) => {
        // HTTP 状态码在 200-299 之间表示成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          uni.showToast({
            title: '请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络不给力',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export default request
