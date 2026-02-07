<template>
  <view class="login-container">
    <view class="content">
      <!-- 2. 品牌标识区域 -->
      <view class="brand-section">
        <view class="brand-logo">
          <image src="/static/ic_logo_white.png"></image>
        </view>
        <text class="main-title">Welcome Back</text>
        <text class="sub-title">Log in to your student account</text>
      </view>
      <!-- 3. 登录表单 -->
      <view class="form-section">
        <view class="input-group">
          <text class="label">Phone/Email</text>
          <input class="input" v-model="loginForm.account" placeholder="Enter your phone or email"
            placeholder-class="placeholder" />
        </view>
        <view class="input-group">
          <view class="label-row">
            <text class="label">Password</text>
            <text class="forgot-link" @click="forgetPws">Forgot Password?</text>
          </view>
          <view class="input-wrapper">
            <input class="input" v-model="loginForm.password" :password="!showPwd" placeholder="Enter your password"
              placeholder-class="placeholder" />
          </view>
        </view>
        <button class="login-btn" @click="handleLogin">Login</button>
      </view>
      <!--      &lt;!&ndash; 4. 第三方登录 &ndash;&gt;-->
      <!--      <view class="social-section">-->
      <!--        <view class="divider">-->
      <!--          <view class="line"></view>-->
      <!--          <text class="divider-text">OR</text>-->
      <!--          <view class="line"></view>-->
      <!--        </view>-->
      <!--        <view class="social-icons">-->
      <!--          <view class="icon-circle">-->
      <!--            <uni-icons type="qq" size="24" color="#666"></uni-icons>-->
      <!--          </view>-->
      <!--          <view class="icon-circle">-->
      <!--            <uni-icons type="weixin" size="24" color="#666"></uni-icons>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <!-- 5. 注册跳转 -->
      <view class="register-footer" @click="goToRegister">
        <text>Don't have an account?</text>
        <text class="link">Register New Account</text>
      </view>
    </view>
  </view>
</template>

<script setup>import { reactive, ref } from 'vue';
import store from '@/store/index.js';

const showPwd = ref(false);
const loginForm = reactive({ account: '', password: '' });
const handleLogin = async () => {
  if (!loginForm.account || !loginForm.password) {
    uni.showToast({ title: 'Please fill all fields', icon: 'none' });
    return;
  }
  uni.showLoading({ title: 'Logging in...' });

  try {
    const res = await store.login(loginForm.account, loginForm.password);
    uni.hideLoading();

    if (res.success) {
      uni.showToast({ title: 'Welcome back!', icon: 'success' });
      // 登录成功跳转
      setTimeout(() => {
        uni.switchTab({ url: '/pages/index/index' });
      }, 500);
    } else {
      uni.showToast({ title: res.message || 'Login failed', icon: 'none' });
    }
  } catch (error) {
    uni.hideLoading();
    uni.showToast({ title: 'Authentication error', icon: 'none' });
  }
};
const goToRegister = () => {
  uni.navigateTo({ url: '/packageProfile/RegisterPage/RegisterPage' });
};

const forgetPws = () => {
  uni.showToast({
    title: '请联系管理员进行重置',
    icon: 'none',
  })
}
</script>

<style lang="scss">
$primary-color: #42b983;

.login-container {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 0 60rpx;
}

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

.form-section {
  .input-group {
    margin-bottom: 40rpx;

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-size: 26rpx;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 20rpx;
      display: block;
      text-transform: uppercase;
      letter-spacing: 1rpx;
    }

    .forgot-link {
      font-size: 24rpx;
      color: $primary-color;
      font-weight: 500;
      margin-bottom: 20rpx;
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
      background-color: #f7fafc;
      border: 2rpx solid #edf2f7;
      border-radius: 20rpx;
      height: 100rpx;
      padding: 0 30rpx;
      font-size: 30rpx;
    }

    .placeholder {
      color: #cbd5e0;
    }
  }
}

.login-btn {
  background-color: $primary-color;
  color: #fff;
  border-radius: 24rpx;
  height: 110rpx;
  line-height: 110rpx;
  font-size: 34rpx;
  font-weight: bold;
  border: none;
  margin-top: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(66, 185, 131, 0.2);

  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
}

.social-section {
  margin-top: 80rpx;

  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;

    .line {
      flex: 1;
      height: 2rpx;
      background-color: #edf2f7;
    }

    .divider-text {
      font-size: 24rpx;
      color: #a0aec0;
      padding: 0 20rpx;
    }
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 40rpx;

    .icon-circle {
      width: 100rpx;
      height: 100rpx;
      border: 2rpx solid #edf2f7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        background-color: #f7fafc;
      }
    }
  }
}

.register-footer {
  text-align: center;
  margin-top: 60rpx;
  padding-bottom: 60rpx;
  font-size: 25rpx;
  color: #718096;

  .link {
    color: $primary-color;
    font-weight: bold;
    margin-left: 8rpx;
  }
}
</style>