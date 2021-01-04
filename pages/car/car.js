// pages/car/car.js
let app = getApp()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true, //  
    carList: [], //购物车数据
    num:0,
  },

  // 获取接口数据
  getCar() {
    let token = wx.getStorageSync('token')
    // console.log(token)
    app.http.readCar(token).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        let {
          items: list
        } = res.data.data
        // console.log(list)
        this.setData({
          carList: list,
          flag: true,
          
        })
      }
      if (res.data.code == 700) {
        this.setData({
          flag: false
        })
      }


    })
  },
  // 删除按钮
  delCar(e) {
    console.log(e)
    let key = e.currentTarget.dataset.key
    console.log(key)

    let token = wx.getStorageSync('token')
    this.delcar(token,key)
  },
// 删除接口
delcar(token,key){
  app.http.removeCar(token, key).then(res => {
    console.log(res)
    wx.reLaunch({
      url: '/pages/car/car',
    })
  })
},
  onChange(e){
    console.log(e)
    // 获取数量
    let num = e.detail
    // 获取key
    let key = e.currentTarget.dataset.key
    // console.log(key)
    // 获取token
    let token = wx.getStorageSync('token')
    app.http.carNum(key,token,num).then(res=>{
      // console.log(res)
   
    })
  },
  jian(e){
    // console.log(1234567)
    let that = this
    Dialog.confirm({
      message: '确定要删除该商品',
    })
      .then(() => {
    that.delCar(e)

      })
      .catch(() => {
        // on cancel
      });

  },
  // 计算价格
  count(){
    var num = 0
    this.data.carList.forEach(item=>{
      num += (item.number-0)*(item.price)
      // console.log(item)
    })
    console.log(this.data.carList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCar()
    this.count()
    console.log(this.data.carList)

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
    this.getCar()
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