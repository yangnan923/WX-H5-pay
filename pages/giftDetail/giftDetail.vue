<template>
	<view style="display: flex;flex-direction: column;">
		<image class="back" @click="back" src="../../static/back.png" mode=""></image>
		<image class="img imgt" src="../../static/top.jpg" mode=""></image>
		<image class="img imgm" src="../../static/middle.jpg" mode=""></image>
		<image class="img imgb" src="../../static/bottom.jpg" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				uni.navigateTo({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style scoped>
.back{
	width: 72rpx;
	height: 72rpx;
	position: absolute;
	top: 15px;
	left: 24px;
	z-index: 9;
}
.img{
	width: 100%;
	padding: 0;
	margin: 0;
	height: auto;
}
.imgt{
	height: 1620rpx;
}
.imgm{
	height: 2222rpx;
}
.imgb{
	height: 1364rpx;
}
</style>
