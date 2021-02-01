<template>
	<view>
		<view class="group">
			<view class="nav">
				<image @click="back" src="../../static/left.png" mode=""></image>
				<view class="">支付结果</view>
				<view class="" style="width: 72rpx;"></view>
			</view>
			<view class="" style="">
				<image src="../../static/suc.png" class="img" mode=""></image>
			</view>
			<view class="pay-type">支付成功</view>
			<view class="pay-des">您可使用&nbsp;&nbsp;<text style="color: #9773F1;">{{ phone }}</text>&nbsp;&nbsp;登录旺狗狗App<br/>开启宝宝的成长之旅</view>
			<view class="down-btn" @click="toDown">下载App</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: 18888888888
			}
		},
		onLoad(option) {
			this.phone = option.phone
		},
		methods: {
			toDown() {
				window.location.href = "https://www.wanggougou.cn/download.html"
			},
			back() {
				uni.navigateTo({
					url: '../index/index?classId=' + uni.getStorageSync('classId')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav{
		height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 72rpx;
			height: 72rpx;
		}
		view{
			color: #333;
			font-size: 32rpx;
		}
	}
	.img{
		width: 344rpx;
		height: 344rpx;
		margin-top: 100rpx;
	}
	.pay-type{
		font-size: 40rpx;
		color: #333;
		margin-top: 56rpx;
	}
	.pay-des{
		font-size: 28rpx;
		color: #a6a6a6;
		margin: 14px 80rpx 60rpx;
		line-height: 40rpx;
	}
	.group{
		margin: 20rpx auto;
		text-align: center;
		padding: 0 40rpx;
	}
	.down-btn{
		width: 610rpx;
		height: 100rpx;
		background: linear-gradient(180deg, #B091FF 0%, #9773F1 100%);
		box-shadow: 0px 3px 6px rgba(151, 115, 241, 0.4);
		border-radius: 50rpx;
		text-align: center;
		color: #fff;
		line-height: 100rpx;
		margin: 0 auto;
	}
	
</style>
