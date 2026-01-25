<template>
	<view class="status-container">
		<!-- 成功图标 -->
		<view class="icon-box success">
			<icon type="success" size="60" color="#42b983" />
		</view>
		<view class="text-content">
			<text class="status-title">订单支付成功</text>
			<text class="status-desc">感谢您的下单!</text>
		</view>
		<!-- 金额卡片 -->
		<view class="amount-card">
			<text class="label">总支付金额</text>
			<text class="amount">￥14.50</text>
		</view>
		<!-- 操作按钮 -->
		<view class="btn-group">
			<button class="btn btn-primary" @click="goHome">回到首页</button>
			<button class="btn btn-outline" @click="viewOrder">查看订单详情</button>
		</view>
		<text class="order-id">订单ID：#ORD-20239482</text>
	</view>
</template>

<script setup>
	const goHome = () => uni.reLaunch({
		url: '/pages/index/index'
	});
	const viewOrder = () =>
		uni.navigateTo({
			url: '/packageOrder/OrderDetailPage/OrderDetailPage'
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
</style>