<template>
	<view class="page">
		<!-- 信件内容 -->
		<view class="letter-content card">
			<view class="tag" :class="tagClass">{{ letter.tag }}</view>
			<view class="content">{{ letter.content }}</view>
			<view class="footer">
				<text class="time">{{ letter.time }}</text>
				<view class="actions">
					<view class="action-item" @click="handleLike">
						<text class="icon">{{ letter.isLiked ? '❤️' : '🤍' }}</text>
						<text class="count">{{ letter.likes }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 评论区域 -->
		<view class="comments-section">
			<view class="section-title">评论 ({{ comments.length }})</view>
			
			<!-- 评论列表 -->
			<view v-if="comments.length > 0" class="comments-list">
				<CommentItem 
					v-for="item in comments" 
					:key="item.id" 
					:comment="item"
				/>
			</view>
			
			<!-- 空评论 -->
			<view v-else class="empty-comments">
				<text>暂无评论，快来抢沙发吧~</text>
			</view>
		</view>
		
		<!-- 评论输入框 -->
		<view class="comment-input-area">
			<input 
				class="comment-input"
				v-model="commentContent"
				placeholder="说点什么..."
				:maxlength="100"
			/>
			<button 
				class="send-btn" 
				:disabled="!commentContent.trim()"
				@click="submitComment"
			>
				发送
			</button>
		</view>
	</view>
</template>

<script>
	import CommentItem from '@/components/CommentItem.vue'
	import { getLetterById, getComments, toggleLike } from '@/utils/mock.js'

	export default {
		components: {
			CommentItem
		},
		data() {
			return {
				letterId: null,
				letter: {},
				comments: [],
				commentContent: ''
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
		onLoad(options) {
			this.letterId = options.id
			this.loadLetter()
			this.loadComments()
		},
		methods: {
			loadLetter() {
				const letter = getLetterById(this.letterId)
				if (letter) {
					this.letter = letter
				} else {
					// 如果本地没找到，使用默认数据
					this.letter = {
						id: this.letterId,
						content: '信件内容不存在或已被删除',
						tag: '树洞',
						time: '',
						likes: 0,
						comments: 0,
						isLiked: false
					}
				}
			},
			loadComments() {
				this.comments = getComments(this.letterId)
			},
			handleLike() {
				const result = toggleLike(this.letterId)
				if (result.success) {
					this.letter.isLiked = result.isLiked
					this.letter.likes = result.likes
				}
			},
			submitComment() {
				if (!this.commentContent.trim()) return
				
				const now = new Date()
				const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
				
				// 添加评论（本地模拟）
				const newComment = {
					id: Date.now(),
					letterId: Number(this.letterId),
					content: this.commentContent.trim(),
					time: time
				}
				
				this.comments.push(newComment)
				this.letter.comments = this.comments.length
				this.commentContent = ''
				
				uni.showToast({
					title: '评论成功',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f5f5f5;
		padding: 30rpx;
		padding-bottom: 150rpx;
	}
	
	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.letter-content {
		margin-bottom: 30rpx;
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
		font-size: 30rpx;
		line-height: 1.8;
		color: #333;
		margin-bottom: 30rpx;
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
		font-size: 32rpx;
	}
	
	.count {
		font-size: 26rpx;
		color: #999;
	}
	
	.comments-section {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.comments-list {
		margin-bottom: 20rpx;
	}
	
	.empty-comments {
		text-align: center;
		padding: 40rpx;
		color: #999;
		font-size: 26rpx;
	}
	
	.comment-input-area {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		gap: 20rpx;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.comment-input {
		flex: 1;
		height: 70rpx;
		background: #f5f5f5;
		border-radius: 35rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
	}
	
	.send-btn {
		width: 120rpx;
		height: 70rpx;
		line-height: 70rpx;
		background: #4a90e2;
		color: #fff;
		border-radius: 35rpx;
		font-size: 26rpx;
		padding: 0;
	}
	
	.send-btn[disabled] {
		background: #ccc;
		color: #999;
	}
</style>
