// pages/home/home.js
let app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		value: "",
		banner: [], // 轮播图片
		tip: [], // 小公告
		gridList: [], // 十宫格
		seckill: [], // 限时秒杀
		reco: [], // 爆品推荐1
		reco2: [], // 爆品推荐1
		group: [], // 全面拼团
		list: [], // 商品列表
		backTopFlag:false,
		topPosition:0

	},
	// 获取轮播图片函数
	getBanner() {
		app.http.banner().then(res => {
			// console.log(res)
			let {
				data: list
			} = res.data
			// console.log(list)
			this.setData({
				banner: list
			})
		})
	},
	// 公告
	getTip() {
		app.http.tip().then(res => {
			// console.log(res)
			let {
				dataList: list
			} = res.data.data
			// console.log(list)
			this.setData({
				tip: list
			})
		})
	},
	// 十宫格
	getGrid() {
		app.http.grid().then(res => {
			// console.log(res)
			let {
				data
			} = res.data
			// console.log(data)
			this.setData({
				gridList: data
			})
		})
	},
	// 爆款限时秒杀
	good() {
		app.http.good().then(res => {
			let {
				data
			} = res.data
			console.log(data[19])
			this.setData({
				list: data,
				seckill: data[19],
				reco: data[23],
				reco2: data[25],
				group: data[21]
			})
		})
	},
	// 公告详情
	affDetail(e) {
		// console.log(e)
		let id = e.target.dataset._id
		// console.log(id)
		// console.log(12345)

		wx.navigateTo({
			url: '/pages/affDetail/affDetail?id=' + id,

		})

	},
	// home页面进详情
	homedetail(e) {
		console.log(e)
		// console.log(e.target.dataset._did)
		let dId = e.currentTarget.dataset._did
		console.log(dId)
		// console.log(1234567)
		// 路由跳转
		wx.navigateTo({
			url:`/pages/homeDetail/homeDetail?id=${dId}`,

		})
	},
	// 首页进分类
	goClass(e){
		// console.log(e)
		let homeId = e.currentTarget.dataset.homeid
		console.log(homeId)
		wx.switchTab({
			url: "/pages/cart/cart",
		})

		// 存储点击id
		wx.setStorageSync('homeId', homeId)
	},
	// 回顶部
	backTap(){
		this.setData({
      backTopFlag: true,
      topPosition: 0
    })
	},

	// 页面滚动时
	scrollPosition(e){
		// console.log(e)
		let srollTop = e.detail.scrollTop
		if(srollTop>800){
			this.setData({
				backTopFlag:true
			})
		}else[
			this.setData({
				backTopFlag:false
			})
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getBanner()
		this.getTip()
		this.getGrid()
		this.good()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}

})
