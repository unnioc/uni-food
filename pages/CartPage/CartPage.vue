<template>
	<!-- 未登录 -->
	<view v-if="!isLogin" class="denied-container">
		<view class="content">
			<!-- 中心插画图标 -->
			<view class="illustration-box">
				<view class="circle-bg">
					<image class="lock-icon" src="/static/ic_user_green.png"></image>
				</view>
			</view>
			<!-- 文本提示区 -->
			<view class="text-section">
				<text class="main-title">登录查看购物车</text>
				<text class="sub-desc">若要查看或管理您的购物车，请先登录。</text>
			</view>
			<!-- 按钮组 -->
			<view class="btn-group">
				<button class="btn btn-primary" @click="goToLogin">登录</button>
				<button class="btn btn-secondary" @click="goHome">返回菜单</button>
			</view>
		</view>
	</view>

	<!-- 已登录 -->
	<view v-if="isLogin" class="cart-container">
		<!-- 顶部操作栏 -->
		<view class="header-action">
			<text class="select-btn" @click="selectAllCart">全选</text>
			<text class="clear-btn" @click="confirmClear">清空</text>
		</view>
		<scroll-view scroll-y class="cart-list">
			<!-- 购物车列表项 -->
			<view v-for="(item, index) in cartList" :key="item.id" class="cart-item">
				<!-- 复选框 -->
				<checkbox :checked="item.checked" color="#42b983" @click="toggleCheck(index)" class="item-checkbox" />
				<!-- 商品信息 -->
				<view class="item-body">
					<view class="info-left">
						<text class="food-name">{{ item.name }}</text>
						<text class="food-price">￥{{ item.price.toFixed(2) }}</text>
					</view>
					<!-- 步进器 (Stepper) -->
					<view class="stepper">
						<view class="step-btn minus" @click="changeCount(index, -1)">-</view>
						<text class="step-num">{{ item.count }}</text>
						<view class="step-btn plus" @click="changeCount(index, 1)">+</view>
					</view>
				</view>
			</view>
			<!-- 空状态提示（教学可选） -->
			<view class="empty-cart" v-if="cartList.length === 0">
				<image src="/static/ic_empty_cart.svg" mode=""></image>
				<view class="empty-tip">您的购物车空空如也</view>
			</view>
		</scroll-view>
		<!-- 底部结算栏 -->
		<view class="footer-bar">
			<view class="total-info">
				<text class="total-label">总金额</text>
				<text class="total-amount">￥{{ totalPrice.toFixed(2) }}</text>
			</view>
			<button class="checkout-btn" @click="goCheckout">前往结账</button>
		</view>
	</view>
	<!-- 自定义弹窗组件 -->
	<CustomModal :visible="showClearModal" title="清空购物车?" content="您确定要清空购物车里的东西吗？" icon="/static/ic_delete.png"
		iconBg="#fff1f1" confirmText="清空" cancelText="取消" confirmColor="#e34848" @confirm="doClearCart"
		@cancel="showClearModal = false" />

</template>

<script setup>
	import {
		ref,
		computed,
		watch
	} from 'vue';
	import CustomModal from '@/components/customModal.vue'
	import store from '@/store/index.js'

	// 1. 登录状态
	const isLogin = computed(() => store.state.isLogin)

	// 2. 购物车数据 & 选中状态管理
	const selectedIds = ref(new Set());

	// 监听购物车数据变化，默认全选新加入的项
	watch(() => store.state.cart, (newCart) => {
		if (newCart && newCart.length > 0) {
			newCart.forEach(item => {
				// 默认全选
				if (!selectedIds.value.has(item.id)) {
					selectedIds.value.add(item.id);
				}
			});
		}
	}, {
		immediate: true,
		deep: true
	});

	// 结合 Store 数据和本地选中状态，生成列表供渲染
	const cartList = computed(() => {
		return (store.state.cart || []).map(item => ({
			...item,
			checked: selectedIds.value.has(item.id)
		}));
	});

	// 2. 计算总价
	const totalPrice = computed(() => {
		return cartList.value.reduce((total, item) => {
			return item.checked ? total + (item.price * item.count) : total;
		}, 0);
	});

	// 3. 改变数量
	const changeCount = (index, delta) => {
		const item = cartList.value[index];
		// 调用 Store 的方法
		store.changeCartCount(item.id, delta);
	};

	// 4. 切换选中状态
	const toggleCheck = (index) => {
		const item = cartList.value[index];
		if (selectedIds.value.has(item.id)) {
			selectedIds.value.delete(item.id);
		} else {
			selectedIds.value.add(item.id);
		}
	};

	// 5.全选购物车
	const selectAllCart = () => {
		const isAllChecked = cartList.value.every(item => item.checked)
		if (isAllChecked) {
			selectedIds.value.clear()
		} else {
			store.state.cart.forEach(item => selectedIds.value.add(item.id))
		}
	}

	// 6. 清空购物车
	const showClearModal = ref(false);
	const confirmClear = () => {
		if (cartList.value.length === 0) return;
		showClearModal.value = true;
	};

	const doClearCart = async () => {
		await store.clearCart()
		selectedIds.value.clear()
		showClearModal.value = false
	};

	// 7. 跳转逻辑
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

	const goCheckout = () => {
		if (totalPrice.value === 0) {
			uni.showToast({
				title: '请先选择菜品',
				icon: 'none'
			});
			return;
		}

		// 过滤出选中的商品
		const checkoutItems = cartList.value.filter(item => item.checked)
		store.setCheckoutItems(checkoutItems)

		// 只有被选中的才应该去结算，这里是个逻辑简略点
		uni.navigateTo({
			url: '/packageOrder/PaymentPage/PaymentPage'
		});
	};
</script>


<style lang="scss">
	$primary-color: #42b983;

	.cart-container {
		width: 100%;
		background-color: #fff;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.header-action {
		padding: 20rpx 20rpx 0 20rpx;
		text-align: right;
		display: flex;
		justify-content: space-between;

		.select-btn {
			font-size: 28rpx;
			font-weight: bold;
			color: #42b983;
		}

		.clear-btn {
			font-size: 28rpx;
			color: #999;
		}
	}

	.cart-list {
		flex: 1;
		width: 95%;
		height: 90%;
		padding: 16rpx;
		padding-bottom: 200rpx;
	}

	.cart-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f8f8f8;

		.item-checkbox {
			transform: scale(0.8); // 缩小原生checkbox尺寸以符合UI
		}

		.item-body {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 20rpx;

			.food-name {
				font-size: 32rpx;
				font-weight: 500;
				color: #333;
				display: block;
			}

			.food-price {
				font-size: 28rpx;
				color: $primary-color;
				margin-top: 8rpx;
				display: block;
			}
		}
	}

	// 步进器样式
	.stepper {
		display: flex;
		align-items: center;
		border: 1rpx solid #efefef;
		border-radius: 12rpx;
		overflow: hidden;

		.step-btn {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36rpx;
			background-color: #fff;
			color: #ccc;

			&.plus {
				color: $primary-color;
			}

			&:active {
				background-color: #f9f9f9;
			}
		}

		.step-num {
			width: 70rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 30rpx;
			border-left: 1rpx solid #efefef;
			border-right: 1rpx solid #efefef;
		}
	}

	// 底部结算
	.footer-bar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 20rpx 20rpx 0 20rpx;
		background-color: #fff;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 999;
		padding-bottom: 20rpx;

		.total-info {
			.total-label {
				font-size: 24rpx;
				color: #999;
				display: block;
			}

			.total-amount {
				font-size: 40rpx;
				font-weight: bold;
				color: #1a1a1a;
			}
		}

		.checkout-btn {
			background-color: $primary-color;
			color: #fff;
			border-radius: 20rpx;
			width: 320rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			margin: 0;

			&::after {
				border: none;
			}
		}
	}

	.empty-cart {
		padding-top: 200rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 400rpx;
			height: 400rpx;
		}

		.empty-tip {
			margin-top: 20rpx;
			text-align: center;
			color: #999;
		}
	}


	.denied-container {
		background-color: #ffffff;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	// 导航栏样式
	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 60rpx 30rpx 20rpx;

		.nav-title {
			font-size: 34rpx;
			font-weight: bold;
			color: #1a1a1a;
		}

		.placeholder {
			width: 48rpx;
		}

		// 用于居中标题
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 60rpx 100rpx;
	}

	// 插画图标
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

	// 文本区
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

	// 按钮组
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

		.btn:active {
			opacity: 0.9;
			transform: scale(0.98);
		}
	}
</style>