<template>
	<view class="help-container">
		<!-- 1. 搜索框 -->
		<!-- <view class="search-box">
			<view class="search-inner">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input class="input" placeholder="How can we help you?" />
			</view>
		</view> -->
		<!-- 2. 常见问题列表 -->
		<!-- <view class="section-title">COMMON QUESTIONS</view>
		<view class="faq-list">
			<view v-for="(item, index) in faqs" :key="index" class="faq-item" @click="goDetail(item)">
				<text class="faq-text">{{ item }}</text>
				<image class="icon" src="/static/ic_arrow-right.png" mode=""></image>
			</view>
		</view> -->
		<!-- 3. 客服联系区 -->
		<view class="contact-section">
			<!-- <text class="still-need">Still need help?</text> -->
			<text class="still-need">需要帮助?</text>
			<text class="desc">我们的客服全天候在线，随时为您提供帮助。</text>
			<button class="btn chat-btn" @click="contactChat">
				<uni-icons type="chatbubble-filled" size="20" color="#fff" class="btn-icon"></uni-icons>
				在线联系</button>
			<button class="btn call-btn" @click="makeCall">
				<uni-icons type="phone-filled" size="20" color="#42b983" class="btn-icon"></uni-icons>
				拨打电话</button>
		</view>
	</view>
</template>

<script setup>
const faqs = ['Order Issues', 'Payment Questions', 'Delivery Info', 'Account & Security', 'App Feedback'];
const goDetail = (url) => {
	uni.showToast({
		icon: 'none',
		title: `待实现`
	})

}

const contactChat = () => {
	uni.showToast({
		icon: 'none',
		title: `待实现`
	})
};
const makeCall = () => {
	uni.makePhoneCall({
		phoneNumber: '400-000-0000'
	});
};
</script>

<style lang="scss">
.help-container {
	background-color: #fcfcfc;
	min-height: 100vh;
}

.search-box {
	padding: 30rpx 40rpx;
	background-color: #fff;

	.search-inner {
		background: #f5f6f7;
		height: 88rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;

		.input {
			flex: 1;
			margin-left: 20rpx;
			font-size: 28rpx;
		}
	}
}

.section-title {
	padding: 40rpx 40rpx 20rpx;
	font-size: 24rpx;
	color: #999;
	letter-spacing: 2rpx;
}

.faq-list {
	background: #fff;
	padding: 0 40rpx;

	.faq-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 35rpx 0;
		border-bottom: 1rpx solid #f8f8f8;

		.faq-text {
			font-size: 30rpx;
			color: #333;
		}
	}
}

.contact-section {
	padding: 80rpx 40rpx;
	text-align: center;

	.still-need {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 20rpx;
	}

	.desc {
		font-size: 28rpx;
		color: #999;
		line-height: 1.6;
		display: block;
		margin-bottom: 60rpx;
	}

	.btn {
		height: 100rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
		border: none;

		.btn-icon {
			margin-right: 15rpx;
		}
	}

	.chat-btn {
		background: #42b983;
		color: #fff;
	}

	.call-btn {
		background: #fff;
		color: #42b983;
		border: 2rpx solid #42b983;
	}
}
</style>