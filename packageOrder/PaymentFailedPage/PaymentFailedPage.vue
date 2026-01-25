<template>
	<view class="status-container">
		<!-- 失败图标 -->
		<view class="icon-box failure">
			<icon type="warn" size="60" color="#ff5252" />
		</view>
		<view class="text-content">
			<text class="status-title">订单支付失败</text>
			<text class="status-desc">很抱歉，我们无法处理您的交易，请稍后重试。</text>
		</view>
		<!-- 错误信息卡片 -->
		<view class="error-card">
			<view class="error-row">
				<text>错误码</text>
				<text class="val">ERR_PAY_402</text>
			</view>
			<view class="error-row">
				<text>金额</text>
				<text class="val">￥10.00</text>
			</view>
		</view>
		<!-- 操作按钮 -->
		<view class="btn-group">
			<button class="btn btn-primary" @click="tryAgain">重新支付</button>
			<button class="btn btn-outline" @click="backToCart">返回购物车</button>
		</view>
	</view>
</template>

<script setup>
	const tryAgain = () => uni.redirectTo({
		url: '/packageOrder/PaymentPage/PaymentPage'
	});
	const backToCart = () => uni.switchTab({
		url: '/pages/CartPage/CartPage'
	});
</script>

<style lang="scss">
	.status-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150rpx;
		min-height: 100vh;
		background-color: #fff;
	}

	.icon-box {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #e8f7f0;
		margin-bottom: 60rpx;
	}

	.text-content {
		text-align: center;
		margin-bottom: 60rpx;

		.status-title {
			font-size: 48rpx;
			font-weight: bold;
			color: #333;
			display: block;
		}

		.status-desc {
			font-size: 28rpx;
			color: #999;
			margin-top: 20rpx;
			display: block;
		}
	}

	.amount-card {
		width: 630rpx;
		background-color: #f9fbfd;
		border-radius: 24rpx;
		padding: 50rpx 0;
		text-align: center;
		margin-bottom: 100rpx;

		.label {
			font-size: 24rpx;
			color: #999;
			display: block;
			margin-bottom: 10rpx;
		}

		.amount {
			font-size: 56rpx;
			font-weight: bold;
			color: #333;
		}
	}

	.btn-group {
		width: 630rpx;

		.btn {
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 20rpx;
			font-size: 32rpx;
			margin-bottom: 30rpx;

			&::after {
				border: none;
			}
		}

		.btn-primary {
			background-color: #42b983;
			color: #fff;
		}

		.btn-outline {
			background-color: #fff;
			color: #42b983;
			border: 2rpx solid #42b983;
		}
	}

	.order-id {
		font-size: 24rpx;
		color: #ccc;
		margin-top: 40rpx;
	}

	// 复用大部分样式 
	.icon-box.failure {
		background-color: #fff1f1;
	}

	.error-card {
		width: 630rpx;
		background-color: #f9fbfd;
		border-radius: 24rpx;
		padding: 40rpx;
		margin-bottom: 100rpx;

		.error-row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 15rpx;
			font-size: 28rpx;
			color: #999;

			.val {
				color: #333;
			}
		}
	}

	.text-content .status-desc {
		padding: 0 60rpx;
		line-height: 1.6;
	}
</style>