<template>
	<view class="page">
		<!-- 顶部标题 -->
		<view class="header">
			<text class="title">匿名信箱</text>
			<text class="subtitle">在这里说出你的心里话</text>
		</view>
		
		<!-- 信件列表 -->
		<view class="letter-list">
			<LetterCard 
				v-for="item in letters" 
				:key="item.id" 
				:letter="item"
				@click="goDetail"
				@like="handleLike"
			/>
		</view>
		
		<!-- 空状态 -->
		<view v-if="letters.length === 0" class="empty">
			<text class="empty-icon">📭</text>
			<text class="empty-text">暂无信件，来发布第一封吧</text>
		</view>
		
		<!-- 加载状态 -->
		<view v-if="loading" class="loading">
			<text>加载中...</text>
		</view>
	</view>
</template>

<script>
	import LetterCard from '@/components/LetterCard.vue'
	import { getLetters, toggleLike } from '@/utils/mock.js'

	export default {
		components: {
			LetterCard
		},
		data() {
			return {
				letters: [],
				loading: false,
				page: 1,
				pageSize: 10
			}
		},
		onLoad() {
			this.loadLetters()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			loadLetters() {
				this.loading = true
				setTimeout(() => {
					this.letters = getLetters()
					this.loading = false
				}, 500)
			},
			refresh() {
				setTimeout(() => {
					this.letters = getLetters()
					uni.stopPullDownRefresh()
				}, 500)
			},
			goDetail(letter) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${letter.id}`
				})
			},
			handleLike(letter) {
				const result = toggleLike(letter.id)
				if (result.success) {
					// 更新本地数据
					const index = this.letters.findIndex(item => item.id === letter.id)
					if (index !== -1) {
						this.letters[index].isLiked = result.isLiked
						this.letters[index].likes = result.likes
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f5f5f5;
		padding: 0 30rpx;
	}
	
	.header {
		padding: 40rpx 0 30rpx;
		text-align: center;
	}
	
	.title {
		display: block;
		font-size: 44rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}
	
	.subtitle {
		font-size: 26rpx;
		color: #999;
	}
	
	.letter-list {
		padding-bottom: 30rpx;
	}
	
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;
	}
	
	.empty-icon {
		font-size: 100rpx;
		margin-bottom: 30rpx;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: #999;
	}
	
	.loading {
		text-align: center;
		padding: 30rpx;
		color: #999;
		font-size: 24rpx;
	}
</style>
