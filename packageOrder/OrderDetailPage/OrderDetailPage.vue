<template>
	<view class="detail-container">
		<!-- 1. 状态头部 -->
		<view class="status-header">
			<view class="status-icon">
				<icon type="success" size="40" color="#42b983" />
			</view>
			<text class="status-text">订单完成</text>
			<text class="shop-name">The Uni Food</text>
		</view>

		<!-- 2. 商品清单 -->
		<view class="section-box">
			<view class="section-title title">
				<image src="/static/ic_food.png"></image>
				<view>已下单菜品</view>
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
				<text>合计</text>
				<text>￥{{ orderInfo.subtotal.toFixed(2) }}</text>
			</view>
			<view class="cost-row">
				<text>配送费</text>
				<text>￥{{ orderInfo.deliveryFee.toFixed(2) }}</text>
			</view>
			<view class="cost-row total-row">
				<text class="total-label">总金额</text>
				<text class="total-val">￥{{ orderInfo.total.toFixed(2) }}</text>
			</view>
		</view>

		<!-- 4. 订单信息 -->
		<view class="section-box info-section">
			<view class="title section-title">
				<image src="/static/ic_info.png"></image>
				<view>订单信息</view>
			</view>

			<view class="info-item">
				<text class="info-label">订单 ID</text>
				<text class="info-val">#{{ orderInfo.orderId }}</text>
			</view>

			<view class="info-item">
				<text class="info-label">创建时间</text>
				<text class="info-val">{{ orderInfo.time }}</text>
			</view>

			<view class="info-item">
				<text class="info-label">收货地址 </text>
				<text class="info-val">{{ orderInfo.address }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	// 模拟从接口获取的详情数据
	const orderInfo = ref({
		orderId: 'ORD-20231024-882',
		shopName: 'The Garden Kitchen',
		time: '2026-01-21  11:12:13',
		address: '广东省深圳市龙岗区龙城街道龙翔大道2188号深圳信息职业技术大学',
		subtotal: 18.50,
		deliveryFee: 2.00,
		total: 20.50,
		items: [{
				name: 'Classic Garden Salad',
				count: 1,
				price: 12.50
			},
			{
				name: 'Fresh Orange Juice',
				count: 1,
				price: 6.00
			}
		]
	});

	// 在教学中可以演示根据 onLoad(options) 中的 ID 获取数据
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