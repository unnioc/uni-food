import { reactive, computed } from 'vue'
import { api } from '@/api/index.js'

// 响应式状态
const state = reactive({
  user: uni.getStorageSync('user') || null, // 仅保留用户基础信息用于自动登录
  isLogin: !!uni.getStorageSync('user'),
  banners: [],
  categories: [],
  recommendList: [], // 新增推荐菜品数据
  menu: [],
  cart: [],
  checkoutItems: [], // 结算时的临时商品列表
  orders: []
})

// --- Getters ---
// 购物车列表 (API返回的数据已经包含了 name, price, image，直接用即可)
const cartItems = computed(() => state.cart)

// 购物车总价
const totalPrice = computed(() => {
  return state.cart.reduce((sum, item) => sum + (item.price * item.count), 0)
})

// 购物车总数量（红点用）
const cartCount = computed(() => {
  return state.cart.reduce((sum, item) => sum + item.count, 0)
})

// --- Actions ---

// 1. 初始化数据 (首页调用)
const init = async () => {
  try {
    const [banners, categories, foodList, recommendList] = await Promise.all([
      api.getBanners(),
      api.getCategories(),
      api.getFoodList(),
      api.getRecommendList()
    ])
    state.banners = banners
    state.categories = categories
    state.menu = foodList
    state.recommendList = recommendList

    // 如果已登录，加载用户数据
    if (state.isLogin) {
      // 兼容旧数据结构，确保 user.id 存在
      if (!state.user.id) {
        logout();
        return;
      }
      await refreshUserData()
    }
  } catch (e) {
    console.error('Init failed', e)
  }
}

// 2. 刷新用户相关数据 (购物车、订单)
const refreshUserData = async () => {
  if (!state.user) return
  try {
    // 刷新购物车和订单
    const [cart, orders] = await Promise.all([
      api.getCart(state.user.id),
      api.getOrders(state.user.id)
    ])
    state.cart = cart
    state.orders = orders

    // 尝试刷新用户信息（以便获取最新的 addresses）
    // 注意：getUserByPhone 返回数组
    const users = await api.getUserByPhone(state.user.phone)
    if (users && users.length > 0) {
      const latestUser = users[0]
      // 保持登录凭证，只更新信息
      // 剔除密码
      const { password, ...safeUser } = latestUser
      state.user = { ...state.user, ...safeUser }
      uni.setStorageSync('user', state.user)
    }
  } catch (e) {
    console.error('Refresh user data failed', e)
  }
}

// 3. 登录
const login = async (phone, password) => {
  try {
    const users = await api.getUserByPhone(phone)
    if (users && users.length > 0) {
      const user = users[0]
      if (user.password == password) {
        // 登录成功
        state.user = user
        state.isLogin = true

        // 安全处理：剔除密码后再存储
        const { password: pwd, ...safeUser } = user
        uni.setStorageSync('user', safeUser)

        await refreshUserData()
        return { success: true }
      } else {
        return { success: false, message: '密码错误' }
      }
    }
    return { success: false, message: '用户不存在' }
  } catch (e) {
    return { success: false, message: '网络请求失败' }
  }
}

// 4. 退出
const logout = () => {
  state.user = null
  state.isLogin = false
  state.cart = []
  state.orders = []
  uni.removeStorageSync('user')
  uni.reLaunch({ url: '/pages/index/index' })
}

// 5. 注册
const register = async (userInfo) => {
  try {
    // 1. 检查手机号是否已存在
    const users = await api.getUserByPhone(userInfo.phone)
    if (users && users.length > 0) {
      return { success: false, message: '该手机号已注册' }
    }

    // 2. 构造新用户对象
    const newUser = {
      phone: userInfo.phone,
      password: userInfo.password,
      nickName: userInfo.username,
      avatar: '/static/ic_default_avatar.png',
      addresses: [] // 初始空地址列表
    }

    // 3. 提交注册
    await api.createUser(newUser)
    return { success: true }
  } catch (e) {
    return { success: false, message: '注册失败，请稍后重试' }
  }
}

// 更新个人信息
const updateUserProfile = async (updateData) => {
  if (!state.isLogin || !state.user) return { success: false, message: 'Not logged in' }

  try {
    await api.updateUser(state.user.id, updateData)
    // 更新本地 state
    state.user = { ...state.user, ...updateData }
    uni.setStorageSync('user', state.user)
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false, message: 'Update failed' }
  }
}

// 地址管理: 新增地址
const addAddress = async (addressData) => {
  if (!state.isLogin || !state.user) return { success: false, message: 'Not logged in' }

  let currentAddresses = state.user.addresses ? [...state.user.addresses] : []

  // 如果设为默认，先把其他的取消默认
  if (addressData.isDefault) {
    currentAddresses.forEach(addr => addr.isDefault = false)
  }

  // 生成简单ID
  const newAddress = {
    id: Date.now(),
    ...addressData
  }

  currentAddresses.push(newAddress)
  return await updateUserProfile({ addresses: currentAddresses })
}

// 地址管理: 修改地址
const updateAddress = async (addressData) => {
  if (!state.isLogin || !state.user) return { success: false, message: 'Not logged in' }

  let currentAddresses = [...(state.user.addresses || [])]
  const index = currentAddresses.findIndex(a => a.id == addressData.id)

  if (index === -1) return { success: false, message: 'Address not found' }

  if (addressData.isDefault) {
    currentAddresses.forEach(addr => addr.isDefault = false)
  }

  currentAddresses[index] = { ...currentAddresses[index], ...addressData }
  return await updateUserProfile({ addresses: currentAddresses })
}

// 地址管理: 删除地址
const deleteAddress = async (id) => {
  if (!state.isLogin || !state.user) return { success: false, message: 'Not logged in' }

  const currentAddresses = state.user.addresses || []
  const newAddresses = currentAddresses.filter(a => a.id != id)

  return await updateUserProfile({ addresses: newAddresses })
}

// 6. 加入购物车
const addToCart = async (food) => {
  if (!state.isLogin) {
    uni.navigateTo({ url: '/packageProfile/LoginPage/LoginPage' })
    return
  }

  // 判断购物车是否已存在
  // 注意：foodList里的id和cart里的foodId对应 (使用 == 兼容字符串和数字类型的 ID)
  const existingItem = state.cart.find(item => item.foodId == food.id)

  if (existingItem) {
    // 存在则数量+1
    const newCount = existingItem.count + 1
    await api.updateCart(existingItem.id, { count: newCount })
  } else {
    // 不存在则新增
    const newItem = {
      userId: state.user.id,
      foodId: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      count: 1
    }
    await api.addToCart(newItem)
  }
  await refreshUserData()
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}

// 6. 修改购物车数量
const changeCartCount = async (cartItemId, delta) => {
  const item = state.cart.find(i => i.id === cartItemId)
  if (!item) return

  const newCount = item.count + delta
  if (newCount <= 0) {
    // 删除
    await api.deleteCart(cartItemId)
  } else {
    // 更新
    await api.updateCart(cartItemId, { count: newCount })
  }
  await refreshUserData()
}

// 7. 清空购物车
const clearCart = async () => {
  if (!state.isLogin) return
  // Json-server 不支持批量删除，只能循环删（学习项目暂且这样）
  for (const item of state.cart) {
    await api.deleteCart(item.id)
  }
  await refreshUserData()
}

// 8. 创建订单
const createOrder = async (address, itemsToOrder = null) => {
  if (!state.isLogin) return

  // 默认为购物车所有内容，但支持传入特定结算列表
  const finalItems = itemsToOrder || state.cart

  const orderData = {
    userId: state.user.id,
    status: 'paid', // 简化直接为已支付
    createTime: new Date().toLocaleString(),
    totalPrice: totalPrice.value, // 注意: 这里如果只结算部分商品，totalPrice可能需要重新计算，建议在PaymentPage传过来正确的金额或在此重新计算
    address: address, // 将选中的地址快照存入
    items: finalItems // 购物车当前内容的快照
  }

  // 重新计算总价以确保安全（防止前端UI显示和实际提交不一致）
  const realTotal = finalItems.reduce((sum, item) => sum + (item.price * item.count), 0)
  orderData.totalPrice = realTotal

  const res = await api.createOrder(orderData)

  // 下单后清空购物车中已购买的商品
  // 如果是部分结算，只删除这部分；如果是全额，清空所有
  if (itemsToOrder && itemsToOrder.length > 0) {
    for (const item of itemsToOrder) {
      await api.deleteCart(item.id)
    }
  } else {
    await clearCart()
  }

  await refreshUserData()
  return res // 返回创建的订单对象（包含生成的ID）
}

// 设置结算商品
const setCheckoutItems = (items) => {
  state.checkoutItems = items
}

export default {
  state,
  cartItems,
  totalPrice,
  cartCount,
  init,
  login,
  logout,
  register,
  updateUserProfile,
  addToCart,
  changeCartCount,
  clearCart,
  createOrder,
  setCheckoutItems,
  refreshUserData,
  addAddress,
  updateAddress,
  deleteAddress
}

