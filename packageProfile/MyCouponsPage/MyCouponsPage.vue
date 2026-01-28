<template>
	<view class="coupons-container">
		<!-- 1. 插画区域 -->
		<view class="illustration-box">
			<view class="circle-bg">
				<!-- 这里可以用图片代替，此处演示用纯CSS和图标模拟插画 -->
				<view class="ticket-icon">
					<view class="dot"></view>
					<view class="dot"></view>
					<view class="dot"></view>
				</view>
				<view class="search-zoom">
					<uni-icons type="search" size="20" color="#42b983"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 2. 文本提示 -->
		<view class="text-group">
			<text class="main-title">No coupons available</text>
			<text class="sub-title">Check back later for promotions and special offers</text>
		</view>
		<!-- 3. 操作按钮 -->
		<view class="btn-section">
			<button class="home-btn" @click="goHome">Back to Home</button>
		</view>
	</view>
</template>

<script setup>
	const goHome = () => {
		// 教学点：跳转到带 TabBar 的页面必须使用 switchTab 
		uni.switchTab({
			url: '/pages/index/index'
		});
	};
</script>

<style lang="scss">
	$primary-color: #42b983;

	.coupons-container {
		background-color: #ffffff;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; // 垂直居中核心 
		padding: 0 60rpx;
	}

	// 插画部分样式 
	.illustration-box {
		margin-bottom: 60rpx;

		.circle-bg {
			width: 440rpx;
			height: 440rpx;
			background-color: #f9fafb;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
		}

		.ticket-icon {
			width: 180rpx;
			height: 120rpx;
			background-color: #d1f2e1;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 12rpx;

			.dot {
				width: 12rpx;
				height: 12rpx;
				background-color: #ffffff;
				border-radius: 50%;
			}
		}

		.search-zoom {
			position: absolute;
			bottom: 110rpx;
			right: 110rpx;
			width: 100rpx;
			height: 100rpx;
			background-color: #ffffff;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
		}
	}

	// 文本部分样式 
	.text-group {
		text-align: center;
		margin-bottom: 100rpx;

		.main-title {
			font-size: 44rpx;
			font-weight: bold;
			color: #1a1a1a;
			display: block;
			margin-bottom: 24rpx;
		}

		.sub-title {
			font-size: 30rpx;
			color: #999;
			line-height: 1.6;
			padding: 0 40rpx;
			display: block;
		}
	}

	// 按钮部分样式 
	.btn-section {
		width: 100%;

		.home-btn {
			background-color: $primary-color;
			color: #ffffff;
			border-radius: 24rpx;
			height: 110rpx;
			line-height: 110rpx;
			font-size: 34rpx;
			font-weight: bold;
			border: none;
			box-shadow: 0 20rpx 40rpx rgba(66, 185, 131, 0.2);

			&::after {
				border: none;
			}

			&:active {
				transform: scale(0.98);
				opacity: 0.9;
			}
		}
	}
</style>