// pages/cart/cart.js
let app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast.js';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0, // tabs高亮
    leftList: [], // 左侧栏
    cartId: 0, //id
    cartlist: [], //右侧数据
    rightflag: false, // 右侧是否有内容
  },
  // 调用左侧菜单栏
  getCartLeft() {
    app.http.cartleft().then(res => {
      // console.log(res)
      let {
        data: list
      } = res.data
      // console.log(list)
      this.setData({
        leftList: list
      })
    })
  },
  // 调用右侧内容
  getCartRight() {
    app.http.cartright(this.data.cartId).then(res => {
      // console.log(res)
      let {
        data: list
      } = res.data
      // console.log(list)
      if (list === undefined) {
        this.setData({
          rightflag: true,
        })
      } else {
        this.setData({
          rightflag: false,
          cartlist: list
        })
      }

    })
  },

  // 左侧改变时
  getLeftId(e) {
    // console.log(e)
    // console.log(e.target.dataset._id)
    this.setData({
      cartId: e.target.dataset._id
    })
    this.getCartRight()
  },
  // 加入购物车
  joinCar(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    // 获取token
    let token = wx.getStorageSync('token')

    // 判断token是否过期
    app.http.tokenTimeliness(token).then(res => {
      // console.log(res)
      if (res.data.code != 0) {
        Dialog.confirm({
            message: '需要登陆后才能继续操作',
            confirmButtonText: "立即登录",
            cancelButtonText: "暂不登录"
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
        return false

      } else {
        // 调用接口添加
        app.http.joinCar(token, id).then(res => {
          console.log(res)
        })
        Toast.success('加入购车成功');

      }
    })



  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = wx.getStorageSync('homeId')
    // console.log(id)
    this.setData({
      cartId: id
    })

    this.getCartLeft()
    this.getCartRight()
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

    let id = wx.getStorageSync('homeId')
    // console.log(id)
    this.setData({
      cartId: id
    })
    this.getCartLeft()
    this.getCartRight()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {


    this.getCartLeft()
    this.getCartRight()
    this.setData({
      cartId: 0
    })

    wx.removeStorageSync('homeId')


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