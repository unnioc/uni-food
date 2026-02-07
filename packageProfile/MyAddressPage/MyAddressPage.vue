<template>
	<view class="address-container">
		<!-- 地址列表 -->
		<scroll-view scroll-y class="address-scroll">
			<view v-for="(item, index) in addressList" :key="item.id" class="address-card" @click="selectAddress(item)">
				<view class="card-top">
					<view class="user-info">
						<text class="user-name">{{ item.name }}</text>
						<text v-if="item.isDefault" class="default-tag">DEFAULT</text>
					</view>
					<text class="user-phone">{{ item.phone }}</text>
				</view>
				<view class="address-detail"> {{ item.detail }} </view>
				<!-- 操作栏 -->
				<view class="card-actions">
					<view class="action-btn" @click="editAddress(item)">
						<uni-icons type="compose" size="18" color="#666"></uni-icons>
						<text class="btn-text">Edit</text>
					</view>
					<view class="action-btn delete" @click="confirmDelete(item.id)">
						<uni-icons type="trash" size="18" color="#ff5252"></uni-icons>
						<text class="btn-text">Delete</text>
					</view>
				</view>
			</view>
			<!-- 空列表状态（教学可选） -->
			<view v-if="addressList.length === 0" class="empty-box">
				<text>暂无收货地址，先去添加一个吧~</text>
			</view>
		</scroll-view>
		<!-- 底部新增按钮 -->
		<view class="footer-fixed">
			<button class="add-btn" @click="addAddress">
				<text class="plus">+</text>
				添加地址</button>
		</view>

	</view>
	<!-- 自定义弹窗组件 -->
	<CustomModal :visible="showDeleteModal" title="Delete Address?"
		content="Are you sure you want to delete this address? This action cannot be undone." icon="/static/ic_delete.png"
		iconBg="#fff1f1" confirmText="Delete" confirmColor="#e34848" @confirm="doDelete"
		@cancel="showDeleteModal = false" />
</template>

<script setup>
import {
	ref,
	computed
} from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import store from '@/store/index.js';
import CustomModal from '@/components/customModal.vue'

// 0. 页面参数
const source = ref('');

onLoad((options) => {
	if (options.source) {
		source.value = options.source;
	}
});

// 1. 真实地址数据 
const addressList = computed(() => store.state.user?.addresses || []);

// 选址逻辑
const selectAddress = (item) => {
	if (source.value === 'checkout') {
		uni.$emit('selectAddressForOrder', item);
		uni.navigateBack();
	}
}

// 2. 新增地址 
const addAddress = () => {
	uni.navigateTo({
		url: '/packageProfile/AddAddressPage/AddAddressPage'
	});
};
// 3. 编辑地址 
const editAddress = (item) => {
	// 传递对象字符串，简单快捷
	const itemStr = encodeURIComponent(JSON.stringify(item));
	uni.navigateTo({
		url: `/packageProfile/EditAddressPage/EditAddressPage?item=${itemStr}`
	});
};

const showDeleteModal = ref(false);
const pendingDeleteId = ref(null);

const confirmDelete = (id) => {
	pendingDeleteId.value = id;
	showDeleteModal.value = true;
};

const doDelete = async () => {
	if (pendingDeleteId.value === null) return;

	const res = await store.deleteAddress(pendingDeleteId.value);
	if (res.success) {
		showDeleteModal.value = false;
		uni.showToast({
			title: 'Deleted'
		});
	} else {
		uni.showToast({
			title: 'Delete Failed',
			icon: 'error'
		});
	}
};
</script>
<style lang="scss">
$primary-color: #42b983;

.address-container {
	background-color: #fcfcfc;
	min-height: 100vh;
}

.address-scroll {
	padding: 30rpx;
	box-sizing: border-box;
	padding-bottom: 180rpx; // 为底部按钮留出空间 
}

// 地址卡片 
.address-card {
	background-color: #ffffff;
	border-radius: 24rpx;
	padding: 40rpx;
	margin-bottom: 30rpx;
	border: 1rpx solid #efefef;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;

		.user-info {
			display: flex;
			align-items: center;

			.user-name {
				font-size: 34rpx;
				font-weight: bold;
				color: #333;
			}

			.default-tag {
				font-size: 20rpx;
				background-color: #e8f7f0;
				color: $primary-color;
				padding: 4rpx 12rpx;
				border-radius: 8rpx;
				margin-left: 15rpx;
				font-weight: bold;
			}
		}

		.user-phone {
			font-size: 28rpx;
			color: #999;
		}
	}

	.address-detail {
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
		margin-bottom: 40rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}

	.card-actions {
		display: flex;
		justify-content: flex-end;

		.action-btn {
			display: flex;
			align-items: center;
			margin-left: 40rpx;

			.btn-text {
				font-size: 28rpx;
				color: #666;
				margin-left: 8rpx;
			}

			&.delete .btn-text {
				color: #ff5252;
			}

			&:active {
				opacity: 0.6;
			}
		}
	}
}

// 底部固定按钮 
.footer-fixed {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 30rpx 40rpx;
	padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
	background-color: #fff;
	box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.03);

	.add-btn {
		background-color: $primary-color;
		color: #ffffff;
		border-radius: 50rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;

		.plus {
			font-size: 40rpx;
			margin-right: 15rpx;
			margin-top: -4rpx;
		}

		&::after {
			border: none;
		}
	}
}

.empty-box {
	padding-top: 200rpx;
	text-align: center;
	color: #999;
	font-size: 28rpx;
}
</style>