<template>
	<view class="page">
		<!-- 用户信息 -->
		<view class="user-info">
			<view class="avatar">🙂</view>
			<view class="nickname">匿名用户</view>
			<view class="desc">在这里记录你投递的信件</view>
		</view>
		
		<!-- 标签页 -->
		<view class="tabs">
			<view 
				class="tab-item" 
				:class="{ active: activeTab === 'my' }"
				@click="switchTab('my')"
			>
				我的信件
			</view>
			<view 
				class="tab-item" 
				:class="{ active: activeTab === 'liked' }"
				@click="switchTab('liked')"
			>
				点赞记录
			</view>
		</view>
		
		<!-- 我的信件列表 -->
		<view v-if="activeTab === 'my'" class="letter-list">
			<view v-if="myLetters.length > 0">
				<view v-for="item in myLetters" :key="item.id" class="letter-item">
					<view class="letter-card" @click="goDetail(item)">
						<view class="tag" :class="{'tag-love':item.tag==='表白','tag-complain':item.tag==='吐槽','tag-hole':item.tag==='树洞'}">{{ item.tag }}</view>
						<view class="content">{{ item.content }}</view>
						<view class="footer">
							<text class="time">{{ item.time }}</text>
							<view class="actions">
								<text class="icon">❤️ {{ item.likes }}</text>
								<text class="icon">💬 {{ item.comments }}</text>
							</view>
						</view>
					</view>
					<view class="delete-btn" @click="handleDelete(item.id)">
						删除
					</view>
				</view>
			</view>
			<view v-else class="empty">
				<text class="empty-icon">📭</text>
				<text class="empty-text">你还没有发布过信件</text>
			</view>
		</view>
		
		<!-- 点赞记录列表 -->
		<view v-if="activeTab === 'liked'" class="letter-list">
			<view v-if="likedLetters.length > 0">
				<view v-for="item in likedLetters" :key="item.id" class="letter-item">
					<view class="letter-card" @click="goDetail(item)">
						<view class="tag" :class="{'tag-love':item.tag==='表白','tag-complain':item.tag==='吐槽','tag-hole':item.tag==='树洞'}">{{ item.tag }}</view>
						<view class="content">{{ item.content }}</view>
						<view class="footer">
							<text class="time">{{ item.time }}</text>
							<view class="actions">
								<text class="icon">❤️ {{ item.likes }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="empty">
				<text class="empty-icon">💝</text>
				<text class="empty-text">你还没有点赞过信件</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getMyLetters, deleteMyLetter, getLikedRecords } from '@/utils/mock.js'

	export default {
		data() {
			return {
				activeTab: 'my',
				myLetters: [],
				likedLetters: []
			}
		},
		onShow() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.myLetters = getMyLetters()
				this.likedLetters = getLikedRecords()
			},
			switchTab(tab) {
				this.activeTab = tab
			},
			goDetail(letter) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${letter.id}`
				})
			},
			handleDelete(id) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这封信件吗？',
					success: (res) => {
						if (res.confirm) {
							deleteMyLetter(id)
							this.loadData()
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f5f5f5;
	}
	
	.user-info {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 60rpx 30rpx;
		text-align: center;
		color: #fff;
	}
	
	.avatar {
		width: 120rpx;
		height: 120rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		margin: 0 auto 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 60rpx;
	}
	
	.nickname {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	
	.desc {
		font-size: 24rpx;
		opacity: 0.8;
	}
	
	.tabs {
		display: flex;
		background: #fff;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.tab-item {
		flex: 1;
		text-align: center;
		padding: 30rpx 0;
		font-size: 28rpx;
		color: #999;
		position: relative;
	}
	
	.tab-item.active {
		color: #4a90e2;
		font-weight: bold;
	}
	
	.tab-item.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60rpx;
		height: 4rpx;
		background: #4a90e2;
		border-radius: 2rpx;
	}
	
	.letter-list {
		padding: 30rpx;
	}
	
	.letter-item {
		position: relative;
		margin-bottom: 20rpx;
	}
	
	.letter-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
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
	
	.content {
		font-size: 28rpx;
		line-height: 1.6;
		color: #333;
		margin-bottom: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
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
		gap: 20rpx;
	}
	
	.icon {
		font-size: 24rpx;
		color: #999;
	}
	
	.delete-btn {
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
		color: #ff6b6b;
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
</style>
