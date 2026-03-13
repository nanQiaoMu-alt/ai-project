<template>
	<view class="comment-item">
		<view class="avatar">🙂</view>
		<view class="right">
			<view class="nickname">匿名用户</view>
			<view class="content">{{ comment.content }}</view>
			<view class="time">{{ comment.time }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CommentItem',
		props: {
			comment: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item {
		display: flex;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.comment-item:last-child {
		border-bottom: none;
	}
	
	.avatar {
		width: 64rpx;
		height: 64rpx;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	
	.right {
		flex: 1;
	}
	
	.nickname {
		font-size: 26rpx;
		color: #666;
		margin-bottom: 8rpx;
	}
	
	.content {
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
		margin-bottom: 8rpx;
	}
	
	.time {
		font-size: 22rpx;
		color: #999;
	}
</style>
