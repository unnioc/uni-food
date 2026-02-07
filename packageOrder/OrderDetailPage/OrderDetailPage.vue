<template>
	<view class="detail-container">
		<view v-if="loading" class="loading-box">
			<text>Loading...</text>
		</view>

		<block v-else-if="orderInfo">
			<!-- 1. 状态头部 -->
			<view class="status-header">
				<view class="status-icon">
					<icon type="success" size="40" color="#42b983" />
				</view>
				<text class="status-text">{{ orderInfo.status === 'paid' ? 'Payment Successful' : orderInfo.status }}</text>
				<text class="shop-name">{{ orderInfo.shopName }}</text>
			</view>

			<!-- 2. 商品清单 -->
			<view class="section-box">
				<view class="section-title title">
					<image src="/static/ic_food.png"></image>
					<view>Order Items</view>
				</view>
				<view v-for="(item, index) in orderInfo.items" :key="index" class="food-item">
					<view class="food-left">
						<text class="food-name">{{ item.name }}</text>
						<text class="food-num">x{{ item.count }}</text>
					</view>
					<text class="food-price">￥{{ item.price.toFixed(2) }}</text>
				</view>
			</view>

			<!-- 3. 费用明细 -->
			<view class="section-box cost-details">
				<view class="cost-row">
					<text>Subtotal</text>
					<text>￥{{ orderInfo.subtotal.toFixed(2) }}</text>
				</view>
				<view class="cost-row">
					<text>Delivery Fee</text>
					<text>￥{{ orderInfo.deliveryFee.toFixed(2) }}</text>
				</view>
				<view class="cost-row total-row">
					<text class="total-label">Total</text>
					<text class="total-val">￥{{ orderInfo.total.toFixed(2) }}</text>
				</view>
			</view>

			<!-- 4. 订单信息 -->
			<view class="section-box info-section">
				<view class="title section-title">
					<image src="/static/ic_info.png"></image>
					<view>Order Info</view>
				</view>

				<view class="info-item">
					<text class="info-label">Order ID</text>
					<text class="info-val">#{{ orderInfo.orderId }}</text>
				</view>

				<view class="info-item">
					<text class="info-label">Create Time</text>
					<text class="info-val">{{ orderInfo.time }}</text>
				</view>

				<view class="info-item">
					<text class="info-label">Address</text>
					<text class="info-val">{{ orderInfo.addressStr }}</text>
				</view>
			</view>
		</block>

		<view v-else class="empty-box">
			<text>Order not found</text>
		</view>
	</view>
</template>

<script setup>
import {
	ref,
	computed
} from 'vue';
import {
	onLoad
} from '@dcloudio/uni-app';
import { api } from '@/api/index.js';

const orderInfo = ref(null);
const loading = ref(true);

onLoad(async (options) => {
	if (options.id) {
		await loadOrderDetail(options.id);
	} else {
		// Fallback or error
		uni.showToast({ title: 'Order ID missing', icon: 'none' });
	}
});

const loadOrderDetail = async (id) => {
	try {
		loading.value = true;
		// 如果是本地开发环境，可能是字符串ID或数字ID，json-server通常生成数字或字符串
		const res = await api.getOrderById(id);
		if (res) {
			// 简单的字段映射
			// 判断地址是对象还是字符串（这里取决于 createOrder 时传入的是什么）
			let addrDisplay = '';
			if (typeof res.address === 'string') {
				addrDisplay = res.address;
			} else if (res.address && typeof res.address === 'object') {
				addrDisplay = res.address.detail || ((res.address.area || '') + (res.address.address || ''));
			}

			orderInfo.value = {
				...res,
				// 确保一些显示字段存在
				orderId: res.id,
				shopName: 'The Uni Food', // 店铺名写死
				time: res.createTime,
				// 地址展示
				addressStr: addrDisplay || '地址获取失败',
				subtotal: res.items.reduce((sum, item) => sum + (item.price * item.count), 0),
				deliveryFee: 0, // 暂时没有配送费逻辑
				total: res.totalPrice,
				items: res.items
			};
		}
	} catch (e) {
		console.error('Fetch order detail failed', e);
		uni.showToast({ title: 'Failed to load order', icon: 'none' });
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss">
$primary-color: #42b983;

.detail-container {
	background-color: #fff;
	min-height: 100vh;
	padding: 40rpx 0;
}

// 状态头部
.status-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 0;
	border-bottom: 2rpx solid #f8f8f8;

	.status-icon {
		background-color: #e8f7f0;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
	}

	.status-text {
		font-size: 44rpx;
		font-weight: bold;
		color: #1a1a1a;
	}

	.shop-name {
		font-size: 28rpx;
		color: #888;
		margin-top: 10rpx;
	}
}

// 通用板块容器
.section-box {
	padding: 30rpx 40rpx;
	border-bottom: 2rpx solid #f8f8f8;

	.section-title {
		font-size: 24rpx;
		color: #999;
		letter-spacing: 2rpx;
		text-transform: uppercase;
		margin-bottom: 30rpx;
	}
}

// 商品项样式
.food-item {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 30rpx;

	.food-name {
		font-size: 30rpx;
		color: #333;
		display: block;
	}

	.food-num {
		font-size: 26rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.food-price {
		font-size: 30rpx;
		font-weight: 500;
	}
}

// 费用结算样式
.cost-details {
	.cost-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #666;
	}

	.total-row {
		margin-top: 40rpx;
		padding-top: 30rpx;
		border-top: 1rpx solid #f0f0f0;

		.total-label {
			font-size: 34rpx;
			font-weight: bold;
			color: #1a1a1a;
		}

		.total-val {
			font-size: 34rpx;
			font-weight: bold;
			color: $primary-color;
		}
	}
}

// 订单底层信息
.title {
	display: flex;
	align-items: center;
	gap: 12rpx;

	image {
		width: 35rpx;
		height: 35rpx;
	}
}

.info-section {
	.info-item {
		margin-bottom: 30rpx;

		.info-label {
			font-size: 24rpx;
			color: #999;
			display: block;
			margin-bottom: 10rpx;
		}

		.info-val {
			font-size: 28rpx;
			color: #333;
			line-height: 1.5;
		}
	}
}
</style>