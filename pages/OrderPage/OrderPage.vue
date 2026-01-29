<template>
  <!-- 未登录 -->
  <view v-if="isLoggin === false" class="denied-container">
    <view class="content">
      <!-- 中心插画图标 -->
      <view class="illustration-box">
        <view class="circle-bg">
          <image class="lock-icon" src="/static/ic_user_green.png"></image>
        </view>
      </view>
      <!-- 文本提示区 -->
      <view class="text-section">
        <text class="main-title">Please log in to continue</text>
        <text class="sub-desc"> To track your campus meals and manage your cart, please sign in to your student
          account.
        </text>
      </view>
      <!-- 按钮组 -->
      <view class="btn-group">
        <button class="btn btn-primary" @click="goToLogin">Go to Login</button>
        <button class="btn btn-secondary" @click="goHome">Return to Menu</button>
      </view>
    </view>
  </view>

  <!-- 已登录 -->
  <view v-if="isLoggin === true" class="order-container">
    <!-- 导航栏（如果是自定义导航栏可以取消注释） -->
    <!-- <view class="nav-bar"> <uni-icons type="back" size="24"></uni-icons> <text class="title">Order History</text> </view> -->
    <scroll-view scroll-y class="order-scroll">
      <!-- 订单列表渲染 -->
      <view v-for="(order, index) in orderHistory" :key="order.id" class="order-card">
        <view class="card-header">
          <text class="shop-name">{{ order.shopName }}</text>
          <text class="total-price">￥{{ order.price }}</text>
        </view>
        <text class="order-date">{{ order.date }}</text>
        <!-- 详情按钮 -->
        <button class="details-btn" @click="goToDetails(order.id)">查看详情</button>
      </view>
      <!-- 占位防止底部遮挡 -->
      <view class="safe-area-bottom"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import {
  ref
} from 'vue';

const isLoggin = ref(false)
// 模拟订单数据，适合教学讲解 v-for
const orderHistory = ref([{
  id: '1001',
  shopName: 'The Uni Food',
  price: '18.50',
  date: '2023-10-24'
}, {
  id: '1002',
  shopName: 'The Uni Food',
  price: '12.00',
  date: '2023-10-22'
}, {
  id: '1003',
  shopName: 'The Uni Food',
  price: '24.15',
  date: '2023-10-21'
}, {
  id: '1004',
  shopName: 'The Uni Food',
  price: '15.40',
  date: '2023-10-10'
}]);

const goToDetails = (
    orderId) => {
  // todo:演示路由跳转与传参
  uni.navigateTo({
    url: '/packageOrder/OrderDetailPage/OrderDetailPage'
    // url: `/pages/order-details/order-details?id=${orderId}`
  });
};

const goToLogin = () => {
  uni.navigateTo({url: '/packageProfile/LoginPage/LoginPage'});
};
const goHome = () => {
  uni.switchTab({url: '/pages/index/index'});
}
</script>

<style lang="scss">
/* 定义主题色变量 */
$primary-color: #42b983;

.order-container {
  background-color: #fcfcfc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.order-scroll {
  flex: 1;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
}

.order-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  border: 1rpx solid #f0f0f0; // 浅色描边增加轮廓感
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);

  // 极轻微的阴影
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;

    .shop-name {
      font-size: 34rpx;
      font-weight: bold;
      color: #333;
    }

    .total-price {
      font-size: 34rpx;
      font-weight: bold;
      color: $primary-color;
    }
  }

  .order-date {
    display: block;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 40rpx;
  }

  .details-btn {
    background-color: $primary-color;
    color: #ffffff;
    border-radius: 16rpx;
    font-size: 30rpx;
    height: 88rpx;
    line-height: 88rpx;
    border: none; // 去除小程序自带的边框

    &::after {
      border: none;
    }

    // 简单的点击缩放效果
    &:active {
      opacity: 0.9;
      transform: scale(0.98);
    }
  }
}

.safe-area-bottom {
  height: 50rpx;
}

.denied-container {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 导航栏样式
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60rpx 30rpx 20rpx;

  .nav-title {
    font-size: 34rpx;
    font-weight: bold;
    color: #1a1a1a;
  }

  .placeholder {
    width: 48rpx;
  }

  // 用于居中标题
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 60rpx 100rpx;
}

// 插画图标
.illustration-box {
  margin-bottom: 80rpx;

  .circle-bg {
    width: 460rpx;
    height: 460rpx;
    background-color: #e8f7f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lock-icon {
    width: 150rpx;
    height: 150rpx;

  }
}

// 文本区
.text-section {
  text-align: center;
  margin-bottom: 100rpx;

  .main-title {
    font-size: 44rpx;
    font-weight: bold;
    color: #1a1a1a;
    display: block;
    margin-bottom: 30rpx;
  }

  .sub-desc {
    font-size: 30rpx;
    color: #95a5a6;
    line-height: 1.6;
    display: block;
  }
}

// 按钮组
.btn-group {
  width: 100%;

  .btn {
    height: 110rpx;
    line-height: 110rpx;
    border-radius: 24rpx;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
    border: none;

    &::after {
      border: none;
    }
  }

  .btn-primary {
    background-color: $primary-color;
    color: #fff;
    box-shadow: 0 10rpx 20rpx rgba(66, 185, 131, 0.2);
  }

  .btn-secondary {
    background-color: #f1f5f9;
    color: #1a1a1a;
  }

  .btn:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
}
</style>