let app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
  dId:0,// id
  bannerImg:[],// 轮播图片
  homeDetList:[],
  content:[],// 图片
  },
	//获取详情数据
	gethomeDetail(){
  app.http.homedetail(this.data.dId).then(res=>{
    // console.log(res)
    let list = res.data.data
    let content = list.content
    console.log(list)
    this.setData({
      bannerImg:list.pics,
      homeDetList:list,
      content:content
    
    })
  })
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      dId:options.id
    })

    this.gethomeDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})