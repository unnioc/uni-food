<template>
	<view class="container">
		<!-- 表单列表 -->
		<view class="form-list">
			<view class="form-item">
				<text class="label">Recipient</text>
				<input class="input" v-model="formData.name" placeholder="Alex Johnson" />
			</view>
			<view class="form-item">
				<text class="label">Phone</text>
				<input class="input" v-model="formData.phone" placeholder="138-0000-0000" type="number" />
			</view>
			<view class="form-item">
				<text class="label">Area</text>
				<view class="picker-box" @click="chooseArea">
					<text class="picker-text">{{ formData.area || 'California, San Francisco' }}</text>
					<uni-icons type="right" size="14" color="#ccc"></uni-icons>
				</view>
			</view>
			<view class="form-item align-start">
				<text class="label">Address</text>
				<textarea class="textarea" v-model="formData.address"
					placeholder="123 Tech Avenue, Building 4, Room 201" auto-height />
			</view>
		</view>
		<!-- 设置默认地址 -->
		<view class="default-section">
			<text>Set as default address</text>
			<switch :checked="formData.isDefault" color="#42b983" @change="formData.isDefault = $event.detail.value" />
		</view>
		<!-- 底部操作 -->
		<view class="footer">
			<button class="btn-save" @click="saveAddress">Save Address</button>
			<view class="btn-delete" @click="deleteAddress">Delete Address</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const formData = ref({
		name: '',
		phone: '',
		area: '',
		address: '',
		isDefault: true
	});
	const saveAddress = () => {
		uni.showToast({
			title: 'Saved Successfully',
			icon: 'success'
		});
	};
	const deleteAddress = () => {
		uni.showModal({
			title: 'Delete?',
			content: 'Are you sure you want to delete this address?',
			success: (res) => {
				if (res.confirm) console.log('Deleted');
			}
		});
	};
</script>

<style lang="scss">
	.container {
		background-color: #f8f8f8;
		min-height: 100vh;
		padding-top: 20rpx;
	}

	.form-list {
		background-color: #fff;
		padding: 0 30rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		padding: 35rpx 0;
		border-bottom: 1rpx solid #eee;

		&.align-start {
			align-items: flex-start;
		}

		.label {
			width: 180rpx;
			font-size: 30rpx;
			color: #333;
		}

		.input,
		.picker-box,
		.textarea {
			flex: 1;
			font-size: 30rpx;
		}

		.picker-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.textarea {
			min-height: 120rpx;
		}
	}

	.default-section {
		background-color: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #333;
	}

	.footer {
		margin-top: 100rpx;
		padding: 0 40rpx;

		.btn-save {
			background-color: #42b983;
			color: #fff;
			border-radius: 50rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-weight: bold;
			margin-bottom: 40rpx;
			border: none;
		}

		.btn-delete {
			text-align: center;
			color: #999;
			font-size: 28rpx;
		}
	}
</style>