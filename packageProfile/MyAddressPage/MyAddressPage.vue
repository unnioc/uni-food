<template>
	<view class="address-container">
		<!-- 地址列表 -->
		<scroll-view scroll-y class="address-scroll">
			<view v-for="(item, index) in addressList" :key="item.id" class="address-card">
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
					<view class="action-btn delete" @click="confirmDelete(index)">
						<uni-icons type="trash" size="18" color="#ff5252"></uni-icons>
						<text class="btn-text">Delete</text>
					</view>
				</view>
			</view>
			<!-- 空列表状态（教学可选） -->
			<view v-if="addressList.length === 0" class="empty-box">
				<text>No addresses saved yet.</text>
			</view>
		</scroll-view>
		<!-- 底部新增按钮 -->
		<view class="footer-fixed">
			<button class="add-btn" @click="addAddress">
				<text class="plus">+</text>
				Add New Address </button>
		</view>

	</view>
	<!-- 自定义弹窗组件 -->
	<CustomModal :visible="showDeleteModal" title="Delete Address?"
		content="Are you sure you want to delete this address? This action cannot be undone."
		icon="/static/ic_delete.png" iconBg="#fff1f1" confirmText="Delete" confirmColor="#e34848" @confirm="doDelete"
		@cancel="showDeleteModal = false" />
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import CustomModal from '@/components/customModal.vue'

	// 1. 初始地址数据 
	const addressList = ref([{
		id: 1,
		name: 'Alex Johnson',
		phone: '012-345-6789',
		detail: '123 Culinary Avenue, Foodie District, Apartment 4B, New York, NY 10001',
		isDefault: true
	}, {
		id: 2,
		name: 'Alex Johnson',
		phone: '012-987-6543',
		detail: '456 Tech Boulevard, Silicon Tower, Suite 101, San Francisco, CA 94105',
		isDefault: false
	}]);
	// 2. 新增地址 
	const addAddress = () => {
		uni.navigateTo({
			url: '/packageProfile/AddAddressPage/AddAddressPage'
		});
	};
	// 3. 编辑地址 
	const editAddress = (item) => {
		uni.navigateTo({
			// todo:待修改跳转页面传递参数
			// url: `/pages/address-edit/address-edit?id=${item.id}`
			url: '/packageProfile/EditAddressPage/EditAddressPage'
		});
	};
	// 4. 删除确认（教学重点：二次确认与数组操作） 
	/* const confirmDelete = (index) => {
		uni.showModal({
			title: 'Delete Address?',
			content: 'Are you sure you want to delete this address? This action cannot be undone.',
			confirmColor: '#ff5252',
			cancelColor: '#999',
			success: (res) => {
				if (res.confirm) {
					addressList.value.splice(index, 1);
					uni.showToast({
						title: 'Deleted',
						icon: 'success'
					});
				}
			}
		});
	}; */

	const showDeleteModal = ref(false);
	const pendingDeleteIndex = ref(-1);
	const confirmDelete = (index) => {
		pendingDeleteIndex.value = index;
		showDeleteModal.value = true;
	};
	const doDelete = () => {
		// 执行实际删除逻辑 
		addressList.value.splice(pendingDeleteIndex.value, 1);
		showDeleteModal.value = false;
		uni.showToast({
			title: 'Deleted'
		});
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