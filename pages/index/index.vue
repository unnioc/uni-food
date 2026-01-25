<template>
	<view class="container">
		<!-- 1. 顶部搜索栏 -->
		<view class="search-header">
			<view class="search-bar">
				<icon type="search" size="16" color="#999" />
				<text class="placeholder">搜索你心仪的菜品...</text>
			</view>
		</view>
		<!-- 2. 轮播图区域 -->
		<swiper class="banner-swiper" indicator-dots autoplay circular indicator-active-color="#ffffff">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<image :src="item.image" mode="aspectFill" class="banner-image" />
			</swiper-item>
		</swiper>

		<!-- 3. 横向分类滑动 -->
		<!-- todo：甜品会被遮住 -->
		<scroll-view scroll-x class="category-scroll" show-scrollbar="false">
			<view v-for="(cat, index) in categories" :key="index" class="category-item"
				:class="{ active: activeCat === index }" @click="activeCat = index"> {{ cat.name }}
			</view>
		</scroll-view>

		<!-- 4. 推荐列表区域 -->
		<view class="section-title">今日推荐</view>
		<view class="food-list">
			<view v-for="(food, index) in foodList" :key="index" class="food-card">
				<image :src="food.image" mode="aspectFill" class="food-img" />
				<view class="food-info">
					<text class="food-name">{{ food.name }}</text>
					<text class="food-desc">{{ food.desc }}
					</text>
					<view class="food-bottom">
						<text class="food-price">￥{{ food.price }}</text>
						<!-- 简单的添加按钮 -->
						<view class="add-btn" @click.stop="addToCart(food)">
							<text class="plus">+</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	// 轮播图数据
	const banners = ref([{
			image: '/static/rectangle.jpg'
		},
		{
			image: '/static/rectangle.jpg'
		},
		{
			image: '/static/rectangle.jpg'
		},
	]);

	// 分类数据
	const activeCat = ref(0);
	const categories = ref(
		[{
				name: '全部'
			},
			{
				name: '披萨'
			},
			{
				name: '汉堡'
			},
			{
				name: '饮品'
			},
			{
				name: '寿司'
			},
			{
				name: '甜点'
			}
		]);

	// 菜品列表数据
	const foodList = ref([{
		name: '经典芝士披萨',
		desc: '浓郁芝士，薄脆饼底',
		price: '48',
		image: '/static/square.jpg'
	}, {
		name: '双层牛堡',
		desc: '澳洲进口牛肉，鲜嫩多汁',
		price: '32',
		image: '/static/square.jpg'
	}, {
		name: '多肉葡萄',
		desc: '新鲜葡萄，清爽芝士',
		price: '22',
		image: '/static/square.jpg'
	}]);

	const addToCart = (food) => {
		uni.showToast({
			title: `已加入购物车`,
			icon: 'success'
		});
	};
</script>

<style lang="scss">
	// 基础变量
	$primary-color: #42b983;

	.container {
		background-color: #f9f9f9;
		min-height: 100vh;
		padding-bottom: 20rpx;
	}

	// 搜索栏
	.search-header {
		padding: 20rpx 30rpx;

		.search-bar {
			background-color: #ffffff;
			height: 70rpx;
			border-radius: 35rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;

			.placeholder {
				font-size: 26rpx;
				color: #999;
				margin-left: 10rpx;
			}
		}
	}

	// 轮播图
	.banner-swiper {
		height: 300rpx;
		margin: 20rpx 30rpx;

		.banner-image {
			width: 100%;
			height: 100%;
			border-radius: 20rpx; // 柔和圆角
		}
	}

	// 分类滑动
	.category-scroll {
		white-space: nowrap;
		padding: 10rpx 30rpx;

		.category-item {
			display: inline-block;
			padding: 12rpx 35rpx;
			background-color: #fff;
			border-radius: 40rpx;
			font-size: 26rpx;
			color: #666;
			margin-right: 20rpx;


			&.active {
				background-color: $primary-color;
				color: #fff;
			}
		}
	}

	// 标题
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		padding: 30rpx;
	}

	// 菜品列表
	.food-list {
		padding: 0 30rpx;

		.food-card {
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			padding: 20rpx;
			margin-bottom: 20rpx;

			.food-img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
			}

			.food-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.food-name {
					font-size: 30rpx;
					font-weight: 500;
				}

				.food-desc {
					font-size: 24rpx;
					color: #999;
				}

				.food-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.food-price {
						color: #ff5252;
						font-size: 32rpx;
						font-weight: bold;
					}

					.add-btn {
						background-color: $primary-color;
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;

						.plus {
							color: #fff;
							font-size: 32rpx;
							margin-top: -4rpx;
						}
					}
				}
			}
		}
	}
</style>