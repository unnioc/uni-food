<template>
	<view class="checkout-container">
		<!-- 1. 收货地址卡片 -->
		<view class="card-box address-card" @click="selectAddress">
			<view class="card-header">
				<image class="icon" src="/static/ic_address.png" mode=""></image>
				<text class="header-title">收货地址</text>
			</view>

			<!-- 有地址时显示 -->
			<view v-if="currentAddress" class="address-content">
				<view class="user-info">
					<text class="user-name">{{ currentAddress.name || user.nickName }}</text>
					<text v-if="currentAddress.isDefault" class="tag-default">默认</text>
				</view>
				<text class="address-detail">{{ currentAddress.detail }}</text>
				<view class="address-next">
					<text class="user-phone">{{ currentAddress.phone || user.phone }}</text>
					<image class="icon" src="/static/ic_arrow-right.png" />
				</view>
			</view>

			<!-- 无地址时显示 -->
			<view v-else class="no-address">
				<view class="add-tip">
					<text>暂无收货地址，先去添加一个吧~</text>
				</view>
				<uni-icons type="right" size="16" color="#ccc"></uni-icons>
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
					<text class="item-price">￥{{ deliveryFee.toFixed(2) }}</text>
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
				<text class="amount">￥{{ totalPrice }}</text>
			</view>
			<button class="pay-btn" @click="handlePay">立即支付</button>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { onShow, onUnload } from '@dcloudio/uni-app';
import store from '@/store/index.js';

// 页面显示时刷新数据（确保能获取到最新添加的地址）
onShow(() => {
	if (store.state.isLogin) {
		store.refreshUserData();
		// 监听地址选择事件
		uni.$once('selectAddressForOrder', (address) => {
			manualAddress.value = address
		})
	}
});

onUnload(() => {
	uni.$off('selectAddressForOrder')
})

// 获取当前用户信息
const user = computed(() => store.state.user || {});

// 手动选择的地址
const manualAddress = ref(null)

// 计算当前选中的地址
const currentAddress = computed(() => {
	if (manualAddress.value) return manualAddress.value

	const addrs = user.value.addresses || [];
	if (addrs.length === 0) return null;
	// 优先显示默认地址，否则显示第一个
	return addrs.find(item => item.isDefault) || addrs[0];
});

// 跳转到地址管理页选择
const selectAddress = () => {
	uni.navigateTo({ url: '/packageProfile/MyAddressPage/MyAddressPage?source=checkout' });
};

// 订单预览数据：从 Store 中获取结算商品数据
const orderItems = computed(() => {
	if (store.state.checkoutItems && store.state.checkoutItems.length > 0) {
		return store.state.checkoutItems
	}
	return store.state.cart || []
});

// 配送费（固定/或根据规则计算）
const deliveryFee = 2.00;

// 计算总金额：购物车选中商品总价 + 配送费
const totalPrice = computed(() => {
	const goodsTotal = orderItems.value.reduce((sum, item) => sum + (item.price * item.count), 0)
	return (goodsTotal + deliveryFee).toFixed(2);
});

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

const handlePay = async () => {
	if (orderItems.value.length === 0) {
		uni.showToast({ title: '没有商品可支付', icon: 'none' });
		return;
	}

	// 校验地址
	if (!currentAddress.value) {
		uni.showModal({
			title: '缺少收货地址',
			content: '请先添加一个收货地址才能支付',
			confirmText: '去添加',
			success: (res) => {
				if (res.confirm) selectAddress();
			}
		});
		return;
	}

	uni.showLoading({ title: '支付中...' });

	// 使用真实选中的地址
	const addressStr = currentAddress.value.detail;


	try {
		// 2. 调用 Store 真实下单接口 (传入当前显示的 specific items)
		// 注意：这里 createOrder 会清空购物车中对应的商品
		const newOrder = await store.createOrder(addressStr, orderItems.value);

		uni.hideLoading();

		if (newOrder && newOrder.id) {
			uni.navigateTo({
				url: `/packageOrder/PaymentSuccessfulPage/PaymentSuccessfulPage?id=${newOrder.id}`
			});
		} else {
			uni.showToast({ title: '支付失败，请重试', icon: 'none' });
			// 也可以跳转到失败页
			// uni.navigateTo({ url: '/packageOrder/PaymentFailedPage/PaymentFailedPage' });
		}
	} catch (e) {
		uni.hideLoading();
		uni.navigateTo({ url: '/packageOrder/PaymentFailedPage/PaymentFailedPage' });
	}
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
	position: relative;

	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.user-name {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-right: 20rpx;
	}

	.tag-default {
		font-size: 20rpx;
		color: $primary-color;
		background-color: rgba(66, 185, 131, 0.1);
		padding: 4rpx 10rpx;
		border-radius: 6rpx;
	}

	.address-detail {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
		display: block;
		margin-bottom: 15rpx;
	}

	.address-next {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user-phone {
		font-size: 28rpx;
		color: #999;
	}

	.arrow-icon {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
}

// 无地址占位
.no-address {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;

	.add-tip {
		display: flex;
		align-items: center;
		color: $primary-color;
		font-size: 30rpx;
		font-weight: medium;

		text {
			margin-left: 10rpx;
		}
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