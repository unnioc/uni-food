<template>
	<view class="container">
		<!-- 表单列表 -->
		<view class="form-list">
			<view class="form-item">
				<text class="label">收货人</text>
				<input class="input" v-model="formData.name" placeholder="填写收货人姓名" />
			</view>
			<view class="form-item">
				<text class="label">手机号</text>
				<input class="input" v-model="formData.phone" placeholder="填写电话号码" type="number" />
			</view>
			<view class="form-item">
				<text class="label">地址</text>
				<view class="picker-box" @click="chooseArea">
					<text class="picker-text">{{ formData.area || '虚拟地址' }}</text>
					<uni-icons type="right" size="14" color="#ccc"></uni-icons>
				</view>
			</view>
			<view class="form-item align-start">
				<text class="label">门牌号</text>
				<textarea class="textarea" v-model="formData.address" placeholder="填写详细地址，例：1号楼102" auto-height />
			</view>
		</view>
		<!-- 设置默认地址 -->
		<view class="default-section">
			<text>设置为默认地址</text>
			<switch :checked="formData.isDefault" color="#42b983" @change="formData.isDefault = $event.detail.value" />
		</view>
		<!-- 底部操作 -->
		<view class="footer">
			<button class="btn-save" @click="saveAddress">保存地址</button>
		</view>
	</view>
</template>

<script setup>
import {
	ref
} from 'vue';
import store from '@/store/index.js';

const formData = ref({
	name: '',
	phone: '',
	area: '',
	address: '',
	isDefault: false // Changed default to false, usually better for new adds unless specified
});

const chooseArea = () => {
	// Mock area chooser or simple placeholder action
	uni.showToast({ title: '地址选择模拟数据', icon: 'none' });
	formData.value.area = "模拟地址";
};

const saveAddress = async () => {
	if (!formData.value.name || !formData.value.phone || !formData.value.address) {
		uni.showToast({ title: '请填写所有字段', icon: 'none' });
		return;
	}

	// 手机号正则校验
	const phoneRegex = /^1[3-9]\d{9}$/;
	if (!phoneRegex.test(formData.value.phone)) {
		uni.showToast({ title: '请输入正确的手机号', icon: 'none' });
		return;
	}

	// Construct address object matching the system structure
	const addressData = {
		name: formData.value.name,
		phone: formData.value.phone,
		// Combine area and address detail if needed, or just use address as detail
		detail: (formData.value.area ? formData.value.area + ' ' : '') + formData.value.address,
		isDefault: formData.value.isDefault
	};

	const res = await store.addAddress(addressData);

	if (res.success) {
		uni.showToast({
			title: '保存成功',
			icon: 'success'
		});
		setTimeout(() => {
			uni.navigateBack();
		}, 1000);
	} else {
		uni.showToast({
			title: res.message || '保存失败，请稍后重试',
			icon: 'none'
		});
	}
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