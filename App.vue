<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 初始化本地存储
			if (!uni.getStorageSync('letters')) {
				uni.setStorageSync('letters', [])
			}
			if (!uni.getStorageSync('myLetters')) {
				uni.setStorageSync('myLetters', [])
			}
			if (!uni.getStorageSync('likedLetters')) {
				uni.setStorageSync('likedLetters', [])
			}
		}
	}
</script>

<style>
	/* 全局样式 */
	page {
		background-color: #f5f5f5;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 28rpx;
		color: #333;
	}
	
	/* 全局容器 */
	.container {
		padding: 30rpx;
	}
	
	/* 卡片样式 */
	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	/* 按钮样式 */
	.btn {
		background: #4a90e2;
		color: #fff;
		border-radius: 44rpx;
		padding: 20rpx 0;
		font-size: 30rpx;
		text-align: center;
	}
	
	.btn:active {
		opacity: 0.8;
	}
	
	.btn-primary {
		background: #4a90e2;
	}
	
	.btn-default {
		background: #f0f0f0;
		color: #666;
	}
</style>
