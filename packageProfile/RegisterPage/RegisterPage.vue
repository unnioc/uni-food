<template>
  <view class="auth-page">
    <view class="content">
      <!-- 2. 品牌标识 -->
      <view class="brand-section">
        <view class="brand-logo">
          <image src="/static/ic_logo_white.png"></image>
        </view>
        <text class="main-title">Create Account</text>
        <text class="sub-title">Join our campus community today</text>
      </view>
      <!-- 3. 注册表单 -->
      <view class="form-section">
        <view class="input-group">
          <text class="label">Full Name</text>
          <input class="input" v-model="regForm.username" placeholder="Enter your full name"
                 placeholder-class="placeholder"/></view>
        <view class="input-group">
          <text class="label">Phone/Email</text>
          <input class="input" v-model="regForm.account" placeholder="Enter your phone or email"
                 placeholder-class="placeholder"/></view>
        <view class="input-group">
          <text class="label">Password</text>
          <view class="input-wrapper"><input class="input" v-model="regForm.password" :password="!showPwd"
                                             placeholder="Create a password" placeholder-class="placeholder"/>
            <uni-icons :type="showPwd ? 'eye-filled' : 'eye-slash-filled'" size="20" color="#cbd5e0"
                       @click="showPwd = !showPwd"></uni-icons>
          </view>
        </view>
        <view class="input-group">
          <text class="label">Confirm Password</text>
          <view class="input-wrapper">
            <input class="input" v-model="regForm.confirmPassword" :password="!showConfirmPwd"
                   placeholder="Confirm your password" placeholder-class="placeholder"/>
            <uni-icons :type="showConfirmPwd ? 'eye-filled' : 'eye-slash-filled'" size="20" color="#cbd5e0"
                       @click="showConfirmPwd = !showConfirmPwd"></uni-icons>
          </view>
        </view>
        <button class="submit-btn" @click="handleRegister">Sign Up</button>
      </view>
      <!-- 4. 跳转登录 -->
      <view class="login-footer" @click="goToLogin">
        <text>Already have an account?</text>
        <text class="link">Log In</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import {
  reactive,
  ref
} from 'vue';
// 状态管理
const showPwd = ref(false);
const showConfirmPwd = ref(false);
const regForm = reactive({username: '', account: '', password: '', confirmPassword: ''});
const goBack = () => uni.navigateBack();
const handleRegister = () => {
  // 基础逻辑校验
  if (!regForm.username || !regForm.account || !regForm.password) {
    uni.showToast({title: 'Please fill all fields', icon: 'none'});
    return;
  }
  if (regForm.password !== regForm.confirmPassword) {
    uni.showToast({title: 'Passwords do not match', icon: 'none'});
    return;
  }
  uni.showLoading({title: 'Creating account...'});
  // 模拟注册成功后的逻辑
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: 'Success!',
      icon: 'success',
      success: () => {
        // 注册成功后跳转登录
        setTimeout(() => goToLogin(), 1500);
      }
    });
  }, 1500);
};
const goToLogin = () => {
  uni.redirectTo({url: '/packageProfile/LoginPage/LoginPage'});
};
</script>

<style lang="scss">
$primary-color: #42b983;

.auth-page {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 0 60rpx;
}

// 品牌区域
.brand-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60rpx 0 80rpx;

  .brand-logo {
    width: 120rpx;
    height: 120rpx;
    background-color: $primary-color;
    border-radius: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    box-shadow: 0 10rpx 20rpx rgba(66, 185, 131, 0.2);

    image {
      width: 80rpx;
      height: 80rpx;
    }
  }

  .main-title {
    font-size: 48rpx;
    font-weight: bold;
    color: #1a1a1a;
  }

  .sub-title {
    font-size: 28rpx;
    color: #a0aec0;
    margin-top: 10rpx;
  }
}

// 表单区域
.form-section {
  .input-group {
    margin-bottom: 35rpx;

    .label {
      font-size: 26rpx;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 16rpx;
      display: block;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      .input {
        flex: 1;
      }

      uni-icons {
        position: absolute;
        right: 30rpx;
        z-index: 10;
      }
    }

    .input {
      background-color: #fff;
      border: 2rpx solid #edf2f7;
      border-radius: 20rpx;
      height: 100rpx;
      padding: 0 30rpx;
      font-size: 28rpx;
    }

    .placeholder {
      color: #cbd5e0;
    }
  }
}

.submit-btn {
  background-color: $primary-color;
  color: #fff;
  border-radius: 24rpx;
  height: 110rpx;
  line-height: 110rpx;
  font-size: 34rpx;
  font-weight: bold;
  border: none;
  margin-top: 40rpx;
  box-shadow: 0 10rpx 20rpx rgba(66, 185, 131, 0.2);

  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
}

.login-footer {
  text-align: center;
  margin-top: 60rpx;
  padding-bottom: 60rpx;
  font-size: 28rpx;
  color: #718096;

  .link {
    color: $primary-color;
    font-weight: bold;
    margin-left: 8rpx;
  }
} </style>