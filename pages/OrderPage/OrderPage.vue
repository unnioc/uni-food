<template>
	<!-- 未登录状态 -->
	<view v-if="!isLogin" class="denied-container">
		<view class="content">
			<view class="illustration-box">
				<view class="circle-bg">
					<image class="lock-icon" src="/static/ic_user_green.png"></image>
				</view>
			</view>
			<view class="text-section">
				<text class="main-title">登录查看更多订单</text>
				<text class="sub-desc">若要查看订单的历史记录及状态，请先登录。</text>
			</view>
			<view class="btn-group">
				<button class="btn btn-primary" @click="goToLogin">登录</button>
				<button class="btn btn-secondary" @click="goHome">返回菜单</button>
			</view>
		</view>
	</view>

	<!-- 已登录状态 -->
	<view v-else class="order-page">
		<!-- 无订单 -->
		<view v-if="orders.length === 0" class="empty-container">
			<view class="content">
				<!-- 1. 中心插画区域 -->
				<view class="illustration-box">
					<view class="circle-bg">
						<view class="icon-wrapper">
							<!-- 模拟票据图标 -->
							<view class="receipt-card">
								<view class="line short"></view>
								<view class="line long"></view>
								<view class="line dot"></view>
							</view>
							<!-- 放大镜图标 -->
							<view class="search-zoom">
								<image class="icon" src="/static/ic_find.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<!-- 2. 文本提示 -->
				<view class="text-group">
					<text class="main-title">暂无订单</text>
					<text class="sub-title">您还没有订单喔，快去下单吧~</text>
				</view>
				<!-- 3. 操作按钮 -->
				<button class="explore-btn" @click="goHome">前往菜单</button>
			</view>
		</view>

		<!-- 有订单 -->
		<scroll-view scroll-y class="order-scroll">
			<!-- 订单卡片 -->
			<view v-for="(order, index) in orders" :key="order.id" class="order-card" @click="goToDetail(order.id)">
				<!-- 顶部：价格与日期 -->
				<view class="card-header">
					<view class="card-header-start">
						<text class="order-id">订单号：#{{ order.id }}</text>
						<text class="order-date">{{ order.date }}</text>
					</view>
					<text class="order-price">￥{{ order.totalPrice }}</text>
				</view>
				<!-- 中间：菜品图片预览 -->
				<view class="image-preview-box">
					<view class="image-list">
						<!-- 只显示前3个图片 -->
						<view v-for="(img, imgIdx) in order.images.slice(0, 3)" :key="imgIdx" class="img-wrapper">
							<image :src="img" mode="aspectFill" class="food-thumb" />
							<view v-if="imgIdx === 2 && order.images.length > 3" class="more-mask"> +{{
                order.images.length - 2
              }}
							</view>
						</view>
					</view>
					<!-- 状态标签 (可选) -->
					<text class="status-tag">{{ order.statusText }}</text>
				</view>
				<!-- 底部：查看详情按钮 -->
				<view class="card-footer">
					<button class="detail-btn">查看详情</button>
				</view>
			</view>
			<!-- 底部占位 -->
			<view class="safe-bottom"></view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue';
	import store from '@/store/index.js';

	const isLogin = computed(() => store.state.isLogin);

	const orders = computed(() => {
		return (store.state.orders || []).map(order => ({
			...order,
			date: order.createTime || '',
			statusText: (order.status || '已支付').toUpperCase(),
			images: (order.items || []).map(item => item.image || '/static/ic_food.png')
		})).reverse();
	});

	const goToDetail = (id) => {
		uni.navigateTo({
			url: `/packageOrder/OrderDetailPage/OrderDetailPage?id=${id}`
		});
	};

	const goToLogin = () => {
		uni.navigateTo({
			url: '/packageProfile/LoginPage/LoginPage'
		});
	};

	const goHome = () => {
		uni.switchTab({
			url: '/pages/index/index'
		});
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
			background-color: $primary-color;
			color: #fff;
			border-radius: 24rpx;
			height: 70rpx;
			line-height: 68rpx;
			font-size: 26rpx;
			font-weight: bold;
			border: none;
			margin-top: 20rpx;
			box-shadow: 0 10rpx 20rpx rgba(66, 185, 131, 0.2);

			&:active {
				transform: scale(0.98);
				opacity: 0.9;
			}
		}
	}

	.safe-bottom {
		height: 40rpx;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 200rpx;
		color: #999;
		font-size: 30rpx;
	}

	.denied-container {
		background-color: #ffffff;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 60rpx 100rpx;
	}

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
	}

	.empty-container {
		background-color: #ffffff;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 60rpx;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 60rpx 100rpx;
	}

	// 插画部分 
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
			position: relative;
		}

		.icon-wrapper {
			position: relative;

			.receipt-card {
				width: 100rpx;
				height: 130rpx;
				background-color: $primary-color;
				border-radius: 12rpx;
				padding: 20rpx 15rpx;
				display: flex;
				flex-direction: column;
				gap: 12rpx;

				.line {
					height: 6rpx;
					background-color: rgba(255, 255, 255, 0.4);
					border-radius: 4rpx;

					&.short {
						width: 40%;
					}

					&.long {
						width: 80%;
					}

					&.dot {
						width: 20%;
					}
				}
			}

			.search-zoom {
				position: absolute;
				bottom: -10rpx;
				right: -10rpx;
				width: 60rpx;
				height: 60rpx;
				background-color: #ffffff;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
			}
		}
	}

	// 文本部分 
	.text-group {
		text-align: center;
		margin-bottom: 80rpx;

		.main-title {
			font-size: 44rpx;
			font-weight: bold;
			color: #1a1a1a;
			display: block;
			margin-bottom: 24rpx;
		}

		.sub-title {
			font-size: 30rpx;
			color: #95a5a6;
			line-height: 1.6;
			display: block;
		}
	}

	// 按钮部分 
	.explore-btn {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: $primary-color;
		color: #ffffff;
		border-radius: 24rpx;
		font-size: 32rpx;
		font-weight: bold;
		border: none;
		box-shadow: 0 12rpx 24rpx rgba(66, 185, 131, 0.2);

		&::after {
			border: none;
		}

		&:active {
			transform: scale(0.98);
			opacity: 0.9;
		}
	}
</style>