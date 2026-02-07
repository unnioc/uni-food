<template>
	<view class="edit-container">
		<!-- 1. 表单区域 -->
		<view class="form-box">
			<view class="form-item">
				<text class="label">Recipient Name</text>
				<input class="input" type="text" v-model="formData.name" placeholder="Enter full name"
					placeholder-class="placeholder" />
			</view>
			<view class="form-item">
				<text class="label">Phone Number</text>
				<input class="input" type="number" v-model="formData.phone" placeholder="Enter mobile number"
					placeholder-class="placeholder" />
			</view>
			<view class="form-item">
				<text class="label">Detailed Address</text>
				<textarea class="textarea" v-model="formData.detail" placeholder="Enter street name, building, room number..."
					placeholder-class="placeholder" auto-height />
			</view>
			<!-- 2. 设置默认地址开关 -->
			<view class="form-item switch-item">
				<text class="label">Set as Default Address</text>
				<switch :checked="formData.isDefault" color="#42b983" @change="onSwitchChange" />
			</view>
		</view>
		<!-- 3. 保存按钮 -->
		<view class="footer-btn">
			<button class="save-btn" @click="handleSave">Save Address</button>
		</view>
	</view>
</template>

<script setup>
import {
	ref
} from 'vue';
import {
	onLoad
} from '@dcloudio/uni-app';
import store from '@/store/index.js';

// 表单响应式数据 
const formData = ref({
	id: null,
	name: '',
	phone: '',
	detail: '',
	isDefault: false
});

onLoad((options) => {
	if (options.item) {
		try {
			const item = JSON.parse(decodeURIComponent(options.item));
			formData.value = {
				id: item.id,
				name: item.name,
				phone: item.phone,
				detail: item.detail,
				isDefault: item.isDefault || false
			};
			uni.setNavigationBarTitle({
				title: 'Edit Address'
			});
		} catch (e) {
			console.error('Parse address item failed', e);
		}
	}
});

const onSwitchChange = (e) => {
	formData.value.isDefault = e.detail.value;
};

const handleSave = async () => {
	if (!formData.value.name || !formData.value.phone || !formData.value.detail) {
		uni.showToast({
			title: 'Please complete all fields',
			icon: 'none'
		});
		return;
	}
	uni.showLoading({
		title: 'Saving...'
	});

	const res = await store.updateAddress(formData.value);

	uni.hideLoading();

	if (res.success) {
		uni.showToast({
			title: 'Updated',
			icon: 'success',
			success: () => {
				// 成功后返回上一页 
				setTimeout(() => uni.navigateBack(), 1500);
			}
		});
	} else {
		uni.showToast({
			title: res.message || 'Update Failed',
			icon: 'none'
		});
	}
};
</script>

<style lang="scss">
$primary-color: #42b983;

.edit-container {
	background-color: #ffffff;
	min-height: 100vh;
	padding: 40rpx;
}

.form-box {
	.form-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 50rpx;

		.label {
			font-size: 24rpx;
			color: #999;
			font-weight: bold;
			text-transform: uppercase;
			letter-spacing: 2rpx;
			margin-bottom: 20rpx;
		}

		.input {
			height: 80rpx;
			font-size: 32rpx;
			color: #333;
			border-bottom: 2rpx solid #f0f0f0;
			padding-bottom: 10rpx;
		}

		.textarea {
			width: 100%;
			min-height: 120rpx;
			font-size: 32rpx;
			color: #333;
			border-bottom: 2rpx solid #f0f0f0;
			padding: 10rpx 0;
			line-height: 1.6;
		}

		.placeholder {
			color: #ccc;
			font-size: 30rpx;
		}

		&.switch-item {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-top: 40rpx;
			padding-top: 30rpx;
			border-top: 1rpx solid #f8f8f8;

			.label {
				margin-bottom: 0;
			}
		}
	}
}

.footer-btn {
	margin-top: 100rpx;

	.save-btn {
		background-color: $primary-color;
		color: #ffffff;
		border-radius: 20rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: bold;
		border: none;

		&::after {
			border: none;
		}

		&:active {
			opacity: 0.9;
		}
	}
}
</style>