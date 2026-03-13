// 模拟数据模块
// 用于本地存储和模拟API

// 模拟数据
const mockLetters = [
	{
		id: 1,
		content: '今天在图书馆看到一个穿白衬衫的男生认真学习的样子，心动了...希望能有机会认识他。',
		tag: '表白',
		time: '2026-03-13 10:30',
		likes: 52,
		comments: 8,
		isLiked: false
	},
	{
		id: 2,
		content: '今天又被老板骂了，明明不是我的错却要背锅。打工人的日常真的太难了，感觉自己随时都会崩溃...',
		tag: '吐槽',
		time: '2026-03-13 09:15',
		likes: 128,
		comments: 23,
		isLiked: false
	},
	{
		id: 3,
		content: '今天是我确诊抑郁症的第三个月，有时候真的觉得活着好累。但还是要坚持下去，为了爱我的人。加油吧陌生人。',
		tag: '树洞',
		time: '2026-03-12 22:45',
		likes: 356,
		comments: 67,
		isLiked: false
	},
	{
		id: 4,
		content: '暗恋了三年的女神终于主动找我聊天了！虽然只是问作业问题，但足以让我开心一整天！',
		tag: '表白',
		time: '2026-03-12 18:20',
		likes: 89,
		comments: 15,
		isLiked: false
	},
	{
		id: 5,
		content: '室友又双叒叕在深夜外放抖音了，说了多少次都不听。这种人是怎么考上大学的？',
		tag: '吐槽',
		time: '2026-03-12 14:00',
		likes: 234,
		comments: 45,
		isLiked: false
	},
	{
		id: 6,
		content: '今天把藏了五年的秘密告诉了最好的朋友，感觉轻松多了。有时候倾诉真的能释放压力。',
		tag: '树洞',
		time: '2026-03-11 20:30',
		likes: 67,
		comments: 12,
		isLiked: false
	}
]

const mockComments = {
	1: [
		{ id: 1, letterId: 1, content: '加油！缘分到了自然会相遇~', time: '2026-03-13 10:45' },
		{ id: 2, letterId: 1, content: '勇敢一点，主动搭话呗', time: '2026-03-13 11:00' },
		{ id: 3, letterId: 1, content: '图书馆白衬衫也太戳了吧！', time: '2026-03-13 11:20' }
	],
	2: [
		{ id: 4, letterId: 2, content: '抱抱，打工人加油！', time: '2026-03-13 09:30' },
		{ id: 5, letterId: 2, content: '这种老板最烦了，支持你', time: '2026-03-13 09:45' }
	],
	3: [
		{ id: 6, letterId: 3, content: '陌生人加油！你值得被爱', time: '2026-03-12 23:00' },
		{ id: 7, letterId: 3, content: '坚持就是胜利，一切都会好起来的', time: '2026-03-12 23:15' },
		{ id: 8, letterId: 3, content: '会好起来的！', time: '2026-03-13 08:00' }
	]
}

// 获取信件列表
export function getLetters() {
	const localLetters = uni.getStorageSync('letters') || []
	// 合并模拟数据和本地数据
	return [...mockLetters, ...localLetters].sort((a, b) => {
		return new Date(b.time) - new Date(a.time)
	})
}

// 获取单个信件
export function getLetterById(id) {
	const letters = getLetters()
	return letters.find(item => item.id === Number(id))
}

// 获取评论列表
export function getComments(letterId) {
	return mockComments[Number(letterId)] || []
}

// 添加信件
export function addLetter(letter) {
	const localLetters = uni.getStorageSync('letters') || []
	const newLetter = {
		id: Date.now(),
		...letter,
		likes: 0,
		comments: 0,
		isLiked: false
	}
	localLetters.unshift(newLetter)
	uni.setStorageSync('letters', localLetters)
	return newLetter
}

// 点赞/取消点赞
export function toggleLike(letterId) {
	const localLetters = uni.getStorageSync('letters') || []
	const likedLetters = uni.getStorageSync('likedLetters') || []
	
	const letter = localLetters.find(item => item.id === Number(letterId))
	if (letter) {
		const isLiked = likedLetters.includes(Number(letterId))
		if (isLiked) {
			letter.likes--
			uni.setStorageSync('likedLetters', likedLetters.filter(id => id !== Number(letterId)))
		} else {
			letter.likes++
			likedLetters.push(Number(letterId))
			uni.setStorageSync('likedLetters', likedLetters)
		}
		uni.setStorageSync('letters', localLetters)
		return { success: true, isLiked: !isLiked, likes: letter.likes }
	}
	return { success: false }
}

// 获取我的信件
export function getMyLetters() {
	const localLetters = uni.getStorageSync('myLetters') || []
	return localLetters.sort((a, b) => new Date(b.time) - new Date(a.time))
}

// 添加我的信件
export function addMyLetter(letter) {
	const myLetters = uni.getStorageSync('myLetters') || []
	const newLetter = {
		id: Date.now(),
		...letter,
		likes: 0,
		comments: 0,
		isLiked: false
	}
	myLetters.unshift(newLetter)
	uni.setStorageSync('myLetters', myLetters)
	return newLetter
}

// 删除我的信件
export function deleteMyLetter(letterId) {
	const myLetters = uni.getStorageSync('myLetters') || []
	const filtered = myLetters.filter(item => item.id !== Number(letterId))
	uni.setStorageSync('myLetters', filtered)
	return { success: true }
}

// 获取点赞记录
export function getLikedRecords() {
	const likedIds = uni.getStorageSync('likedLetters') || []
	const myLetters = uni.getStorageSync('myLetters') || []
	const likedLetters = myLetters.filter(item => likedIds.includes(item.id))
	return likedLetters
}

export default {
	getLetters,
	getLetterById,
	getComments,
	addLetter,
	toggleLike,
	getMyLetters,
	addMyLetter,
	deleteMyLetter,
	getLikedRecords
}
