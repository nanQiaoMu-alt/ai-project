<template>
	<view class="letter-card" @click="goDetail">
		<!-- 标签 -->
		<view class="tag" :class="tagClass">{{ letter.tag }}</view>
		
		<!-- 内容 -->
		<view class="content">{{ letter.content }}</view>
		
		<!-- 底部信息 -->
		<view class="footer">
			<text class="time">{{ letter.time }}</text>
			<view class="actions">
				<view class="action-item" @click.stop="handleLike">
					<text class="icon" :class="{ active: letter.isLiked }">❤️</text>
					<text class="count">{{ letter.likes }}</text>
				</view>
				<view class="action-item">
					<text class="icon">💬</text>
					<text class="count">{{ letter.comments }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'LetterCard',
		props: {
			letter: {
				type: Object,
				required: true
			}
		},
		computed: {
			tagClass() {
				const tagMap = {
					'表白': 'tag-love',
					'吐槽': 'tag-complain',
					'树洞': 'tag-hole'
				}
				return tagMap[this.letter.tag] || 'tag-default'
			}
		},
		methods: {
			goDetail() {
				this.$emit('click', this.letter)
			},
			handleLike() {
				this.$emit('like', this.letter)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.letter-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.tag {
		display: inline-block;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		font-size: 22rpx;
		margin-bottom: 16rpx;
	}
	
	.tag-love {
		background: #fff0f0;
		color: #ff6b6b;
	}
	
	.tag-complain {
		background: #fff8e6;
		color: #ffa502;
	}
	
	.tag-hole {
		background: #e8f8f0;
		color: #2ed573;
	}
	
	.tag-default {
		background: #f0f0f0;
		color: #666;
	}
	
	.content {
		font-size: 28rpx;
		line-height: 1.6;
		color: #333;
		margin-bottom: 20rpx;
		// 超过3行显示省略号
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	
	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.time {
		font-size: 24rpx;
		color: #999;
	}
	
	.actions {
		display: flex;
		gap: 30rpx;
	}
	
	.action-item {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.icon {
		font-size: 28rpx;
	}
	
	.icon.active {
		transform: scale(1.1);
	}
	
	.count {
		font-size: 24rpx;
		color: #999;
	}
</style>
