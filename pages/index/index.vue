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

		<!-- 3. 横向推荐位 -->
		<view class="section-title">今日推荐</view>
		<scroll-view scroll-x class="recommend-scroll" show-scrollbar="false">
			<view class="recommend-list">
				<image v-for="(item, index) in recommendList" :key="index" :src="item.image" mode="aspectFill"
					class="recommend-img" @click="addToCart(item)" />
			</view>
		</scroll-view>

		<!-- 4. 横向分类滑动 -->
		<!-- todo：甜品会被遮住 -->
		<scroll-view scroll-x class="category-scroll" show-scrollbar="false">
			<view v-for="(cat, index) in categories" :key="index" class="category-item"
				:class="{ active: activeCat === index }" @click="activeCat = index"> {{ cat.name }}
			</view>
		</scroll-view>

		<view class="food-list">
			<view v-for="(food, index) in filteredFoodList" :key="index" class="food-card">
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
import { computed, onMounted } from 'vue';
import store from '@/store/index.js';

// 1. 数据绑定 (使用 Store 中的数据)
const banners = computed(() => store.state.banners);
const categories = computed(() => store.state.categories);
const recommendList = computed(() => store.state.recommendList || []);

// 3. 筛选逻辑
const filteredFoodList = computed(() => {
	const allFood = store.state.menu || [];
	const currentCat = categories.value[activeCat.value];

	if (!currentCat || currentCat.name === '全部') {
		// "全部"分类
		return allFood;
	}

	// 其他分类筛选
	return allFood.filter(item => item.categoryId == currentCat.id);
});

// 2. 初始化
onMounted(() => {
	// 每次进入尝试初始化（Store 内部可以做防抖或缓存优化，这里简单调用）
	store.init();
});

// 分类选中状态
import { ref } from 'vue';
const activeCat = ref(0);

// 3. 业务逻辑
const addToCart = (food) => {
	store.addToCart(food);
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

// 横向推荐 
.recommend-scroll {
	padding: 0 40rpx;
	margin-bottom: 50rpx;
	width: 90%;

	.recommend-list {
		display: flex;
		padding-right: 60rpx;

		.recommend-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 24rpx;
			margin-right: 24rpx;
			flex-shrink: 0;
		}
	}
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