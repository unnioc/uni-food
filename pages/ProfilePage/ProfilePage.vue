<template>
  <!-- 未登录 -->
  <view v-if="isLogin === false" class="profile-container">
    <!-- 1. 顶部用户状态区 -->
    <view class="user-status-section">
      <view class="avatar-placeholder">
        <image src="/static/ic_user.png"></image>
        <uni-icons type="person-filled" size="50" color="#BDC3C7"></uni-icons>
      </view>
      <text class="status-title">Not Logged In</text>
      <text class="status-subtitle">Guest User</text>
    </view>
    <!-- 2. 引导登录卡片 -->
    <view class="login-card">
      <view class="card-top-bg">
        <image class="icon-l" src="/static/ic_food.png" mode=""></image>
      </view>
      <view class="card-content">
        <text class="card-title">Join the Uni-Food community</text>
        <text class="card-desc">Log in to track your orders, save delivery addresses, and earn rewards on every meal.
        </text>
        <button class="login-btn" @click="goToLogin">Log In / Sign Up</button>
      </view>
    </view>
    <!-- 3. 功能列表区 -->
    <view class="menu-section">
      <!-- 模块一：My Activity (锁定态演示) -->
      <!--      <view class="section-group">-->
      <!--        <text class="section-label">My Activity</text>-->
      <!--        <view class="menu-item disabled" @click="showLoginTip">-->
      <!--          <view class="item-left">-->
      <!--            <view class="icon-bg">-->
      <!--              <uni-icons type="refreshtime" size="20" color="#999"></uni-icons>-->
      <!--            </view>-->
      <!--            <text class="item-name">Past Orders</text>-->
      <!--          </view>-->
      <!--          <uni-icons type="locked" size="18" color="#ccc"></uni-icons>-->
      <!--        </view>-->
      <!--        <view class="menu-item disabled" @click="showLoginTip">-->
      <!--          <view class="item-left">-->
      <!--            <view class="icon-bg">-->
      <!--              <uni-icons type="heart" size="20" color="#999"></uni-icons>-->
      <!--            </view>-->
      <!--            <text class="item-name">Favorite Meals</text>-->
      <!--          </view>-->
      <!--          <uni-icons type="locked" size="18" color="#ccc"></uni-icons>-->
      <!--        </view>-->
      <!--      </view>-->
      <!-- 模块二：Personal Info (锁定态演示) -->
      <!--      <view class="section-group">-->
      <!--        <text class="section-label">Personal Info</text>-->
      <!--        <view class="menu-item disabled" @click="showLoginTip">-->
      <!--          <view class="item-left">-->
      <!--            <view class="icon-bg">-->
      <!--              <uni-icons type="location" size="20" color="#999"></uni-icons>-->
      <!--            </view>-->
      <!--            <text class="item-name">Saved Addresses</text>-->
      <!--          </view>-->
      <!--          <uni-icons type="locked" size="18" color="#ccc"></uni-icons>-->
      <!--        </view>-->
      <!--        <view class="menu-item disabled" @click="showLoginTip">-->
      <!--          <view class="item-left">-->
      <!--            <view class="icon-bg">-->
      <!--              <uni-icons type="wallet" size="20" color="#999"></uni-icons>-->
      <!--            </view>-->
      <!--            <text class="item-name">Payment Methods</text>-->
      <!--          </view>-->
      <!--          <uni-icons type="locked" size="18" color="#ccc"></uni-icons>-->
      <!--        </view>-->
      <!--      </view>-->
      <!-- 模块三：App Support (开放态演示) -->
      <view class="section-group">
        <text class="section-label">App Support</text>
        <view class="menu-item" @click="navigateTo('/packageProfile/HelpCenterPage/HelpCenterPage')">
          <view class="item-left">
            <view class="icon-bg active">
              <image class="icon" src="/static/ic_help.png" />
            </view>
            <text class="item-name">Help Center</text>
          </view>
          <image class="icon" src="/static/ic_arrow-right.png" mode=""></image>
        </view>
        <!--  todo:待实现 uni-food信息页/信息弹窗  -->
        <view class="menu-item" @click="navigateTo('/pages/about/about')">
          <view class="item-left">
            <view class="icon-bg active">
              <image class="icon" src="/static/ic_tip.png" />
            </view>
            <text class="item-name">About Uni-Food</text>
          </view>
          <image class="icon" src="/static/ic_arrow-right.png" mode=""></image>
        </view>
      </view>
    </view>
  </view>
  <!-- 已登录 -->
  <view v-if="isLogin === true" class="profile-container">
    <!-- 1. 用户信息头部 -->
    <view class="user-header">
      <view class="avatar-box">
        <!-- todo:待修改默认头像图片 -->
        <image class="avatar" :src="user.avatar || '/static/square.jpg'" mode="aspectFill"></image>
      </view>
      <text class="user-name">{{ user.nickName || 'User' }}</text>
      <text class="user-email">{{ user.phone || '' }}</text>
    </view>
    <!-- 2. 导航菜单列表 -->
    <view class="menu-list">
      <view v-for="(item, index) in menuItems" :key="index" class="menu-item"
        @click="index == 0 ? switchTab(item.path) : navigateTo(item.path)">
        <view class="item-left">
          <image class="icon" :src="item.image" mode=""></image>
          <text class="item-title">{{ item.title }}</text>
        </view>
        <image class="icon" src="/static/ic_arrow-right.png" mode=""></image>
      </view>
    </view>
    <!-- 3. 退出登录按钮 -->
    <view class="logout-section">
      <button class="logout-btn" @click="comfirmExit">退出登录</button>
    </view>
  </view>
  <!-- 自定义弹窗组件 -->
  <CustomModal :visible="showExitModal" title="退出登录" content="您确定要退出当前登录吗？" icon="/static/ic_tip.png" iconBg="#ecf8f2"
    confirmText="确定" confirmColor="#42b983" @confirm="doExit" @cancel="showExitModal = false" cancel-text="取消" />
</template>

<script setup>
import { computed, ref } from 'vue';
import CustomModal from '@/components/customModal.vue'
import store from '@/store/index.js'

// 用户登录状态 (响应式绑定 Store)
const isLogin = computed(() => store.state.isLogin)
const user = computed(() => store.state.user || {})

const showExitModal = ref(false)
const comfirmExit = () => {
  showExitModal.value = true
}
const doExit = () => {
  // 调用 Store 的退出方法
  store.logout()
  showExitModal.value = false
  uni.showToast({
    icon: 'none',
    title: '退出登录成功'
  })
}

// 菜单配置数据，方便扩展
const menuItems = ref([{
  title: '我的订单',
  image: '/static/ic_orders.png',
  path: '/pages/OrderPage/OrderPage'
}, {
  title: '收货地址',
  image: '/static/ic_address.png',
  path: '/packageProfile/MyAddressPage/MyAddressPage'
}, {
  title: '优惠券',
  image: '/static/ic_coupons.png',
  path: '/packageProfile/MyCouponsPage/MyCouponsPage'
}, {
  title: '设置',
  image: '/static/ic_settings.png',
  path: '/packageProfile/SettingPage/SettingPage'
}, {
  title: '帮助中心',
  image: '/static/ic_help.png',
  path: '/packageProfile/HelpCenterPage/HelpCenterPage'
}]);

const navigateTo = (path) => {
  uni.navigateTo({
    url: path
  });
};

const switchTab = (path) => {
  uni.switchTab({
    url: path
  })
}

// const handleLogout = () => {
// 	uni.showModal({
// 		title: '退出登录',
// 		content: '	确定要登出账号吗?',
// 		confirmColor: '#ff5252',
// 		success: (res) => {
// 			if (res
// 				.confirm
// 			) {
// 				// 教学点：实际开发中需清除本地存储的 token
// 				uni.showToast({
// 					title: '退出登录成功',
// 					icon: 'success'
// 				}); // 重定向到登录页或首页游客态
// 			}
// 		}
// 	});
// };

const goToLogin = () => {
  uni.navigateTo({ url: '/packageProfile/LoginPage/LoginPage' });
};

const showLoginTip = () => {
  uni.showModal({
    title: 'Login Required',
    content: 'Please log in to access this feature.',
    confirmText: 'Log In',
    confirmColor: '#42b983',
    success: (res) => {
      if (res.confirm) goToLogin();
    }
  });
};
</script>
<style lang="scss">
$primary-color: #42b983;

.profile-container {
  background-color: #fcfcfc;
  min-height: 100vh;
}

// 头部用户信息
.user-header {
  background-color: #fff;
  padding: 80rpx 0 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-box {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
    border: 6rpx solid #e8f7f0;
    overflow: hidden;
    margin-bottom: 30rpx;

    .avatar {
      width: 100%;
      height: 100%;
    }
  }

  .user-name {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
  }

  .user-email {
    font-size: 26rpx;
    color: #999;
  }
}

// 菜单列表
.menu-list {
  background-color: #fff;
  margin-top: 20rpx;
  padding: 0 30rpx;

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 10rpx;
    border-bottom: 1rpx solid #f8f8f8;

    &:last-child {
      border-bottom: none;
    }

    .item-left {
      display: flex;
      align-items: center;

      .item-title {
        font-size: 30rpx;
        color: #333;
        margin-left: 20rpx;
      }
    }

    &:active {
      background-color: #f9f9f9;
    }
  }
}

// 退出登录区域
.logout-section {
  padding: 60rpx 40rpx;

  .logout-btn {
    background-color: #fff;
    color: #ff5252;
    border: 2rpx solid #ff5252;
    border-radius: 20rpx;
    font-size: 32rpx;
    height: 90rpx;
    line-height: 90rpx;
    font-weight: 500;

    &::after {
      border: none;
    }

    &:active {
      background-color: #fff1f1;
    }
  }
}

// 头部状态
.user-status-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50rpx;

  .avatar-placeholder {
    width: 180rpx;
    height: 180rpx;
    background-color: #f0f3f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    border: 8rpx solid #fff;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

    image {
      width: 90rpx;
      height: 90rpx;
    }
  }

  .status-title {
    font-size: 40rpx;
    font-weight: bold;
    color: #1a1a1a;
  }

  .status-subtitle {
    font-size: 26rpx;
    color: #95a5a6;
    margin-top: 8rpx;
  }
}

// 登录引导卡片
.login-card {
  margin: 0 40rpx 60rpx;
  background-color: #fff;
  border-radius: 30rpx;
  overflow: hidden;
  box-shadow: 0 15rpx 40rpx rgba(0, 0, 0, 0.04);

  .card-top-bg {
    height: 125rpx;
    background-color: #d1f2e1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-content {
    padding: 40rpx;
    text-align: center;

    .card-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      display: block;
    }

    .card-desc {
      font-size: 26rpx;
      color: #7f8c8d;
      line-height: 1.5;
      margin: 20rpx 0 40rpx;
      display: block;
    }

    .login-btn {
      background-color: $primary-color;
      color: #fff;
      border-radius: 20rpx;
      height: 90rpx;
      line-height: 90rpx;
      font-size: 30rpx;
      font-weight: bold;
      border: none;

      &::after {
        border: none;
      }
    }
  }
}

// 菜单列表
.menu-section {
  padding: 0 40rpx;

  .section-group {
    margin-bottom: 50rpx;

    .section-label {
      font-size: 24rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 25rpx;
      display: block;
      text-transform: uppercase;
      letter-spacing: 1rpx;
    }
  }

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25rpx 0;
    margin-bottom: 10rpx;

    .item-left {
      display: flex;
      align-items: center;

      .icon-bg {
        width: 70rpx;
        height: 70rpx;
        background-color: #f5f7f9;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 25rpx;

        &.active {
          background-color: #f0f3f5;
        }
      }

      .item-name {
        font-size: 30rpx;
        color: #333;
      }
    }

    &.disabled {
      .item-name {
        color: #bdc3c7;
      }
    }

    &:active {
      opacity: 0.7;
    }
  }
}
</style>