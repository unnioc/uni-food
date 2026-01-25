<template>
	<view class="checkout-container">
		<!-- 1. 收货地址卡片 -->
		<view class="card-box address-card">
			<view class="card-header">
				<image class="icon" src="/static/ic_address.png" mode=""></image>
				<text class="header-title">收货地址</text>
			</view>
			<view class="address-content">
				<view class="user-info">
					<text class="user-name">Endorphin</text>
				</view>
				<text class="address-detail">广东省深圳市龙岗区龙城街道龙翔大道2188号深圳信息职业技术大学</text>
				<text class="user-phone">18512345678</text>
			</view>
		</view>
		<!-- 2. 订单摘要卡片 -->
		<view class="card-box summary-card">
			<view class="card-header">
				<image class="icon" src="/static/ic_order_list.png" mode=""></image>
				<text class="header-title">订单详情</text>
			</view>
			<view class="summary-list">
				<view class="summary-item" v-for="(item, index) in orderItems" :key="index">
					<text class="item-name">{{ item.name }} x{{ item.count }}</text>
					<text class="item-price">￥{{ (item.price * item.count).toFixed(2) }}</text>
				</view>
				<view class="summary-item delivery-fee"> <text class="item-name">配送费</text>
					<text class="item-price">￥2.00</text>
				</view>
			</view>
		</view>
		<!-- 3. 支付方式卡片 -->
		<view class="card-box payment-card">
			<view class="card-header">
				<image class="icon" src="/static/ic_wallet.png" mode=""></image>
				<text class="header-title">支付方式</text>
			</view>
			<view class="payment-list">
				<view v-for="(pay, index) in paymentMethods" :key="pay.id" class="payment-item"
					:class="{ active: selectedPay === pay.id }" @click="selectedPay = pay.id">
					<view class="pay-left">
						<image class="icon" :src="pay.image" mode=""></image>
						<text class="pay-name">{{ pay.name }}</text>
					</view>
					<view class="radio-circle">
						<view class="inner-dot" v-if="selectedPay === pay.id"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 4. 底部固定支付条 -->
		<view class="footer-pay-bar">
			<view class="total-section">
				<text class="label">总金额</text>
				<text class="amount">￥14.00</text>
			</view>
			<button class="pay-btn" @click="handlePay">立即支付</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	// 订单预览数据 
	const orderItems = ref([{
		name: 'Organic Avocados',
		count: 2,
		price: 4.50
	}, {
		name: 'Fresh Strawberries',
		count: 1,
		price: 3.00
	}]);
	// 支付方式配置 
	const selectedPay = ref('wechatPay');
	const paymentMethods = ref([{
		id: 'wechatPay',
		name: '微信支付',
		image: '/static/ic_wechat_pay.png'
	}, {
		id: 'alipay',
		name: '支付宝',
		image: '/static/ic_ali_pay.png'
	}, {
		id: 'unionPay',
		name: '云闪付',
		image: '/static/ic_union_pay.png'
	}, {
		id: 'eCNYPay',
		name: '数字人民币',
		image: '/static/ic_e_cny_pay.png'
	}]);
	const handlePay = () => {
		uni.showLoading({
			title: '支付中...'
		});
		// 模拟支付延迟教学逻辑 
		setTimeout(() => {
			uni.hideLoading();
			// 随机跳转成功或失败页，用于教学演示 
			const success = Math.random() > 0.2;
			uni.navigateTo({
				url: success ? '/packageOrder/PaymentSuccessfulPage/PaymentSuccessfulPage' :
					'/packageOrder/PaymentFailedPage/PaymentFailedPage'
			});
		}, 1500);
	};
</script>

<style lang="scss">
	$primary-color: #42b983;

	.checkout-container {
		background-color: #f8f9fa;
		min-height: 100vh;
		padding: 30rpx;
		padding-bottom: 200rpx; // 为底部留出空间
	}

	

	// 卡片通用样式 
	.card-box {
		background-color: #fff;
		border-radius: 30rpx;
		padding: 40rpx;
		margin-bottom: 30rpx;

		.card-header {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.header-title {
				font-size: 24rpx;
				color: #909399;
				font-weight: bold;
				margin-left: 10rpx;
				letter-spacing: 1rpx;
			}
		}
	}

	// 地址内容 
	.address-content {
		.user-name {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 15rpx;
			display: block;
		}

		.address-detail {
			font-size: 28rpx;
			color: #666;
			line-height: 1.5;
			display: block;
			margin-bottom: 10rpx;
		}

		.user-phone {
			font-size: 28rpx;
			color: #999;
		}
	}

	// 订单摘要 
	.summary-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 25rpx;
		font-size: 30rpx;
		color: #444;

		&.delivery-fee {
			margin-top: 40rpx;
			padding-top: 30rpx;
			border-top: 1rpx solid #f2f2f2;
			color: #888;
		}
	}

	// 支付列表 
	.payment-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border: 2rpx solid #f0f0f0;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		transition: all 0.2s;

		&.active {
			border-color: $primary-color;
			background-color: rgba(66, 185, 131, 0.02);
		}

		.pay-left {
			display: flex;
			align-items: center;

			.pay-name {
				margin-left: 20rpx;
				font-size: 28rpx;
				font-weight: 500;
			}
		}

		.radio-circle {
			width: 36rpx;
			height: 36rpx;
			border: 2rpx solid #ddd;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;

			.inner-dot {
				width: 20rpx;
				height: 20rpx;
				background-color: $primary-color;
				border-radius: 50%;
			}
		}

		&.active .radio-circle {
			border-color: $primary-color;
		}
	}

	// 底部固定栏 
	.footer-pay-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 30rpx 40rpx;
		padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.03);

		.total-section {
			.label {
				font-size: 24rpx;
				color: #999;
				display: block;
			}

			.amount {
				font-size: 40rpx;
				font-weight: bold;
				color: $primary-color;
			}
		}

		.pay-btn {
			background-color: $primary-color;
			color: #fff;
			border: none;
			border-radius: 24rpx;
			width: 340rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 34rpx;
			font-weight: bold;
			margin: 0;

			&::after {
				border: none;
			}

			&:active {
				opacity: 0.9;
			}
		}
	}
</style>