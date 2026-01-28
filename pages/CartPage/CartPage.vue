 <template>
 	<view class="cart-container">
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
 		iconBg="#fff1f1" confirmText="清空" confirmColor="#e34848" @confirm="doClearCart"
 		@cancel="showClearModal = false" />

 </template>

 <script setup>
 	import {
 		ref,
 		computed
 	} from 'vue';
 	import CustomModal from '@/components/customModal.vue'
 	// 1. 模拟购物车数据 
 	const cartList = ref([{
 		id: 1,
 		name: 'Organic Avocados',
 		price: 4.50,
 		count: 2,
 		checked: true
 	}, {
 		id: 2,
 		name: 'Fresh Strawberries',
 		price: 3.00,
 		count: 1,
 		checked: true
 	}, {
 		id: 3,
 		name: 'Whole Grain Bread',
 		price: 2.50,
 		count: 1,
 		checked: true
 	}, {
 		id: 4,
 		name: 'Greek Yogurt',
 		price: 1.20,
 		count: 1,
 		checked: false
 	}, {
 		id: 5,
 		name: 'Greek Salad',
 		price: 1.20,
 		count: 5,
 		checked: false
 	}, {
 		id: 2,
 		name: 'Fresh Strawberries',
 		price: 3.00,
 		count: 1,
 		checked: true
 	}, {
 		id: 3,
 		name: 'Whole Grain Bread',
 		price: 2.50,
 		count: 1,
 		checked: true
 	}, {
 		id: 4,
 		name: 'Greek Yogurt',
 		price: 1.20,
 		count: 1,
 		checked: false
 	}, {
 		id: 2,
 		name: 'Fresh Strawberries',
 		price: 3.00,
 		count: 1,
 		checked: true
 	}, {
 		id: 3,
 		name: 'Whole Grain Bread',
 		price: 2.50,
 		count: 1,
 		checked: true
 	}, {
 		id: 4,
 		name: 'Greek Yogurt',
 		price: 1.20,
 		count: 1,
 		checked: false
 	}]);
 	// 2. 计算总价 (教学核心：Computed) 
 	const totalPrice = computed(() => {
 		return cartList.value.reduce((total, item) => {
 			return item.checked ? total + (item.price * item.count) : total;
 		}, 0);
 	});
 	// 3. 改变数量 
 	const changeCount = (index, delta) => {
 		const item = cartList.value[index];
 		if (item.count + delta > 0) {
 			item.count += delta;
 		} else {
 			// 教学点：如果数量小于1可以询问是否删除 
 			uni.showModal({
 				title: 'Tip',
 				content: 'Remove this item?',
 				success: (res) => {
 					if (res.confirm) cartList.value.splice(index, 1);
 				}
 			});
 		}
 	};
 	// 4. 切换选中状态 
 	const toggleCheck = (index) => {
 		cartList.value[index].checked = !cartList.value[index].checked;
 	};
 	// 5.全选购物车
 	const selectAllCart = () => {
 		const isAllChecked = cartList.value.every(item => item.checked)
 		cartList.value.forEach(item => {
 			item.checked = !isAllChecked
 		})
 	}

 	// 6. 清空购物车 
 	/* const clearCart = () => {
 		uni.showModal({
 			title: '清空购物车',
 			content: '您确定要清空购物车吗?',
 			success: (res) => {
 				if (res.confirm) cartList.value = [];
 			}
 		});
 	}; */

 	const showClearModal = ref(false);
 	const confirmClear = () => {
 		showClearModal.value = true;
 	};
 	const doClearCart = () => {
 		// 执行清空购物车逻辑
 		cartList.value = []
 		showClearModal.value = false
 	};
 	// 7. 去结算 
 	const goCheckout = () => {
 		if (totalPrice.value === 0) {
 			uni.showToast({
 				title: '请先选择菜品',
 				icon: 'none'
 			});
 			return;
 		}
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
 </style>