<template>
	<view class="edit-container">
		<!-- 1. 头像编辑区 -->
		<view class="avatar-section">
			<view class="avatar-wrapper" @click="chooseImage">
				<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				<view class="camera-badge">
					<uni-icons type="camera-filled" size="16" color="#fff"></uni-icons>
				</view>
			</view>
			<text class="change-text" @click="chooseImage">Change Photo</text>
		</view>
		<!-- 2. 信息表单区 -->
		<view class="form-section">
			<view class="form-item">
				<text class="label">User Name</text>
				<input class="input" v-model="userInfo.name" placeholder="Enter your name" />
			</view>
			<view class="form-item">
				<text class="label">Email Address</text>
				<input class="input" v-model="userInfo.email" placeholder="Enter your email" />
			</view>
			<view class="form-item">
				<text class="label">Phone</text>
				<input class="input" v-model="userInfo.phone" placeholder="Enter your phone" />
			</view>
		</view>
		<!-- 3. 保存按钮 -->
		<view class="footer">
			<button class="confirm-btn" @click="saveProfile">Confirm Changes</button>
			<text class="footer-tip">Updating your profile helps us provide a better food delivery experience.</text>
		</view>
	</view>
</template>

<script setup>
import {
	ref,
	onMounted
} from 'vue';
import store from '@/store/index.js';

const userInfo = ref({
	avatar: '',
	name: '',
	email: '',
	phone: ''
});

onMounted(() => {
	if (store.state.user) {
		// Clone user data to avoid modifying store state directly before saving
		userInfo.value = {
			avatar: store.state.user.avatar || '/static/ic_default_avatar.png',
			name: store.state.user.nickName || '',
			email: store.state.user.email || '', // Assuming email might be added to user model
			phone: store.state.user.phone || ''
		};
	}
});

const chooseImage =
	() => {
		// 教学点：调用原生相机/相册 
		uni.chooseImage({
			count: 1,
			success: (res) => {
				userInfo.value.avatar = res.tempFilePaths[0];
			}
		});
	};

const saveProfile = async () => {
	if (!store.state.isLogin) {
		uni.showToast({ title: 'Not logged in', icon: 'none' });
		return;
	}

	uni.showLoading({
		title: 'Saving...'
	});

	const updateData = {
		nickName: userInfo.value.name,
		avatar: userInfo.value.avatar,
		// phone: userInfo.value.phone // Phone usually used as ID/Account, handle carefully if mutable
		// Not updating phone/email for now as they might be login credentials
	};

	const res = await store.updateUserProfile(updateData);

	uni.hideLoading();

	if (res.success) {
		uni.showToast({
			title: 'Profile Updated',
			icon: 'success',
			success() {
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			}
		});
	} else {
		uni.showToast({
			icon: 'error',
			title: res.message || 'Update Failed'
		});
	}
};
</script>

<style lang="scss">
.edit-container {
	background-color: #fff;
	min-height: 100vh;
	padding: 40rpx 0;
}

.avatar-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 0;

	.avatar-wrapper {
		position: relative;
		width: 200rpx;
		height: 200rpx;

		.avatar {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: #f0f0f0;
		}

		.camera-badge {
			position: absolute;
			bottom: 10rpx;
			right: 10rpx;
			width: 50rpx;
			height: 50rpx;
			background: #42b983;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 4rpx solid #fff;
		}
	}

	.change-text {
		margin-top: 24rpx;
		color: #42b983;
		font-size: 28rpx;
	}
}

.form-section {
	padding: 0 40rpx;

	.form-item {
		display: flex;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		.label {
			width: 220rpx;
			font-size: 30rpx;
			color: #666;
		}

		.input {
			flex: 1;
			font-size: 30rpx;
			color: #333;
			text-align: right;
		}
	}
}

.footer {
	margin-top: 100rpx;
	padding: 0 40rpx;
	text-align: center;

	.confirm-btn {
		background: #42b983;
		color: #fff;
		border-radius: 20rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-weight: bold;
		border: none;
		margin-bottom: 30rpx;
	}

	.footer-tip {
		font-size: 24rpx;
		color: #999;
		line-height: 1.5;
		padding: 0 40rpx;
		display: block;
	}
}
</style>