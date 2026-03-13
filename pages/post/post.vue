<template>
	<view class="page">
		<!-- 输入区域 -->
		<view class="input-area">
			<textarea 
				class="content-input"
				v-model="content"
				placeholder="在这里写下你想说的话..."
				:maxlength="maxLength"
				@input="handleInput"
			/>
			<view class="word-count">
				<text :class="{ warning: content.length > maxLength - 20 }">{{ content.length }}</text>/{{ maxLength }}
			</view>
		</view>
		
		<!-- 标签选择 -->
		<view class="tag-section">
			<view class="tag-title">选择标签</view>
			<view class="tag-list">
				<view 
					v-for="tag in tags" 
					:key="tag.value"
					class="tag-item"
					:class="{ active: selectedTag === tag.value }"
					@click="selectTag(tag.value)"
				>
					{{ tag.label }}
				</view>
			</view>
		</view>
		
		<!-- 发布按钮 -->
		<view class="btn-area">
			<button class="btn-submit" :disabled="!canSubmit" @click="handleSubmit">
				发布信件
			</button>
		</view>
		
		<!-- 提示 -->
		<view class="tips">
			<text>💡 匿名投递，其他用户无法知道你的身份</text>
		</view>
	</view>
</template>

<script>
	import { addLetter, addMyLetter } from '@/utils/mock.js'

	export default {
		data() {
			return {
				content: '',
				maxLength: 300,
				selectedTag: '树洞',
				tags: [
					{ label: '表白', value: '表白' },
					{ label: '吐槽', value: '吐槽' },
					{ label: '树洞', value: '树洞' }
				]
			}
		},
		computed: {
			canSubmit() {
				return this.content.trim().length > 0 && this.content.length <= this.maxLength
			}
		},
		methods: {
			handleInput(e) {
				this.content = e.detail.value
			},
			selectTag(tag) {
				this.selectedTag = tag
			},
			handleSubmit() {
				if (!this.canSubmit) return
				
				// 获取当前时间
				const now = new Date()
				const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
				
				// 创建信件数据
				const letter = {
					content: this.content.trim(),
					tag: this.selectedTag,
					time: time
				}
				
				// 保存到本地存储（两个地方：信件列表 + 我的信件）
				addLetter(letter)
				addMyLetter(letter)
				
				// 提示成功
				uni.showToast({
					title: '发布成功',
					icon: 'success',
					duration: 1500
				})
				
				// 延迟返回首页
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f5f5f5;
		padding: 30rpx;
	}
	
	.input-area {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.content-input {
		width: 100%;
		min-height: 300rpx;
		font-size: 30rpx;
		line-height: 1.6;
		color: #333;
	}
	
	.word-count {
		text-align: right;
		font-size: 24rpx;
		color: #999;
		margin-top: 20rpx;
	}
	
	.word-count .warning {
		color: #ff6b6b;
	}
	
	.tag-section {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.tag-title {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
	}
	
	.tag-list {
		display: flex;
		gap: 20rpx;
	}
	
	.tag-item {
		padding: 16rpx 32rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
		background: #f0f0f0;
		color: #666;
		transition: all 0.2s;
	}
	
	.tag-item.active {
		background: #4a90e2;
		color: #fff;
	}
	
	.btn-area {
		margin-top: 20rpx;
	}
	
	.btn-submit {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #4a90e2;
		color: #fff;
		border-radius: 44rpx;
		font-size: 32rpx;
		border: none;
	}
	
	.btn-submit[disabled] {
		background: #ccc;
		color: #999;
	}
	
	.tips {
		text-align: center;
		margin-top: 30rpx;
		font-size: 24rpx;
		color: #999;
	}
</style>
