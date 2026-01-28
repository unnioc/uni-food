<template>
	<!-- 遮罩层，只有 visible 为 true 时显示 -->
	<view class="modal-mask" v-if="visible" @touchmove.stop.prevent>
		<view class="modal-container">
			<!-- 顶部图标（可选） -->
			<view class="modal-icon" v-if="icon">
				<view class="icon-circle" :style="{ backgroundColor: iconBg }">
					<image class="icon" :src="icon" mode=""></image>
				</view>
			</view>
			<!-- 标题 -->
			<view class="modal-title" v-if="title">{{ title }}</view>
			<!-- 内容区：使用插槽增加灵活性 -->
			<view class="modal-content">
				<slot>{{ content }}</slot>
			</view>
			<!-- 底部按钮区 -->
			<view class="modal-footer">
				<button class="btn cancel-btn" @click="handleCancel">{{ cancelText }}</button>
				<button class="btn confirm-btn" :style="{ backgroundColor: confirmColor }"
					@click="handleConfirm">{{ confirmText }}</button>
			</view>
		</view>
	</view>
</template>
<script setup>
	/** * 自定义通用弹窗组件 
	 * @property {Boolean} visible 是否显示 
	 * @property {String} title 标题 
	 * @property {String} content 内容（简单文本） 
	 * @property {String} icon 图标路径
	 * @property {String} iconBg 图标背景色 
	 * @property {String} confirmText 确认按钮文字 
	 * @property {String} confirmColor 确认按钮颜色 
	 * @property {String} cancelText 取消按钮文字 */

	const props = defineProps({
		visible: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: 'Tip'
		},
		content: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		iconBg: {
			type: String,
			default: '#e8f7f0'
		},
		confirmText: {
			type: String,
			default: 'Confirm'
		},
		confirmColor: {
			type: String,
			default: '#42b983'
		},
		cancelText: {
			type: String,
			default: 'Cancel'
		}
	});

	const emit = defineEmits(['confirm', 'cancel', 'update:visible']);
	const handleCancel = () => {
		emit('update:visible', false);
		// 关闭弹窗 
		emit('cancel');
	};
	const handleConfirm = () => {
		emit('confirm');
	};
</script>

<style lang="scss">
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}

	.modal-container {
		width: 600rpx;
		background-color: #fff;
		border-radius: 40rpx;
		padding: 60rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		animation: fadeIn 0.3s ease;
	}

	.modal-icon {
		margin-bottom: 30rpx;

		.icon-circle {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.modal-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		text-align: center;
	}

	.modal-content {
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
		text-align: center;
		margin-bottom: 60rpx;
	}

	.modal-footer {
		display: flex;
		width: 100%;
		gap: 20rpx;

		.btn {
			flex: 1;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 20rpx;
			font-size: 30rpx;
			font-weight: bold;
			border: none;

			&::after {
				border: none;
			}
		}

		.cancel-btn {
			background-color: #fff;
			color: #999;
			border: 1rpx solid #eee;
		}

		.confirm-btn {
			color: #fff;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>