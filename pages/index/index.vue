<template>
	<view class="content">
		<view class="title"></view>
		<view class="group">
			<view class="img">
				<image src="../../static/check.png" mode=""></image>
			</view>
			<view class="box">
				<input class="input" disabled type="text" v-model="schoolName" placeholder="学校"/>
			</view>
			<view class="box">
				<input class="input" type="text" v-model="formData.babyName" placeholder="请填写宝宝真实姓名"/>
			</view>
			<view class="box">
				<view class="sex-text">
					<text :class="sexSelect == 0 ? 'human-select' : 'human'" @click="changeSex(0)">男孩</text>
					<text :class="sexSelect == 1 ? 'human-select' : 'human'" @click="changeSex()">女孩</text>
				</view>
			</view>
			<view class="box">
				<view class="select">
					<picker mode="date"  @change="bindDateChange" :start="startDate" :end="endDate">
						<view v-if="formData.feteDay" class="uni-input">{{ formData.feteDay }}</view>
						<view v-else class="uni-input" style="color: #A3A5A6;padding-left: 30rpx;">请选择宝宝生日</view>
					</picker>
					<image src="../../static/down.png" mode=""></image>
				</view>
			</view>
			<view class="box">
				<input class="input" type="number" @blur="blurTest" v-model="formData.phone" maxlength="11" placeholder="请输入家长手机号"/>
			</view>
			<!-- <text class="tips">礼包购买成功后，该手机将作为App登录账号</text> -->
			<view class="box">
				<view class="verification_box">
				  <input type="number" v-model="formData.code" class="verification_input" placeholder="请输入验证码" maxlength="4"/>
				  <text  @click="showTag" class="verification_btn">{{ flag ? countDown + '秒' : "获取验证码" }}</text>
				</view>
			</view> 
			<view class="field-title">与宝贝的关系</view>
			<view class="rala">
				<view v-for="(item,index) in ralaList" :class="ralation == index ? 'ralation-select' : 'ralation'" @click="changeRala(index, item)" :key="index">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="pay-bottom">
			<view class="pay-left">
				<view class="left-top">
					<text class="text"><text style="font-size: 28rpx;">￥</text>520</text>
					<text class="detail" @click="toDetail">礼包详情</text>
					<image src="../../static/right.png" mode=""></image>
				</view>
				<view class="tips">支付成功后 开通智慧平安校园VIP</view>
			</view>
			<!-- " -->
			<view v-if="formData.code && schoolName && formData.babyName && formData.sex && formData.feteDay && formData.phone && formData.title && disabled"
					class="pay-btn" @click="getInfo">立即开通</view>
			<view v-else class="pay-btnn">立即开通</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: false,
				countDown: 60,
				ralaList: ['妈妈', '爸爸', '爷爷','奶奶','外公','外婆','亲友'],
				formData: {
					code: '',
					classId: '',
					babyName: '',
					sex: 1,
					feteDay: '',
					phone: '',
					title: '妈妈',
					wxCode: '',
				},
				schoolName: '',
				sexSelect: 0,
				ralation: 0,
				timeStamp: "",
				package: "",
				appId: "",
				paySign: "",
				partnerId: "",
				nonceStr: "",
				classId: '',
				code: null,
				disabled: true
			}
			
		},
		mounted(){
		  // 如果支持 popstate 一般移动端都支持了
		  if (window.history && window.history.pushState) {
		    // 往历史记录里面添加一条新的当前页面的url
		    history.pushState(null, null, document.URL);
		    // 给 popstate 绑定一个方法 监听页面刷新
		    window.addEventListener('popstate', this.backChange, false);//false阻止默认事件
		  }
		},
		onLoad(option) {
			uni.setStorageSync('classId', option.classId)
			this.classId = uni.getStorageSync('classId')
			this.getClassId(this.getUrlParam('classId'))
			if (this.getUrlParam('code') == null) {
				this.wxAuthor(this.getUrlParam('classId'))
			}else{
				this.code = this.getUrlParam('code')
				uni.setStorageSync("wxcode", this.code)
			}
		},
		onShow() {
			// this.getClassId(this.getUrlParam('classId'))
			// if (this.getUrlParam('code') == null) {
			// 	this.wxAuthor(this.getUrlParam('classId'))
			// }else{
			// 	this.code = this.getUrlParam('code')
			// 	uni.setStorageSync("wxcode", this.code)
			// }
		},
		methods: {
			backChange() {
			  const that = this;
			  WeixinJSBridge.call("closeWindow");
			},
			bindDateChange(e) {
				this.formData.feteDay = e.target.value
			},
			changeRala(index,item){
				this.ralation = index
				this.formData.title = item
			},
			toDetail() {
				uni.navigateTo({
					url: '../giftDetail/giftDetail'
				})
			},
			changeSex(tip) {
				if (tip == 0) {
					this.formData.sex = 2 //男
					this.sexSelect = tip
				}
				else {
					this.formData.sex = 1 //女
					this.sexSelect = 1
				} 
			},
			wxAuthor(classId) {
				const appid = "wx568afbc1ce1baf19";
				const base_url = 'http://vip.wanggougou.cn/?classId=' + classId // 前端域名
				const wx_url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid + '&redirect_uri=' + base_url +
				'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
				window.location.href = wx_url
			},
			getUrlParam(name) {
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if (r != null) {
					return unescape(r[2])
				}
				return null
			},
			async getInfo() {
				this.formData.classId = this.getUrlParam('classId')
				this.formData.wxCode = uni.getStorageSync('wxcode')
				await this.$http.post('/ruoyi-user/appuserinfo/registration', this.formData).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.timeStamp = res.data.timeStamp
						this.package = res.data.package
						this.appId = res.data.appId
						this.paySign = res.data.sign
						this.partnerId = res.data.partnerId
						this.nonceStr = res.data.nonceStr
						this.toPay()
					} else {
						uni.showToast({
							icon: 'none',
							title: res.mssage
						})
					}
				}).catch(() => {
					uni.showToast({
						icon: 'none',
						title: '请稍后再试'
					})
				})
				this.disabled = false;
				setTimeout(() => { 
					this.disabled = true;
				}, 2000);
			},
			toPay() {
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"timeStamp": this.timeStamp,
					"package": this.package,
					"appId": this.appId,
					"signType": "MD5",
					"paySign": this.paySign,
					"partnerId": this.partnerId,
					"nonceStr": this.nonceStr
				}, res => {
						WeixinJSBridge.log(res.err_msg);
						uni.showToast({
							icon: 'none',
							title: res.err_msg
						})
						// alert(res.err_code + res.err_desc + res.err_msg);
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							// res.err_msg将在用户支付成功后返回
							// ok，但并不保证它绝对可靠。
							// alert("支付成功");
							uni.navigateTo({
								url: '../payStatus/payStatus?phone=' + this.formData.phone
							})
						}
						else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							// alert("支付取消");
							uni.showToast({
								icon: 'none',
								title: '支付已取消'
							})
						}
						else {
							// alert("支付失败");
							uni.showToast({
								icon: 'none',
								title: '支付已取消'
							})
						}
					}
				);
			},
			// 获取班级
			getClassId(id) {
				uni.showLoading({
					title: '加载中...'
				})
				this.$http.get('/ruoyi-user/appuserinfo/classId?classId=' + id).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code == 0) {
						this.schoolName = res.data
					} else {
						uni.showToast({
							icon: 'none',
							title: res.mssage
						})
					}
				}).catch(() => {
					uni.showToast({
						icon: 'none',
						title: '请稍后再试'
					})
				})
			},
			// 验证电话
			blurTest() {
				if(!(/^1[3456789]\d{9}$/.test(this.formData.phone))){ 
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号',
						duration: 2000
					})
					this.formData.phone = ''
					return false; 
				} 
			},
			showTag () {
				if(this.formData.phone){
					if(this.flag == false){
						this.flag = true;
						this.getVerificationCode()
						let yan = setInterval(res=>{
						this.countDown--
							if(this.countDown == 0){
								this.countDown = 60
								clearTimeout(yan);
								this.flag = false;
								this.verificationValue = ''
							}
						},1000)
					} else {
						uni.showToast({
							icon:'none',
							title: "系统已经发出了短信验证码通知,请耐心等待! 或者 请稍后重新获取验证码"
						})
					}
				}
			},
			getVerificationCode(){
				let data = {
					type: 'FAMILY',
					phone: this.formData.phone
				}
				uni.showLoading({title: '加载中...'})
				this.$http.post('/ruoyi-user/sms/sendSms', data).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: '发送成功'
						})
					} else {
						this.flag = true;
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				}).catch(() => {
					uni.showToast({
						icon: 'none',
						title: '请稍后再试'
					})
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 21;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		computed:{
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		}
	}
</script>

<style scoped lang="scss">
	.title{
		width: 100%;
		height: 628rpx;
		background: url(../../static/title.png) no-repeat;
		background-size: 100% 100%;
	}
	.group{
		margin: 0 12px;
		background-color: #fff;
		border-radius: 28rpx;
		position: relative;
		top: -200rpx;
		padding: 0 48rpx;
		box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.1);
	}
	.img{
		width: 296rpx;
		height: 48rpx;
		padding-top: 40rpx;
		margin: 0 auto 20rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.box{
		padding-top: 40rpx;
		.input, .select{
			// padding: 36rpx 0 36rpx 52rpx;
			height: 104rpx;
			padding-left: 52rpx;
			background-color: #F6F7F9;
			border-radius: 52rpx;
			color: #333;
			font-size: 32rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.sex-text{
			// margin-left: 20rpx;
			.human,.human-select{
				display: inline-block;
				border-radius: 50rpx;
				margin-right: 20rpx;
				font-size: 28rpx;
				color: #fff;
				background: linear-gradient(180deg, #B091FF 0%, #9773F1 100%);
				box-shadow: 0px 3px 6px rgba(151, 115, 241, 0.4);
				width: 172rpx;
				height: 76rpx;
				line-height: 76rpx;
				text-align: center;
			}
			.human{
				background: #F6F7F9;
				color: #676767;
				box-shadow: inherit;
			}
		}
		.select{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 63%;
			padding-left: 0;
			image{
				width: 40rpx;
				height: 40rpx;
				padding-right: 10rpx;
			}
		}
	}
	.uni-input{
		padding-left: 20rpx;
	}
	
	.verification_box{
		background-color: #F6F7F9;
		height: 104rpx;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.verification_input{
		padding-left: 52rpx;
	}
	.verification_btn{
		width: 180rpx;
		height: 80rpx;
		background-color: #fff;
		color: #9773F1;
		font-size: 12px;
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		margin-right: 12rpx;
	}
	.field-title{
		margin: 60rpx 0 40rpx;
	}
	.rala{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		// padding-bottom: 70px;
	}
	.ralation-select, .ralation{
		width: 172rpx;
		height: 76rpx;
		background: linear-gradient(180deg, #B091FF 0%, #9773F1 100%);
		box-shadow: 0px 3px 6px rgba(151, 115, 241, 0.4);
		border-radius: 50rpx;
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		line-height: 76rpx;
		margin-bottom: 32rpx;
	}
	.ralation{
		background: #F6F7F9;
		color: #676767;
		box-shadow: inherit;
	}
	.pay-bottom{
		width: 700rpx;
		height: 128rpx;
		background-color: #fff;
		position: fixed;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 64rpx;
		box-shadow: 0px 3px 12px rgba(187, 187, 187, 0.4);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.pay-left{
		display: flex;
		flex-direction: column;
		margin-left: 60rpx;
	}
	.left-top image{
		width: 24rpx;
		height: 24rpx;
		vertical-align: middle;
	}
	.left-top{
		text{
			color: #9773F1;
			font-size: 28rpx;
		}
		.text{
			font-size: 60rpx;
		}
		.detail{
			font-size: 12px;
			margin-left: 8px;
		}
	}
	.tips{
		font-size: 12px;
		color: #333;
	}
	.pay-btn, .pay-btnn{
		width: 244rpx;
		height: 100rpx;
		background: linear-gradient(180deg, #B091FF 0%, #9773F1 100%);
		box-shadow: 0px 3px 6px rgba(151, 115, 241, 0.4);
		border-radius: 50rpx;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		line-height: 100rpx;
		margin-right: 16rpx;
	}
	.pay-btnn{
		opacity: 0.5;
	}
	/deep/.input-placeholder{
		color: #A3A5A6;
	}
</style>
