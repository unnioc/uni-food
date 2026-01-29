<template>
  <view class="order-page">
    <scroll-view scroll-y class="order-scroll">
      <!-- 订单卡片 -->
      <view v-for="(order, index) in orders" :key="order.id" class="order-card" @click="goToDetail(order.id)">
        <!-- 顶部：价格与日期 -->
        <view class="card-header">
          <view class="card-header-start">
            <text class="order-id">Order：#{{ order.id }}</text>
            <text class="order-date">{{ order.date }}</text>
          </view>
          <text class="order-price">￥{{ order.totalPrice }}</text>
        </view>
        <!-- 中间：菜品图片预览 (核心教学点：嵌套渲染与截取) -->
        <view class="image-preview-box">
          <view class="image-list">
            <!-- 只显示前3个图片 -->
            <view v-for="(img, imgIdx) in order.images.slice(0, 3)" :key="imgIdx" class="img-wrapper">
              <image :src="img" mode="aspectFill" class="food-thumb"/> <!-- 如果是第3张且总数超过3，显示叠加层 -->
              <view v-if="imgIdx === 2 && order.images.length > 3" class="more-mask"> +{{
                  order.images.length - 2
                }}
              </view>
            </view>
          </view>
          <!-- 订单状态标签 -->
          <!--          <text class="status-tag" :class="order.status">{{ order.statusText }}</text>-->
        </view>
        <!-- 底部：查看详情按钮 -->
        <view class="card-footer">
          <button class="detail-btn">View Details</button>
        </view>
      </view>
      <!-- 底部占位 -->
      <view class="safe-bottom"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import {
  ref
} from 'vue';
// 模拟订单数据，注意 images 是一个数组
const orders = ref([{
  id: '20231001',
  date: '2023-10-24 12:30',
  totalPrice: '128.50',
  status: 'completed',
  statusText: 'Completed',
  images: ['/static/ic_food.png', '/static/ic_food.png', '/static/ic_food.png']
}, {
  id: '20231002',
  date: '2023-10-23 18:15',
  totalPrice: '45.00',
  status: 'delivering',
  statusText: 'Delivering',
  images: ['/static/ic_food.png', '/static/ic_food.png']
}]);
const goToDetail = (id) => {
  uni.navigateTo({url: `/packageOrder/OrderDetailPage/OrderDetailPage`});
};
</script>

<style lang="scss">
$primary-color: #42b983;
.order-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.order-scroll {
  padding: 20rpx 30rpx;
  box-sizing: border-box;
}

.order-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25rpx;

    .card-header-start {
      display: flex;
      flex-direction: column;
    }

    .order-id {
      font-size: 26rpx;
      color: #6b7280;
      font-weight: bold;
    }

    .order-date {
      font-size: 20rpx;
      color: #999;
      margin-top: 4rpx;
    }

    .order-price {
      font-size: 32rpx;
      font-weight: bold;
      color: #42b983;
    }
  }

  .image-preview-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 30rpx;

    .image-list {
      display: flex;
      gap: 15rpx;

      .img-wrapper {
        position: relative;
        width: 120rpx;
        height: 120rpx;

        .food-thumb {
          width: 100%;
          height: 100%;
          border-radius: 16rpx;
          background-color: #f5f5f5;
        }

        .more-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 24rpx;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16rpx;
        }
      }
    }

    .status-tag {
      font-size: 24rpx;
      padding: 6rpx 16rpx;
      border-radius: 8rpx;

      &.completed {
        background-color: #e8f7f0;
        color: $primary-color;
      }

      &.delivering {
        background-color: #fff4e5;
        color: #ff9800;
      }
    }
  }

  .detail-btn {
    background-color: #fff;
    color: $primary-color;
    border: 1rpx solid $primary-color;
    border-radius: 40rpx;
    font-size: 26rpx;
    height: 70rpx;
    line-height: 68rpx;

    &::after {
      border: none;
    }
  }
}

.safe-bottom {
  height: 40rpx;
} </style>