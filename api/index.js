// 引入刚才封装的 request
import request from '@/utils/request'

// 将所有接口定义在一个对象里到处，清晰明了
export const api = {
  // --- 用户相关 ---
  // 根据手机号查找用户（模拟登录）
  getUserByPhone: (phone) => request({ url: `/users?phone=${phone}` }),

  // 注册新用户
  createUser: (userData) => request({
    url: '/users',
    method: 'POST',
    data: userData
  }),

  // 更新用户信息
  updateUser: (userId, data) => request({
    url: `/users/${userId}`,
    method: 'PATCH',
    data
  }),

  // --- 首页数据 ---
  getBanners: () => request({ url: '/banners' }),
  getCategories: () => request({ url: '/categories' }),

  // 获取商品列表（带分类筛选）
  getFoodList: (categoryId) => {
    let url = '/foodList'
    // 如果不是 "全部" (假设全部的ID是1)，则拼接筛选参数
    if (categoryId && categoryId !== 1) {
      url += `?categoryId=${categoryId}`
    }
    return request({ url })
  },

  // 获取推荐列表数据
  getRecommendList: () => request({ url: '/recommend' }),

  // --- 购物车相关 (增删改查) ---
  // 1. 获取某用户的购物车
  getCart: (userId) => request({ url: `/carts?userId=${userId}` }),

  // 2. 添加商品到购物车
  addToCart: (data) => request({
    url: '/carts',
    method: 'POST',
    data
  }),

  // 3. 更新购物车商品（比如修改数量）
  updateCart: (id, data) => request({
    url: `/carts/${id}`,
    method: 'PATCH',
    data
  }),

  // 4. 删除购物车商品
  deleteCart: (id) => request({
    url: `/carts/${id}`,
    method: 'DELETE'
  }),

  // --- 订单相关 ---
  // 获取某用户的订单
  getOrders: (userId) => request({ url: `/orders?userId=${userId}` }),

  // 获取单笔订单详情
  getOrderById: (orderId) => request({ url: `/orders/${orderId}` }),

  // 创建新订单
  createOrder: (orderData) => request({
    url: '/orders',
    method: 'POST',
    data: orderData
  })
}
