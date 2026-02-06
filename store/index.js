import { reactive, computed } from 'vue'
import { api } from '@/api/index.js'

// 响应式状态
const state = reactive({
  user: uni.getStorageSync('user') || null, // 仅保留用户基础信息用于自动登录
  isLogin: !!uni.getStorageSync('user'),
  banners: [],
  categories: [],
  menu: [],
  cart: [],
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
    const [banners, categories, foodList] = await Promise.all([
      api.getBanners(),
      api.getCategories(),
      api.getFoodList()
    ])
    state.banners = banners
    state.categories = categories
    state.menu = foodList

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
    const [cart, orders] = await Promise.all([
      api.getCart(state.user.id),
      api.getOrders(state.user.id)
    ])
    state.cart = cart
    state.orders = orders
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
        // 仅持久化用户身份，不持久化购物车等业务数据
        uni.setStorageSync('user', user)

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

// 6. 加入购物车
const addToCart = async (food) => {
  if (!state.isLogin) {
    uni.navigateTo({ url: '/packageProfile/LoginPage/LoginPage' })
    return
  }

  // 判断购物车是否已存在
  // 注意：foodList里的id和cart里的foodId对应
  const existingItem = state.cart.find(item => item.foodId === food.id)

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
const createOrder = async (address) => {
  if (!state.isLogin) return

  const orderData = {
    userId: state.user.id,
    status: 'paid', // 简化直接为已支付
    createTime: new Date().toLocaleString(),
    totalPrice: totalPrice.value,
    address: address, // 将选中的地址快照存入
    items: state.cart // 购物车当前内容的快照
  }

  await api.createOrder(orderData)
  await clearCart() // 下单后清空购物车
  await refreshUserData()
  return true
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
  refreshUserData
}

