<template>
	<view class="profile-container">
		<!-- 1. 用户信息头部 -->
		<view class="user-header">
			<view class="avatar-box">
				<image class="avatar" src="/static/square.jpg" mode="aspectFill"></image>
			</view>
			<text class="user-name">Endorphin</text> <text class="user-email">Endorphin@example.com</text>
		</view>
		<!-- 2. 导航菜单列表 -->
		<view class="menu-list">
			<view v-for="(item, index) in menuItems" :key="index" class="menu-item" @click="navigateTo(item.path)">
				<view class="item-left">
					<image class="icon" :src="item.image" mode=""></image>
					<text class="item-title">{{ item.title }}</text>
				</view>
				<image class="icon" src="/static/ic_arrow-right.png" mode=""></image>
			</view>
		</view>
		<!-- 3. 退出登录按钮 -->
		<view class="logout-section">
			<button class="logout-btn" @click="handleLogout">退出登录</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	// 菜单配置数据，方便扩展 
	const menuItems = ref([{
		title: '我的订单',
		image: '/static/ic_orders.png',
		path: '/pages/OrderPage/OrderPage'
	}, {
		title: '收货地址',
		image: '/static/ic_address.png',
		path: '/pages/address/address'
	}, {
		title: '优惠券',
		image: '/static/ic_coupons.png',
		path: '/pages/coupons/coupons'
	}, {
		title: '设置',
		image: '/static/ic_settings.png',
		path: '/pages/settings/settings'
	}, {
		title: '帮助中心',
		image: '/static/ic_help.png',
		path: '/pages/help/help'
	}]);

	const navigateTo = (path) => {
		uni.navigateTo({
			url: path
		});
	};

	const handleLogout = () => {
		uni.showModal({
			title: '退出登录',
			content: '	确定要登出账号吗?',
			confirmColor: '#ff5252',
			success: (res) => {
				if (res
					.confirm
				) {
					// 教学点：实际开发中需清除本地存储的 token 
					uni.showToast({
						title: '退出登录成功',
						icon: 'success'
					}); // 重定向到登录页或首页游客态 
				}
			}
		});
	};
</script>
<style lang="scss">
	$primary-color: #42b983;

	.profile-container {
		background-color: #fcfcfc;
		min-height: 100vh;
	}

	// 头部用户信息
	.user-header {
		background-color: #fff;
		padding: 80rpx 0 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.avatar-box {
			width: 180rpx;
			height: 180rpx;
			border-radius: 50%;
			border: 6rpx solid #e8f7f0;
			overflow: hidden;
			margin-bottom: 30rpx;

			.avatar {
				width: 100%;
				height: 100%;
			}
		}

		.user-name {
			font-size: 40rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 10rpx;
		}

		.user-email {
			font-size: 26rpx;
			color: #999;
		}
	}

	// 菜单列表 
	.menu-list {
		background-color: #fff;
		margin-top: 20rpx;
		padding: 0 30rpx;

		.menu-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 35rpx 10rpx;
			border-bottom: 1rpx solid #f8f8f8;

			&:last-child {
				border-bottom: none;
			}

			.item-left {
				display: flex;
				align-items: center;

				.item-title {
					font-size: 30rpx;
					color: #333;
					margin-left: 20rpx;
				}
			}

			&:active {
				background-color: #f9f9f9;
			}
		}
	}

	// 退出登录区域 
	.logout-section {
		padding: 60rpx 40rpx;

		.logout-btn {
			background-color: #fff;
			color: #ff5252;
			border: 2rpx solid #ff5252;
			border-radius: 20rpx;
			font-size: 32rpx;
			height: 90rpx;
			line-height: 90rpx;
			font-weight: 500;

			&::after {
				border: none;
			}

			&:active {
				background-color: #fff1f1;
			}
		}
	}
</style>