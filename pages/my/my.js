// pages/my/my.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiUserInfoMap:false
  },
 //立即登录
 processLogin(e) {
  console.log(e.detail.userInfo); // 查看登录信息、
  if (!e.detail.userInfo) {
    wx.showToast({
      title: '已取消',
      icon: 'none',
    })
    return;
  }
  // 如果有userinfo ,就调用register注册方法
  this.registor();
},

//注册
registor(){
  let _this = this;
  //调用接口获取登录凭证（code）唯一标识（openid）及本次登录的会话密钥（session_key）
  wx.login({
    success: function (res) {
      let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
      wx.getUserInfo({  //获取用户信息
        success: function (res) {
          let iv = res.iv; //加密算法的初始向量
          let encryptedData = res.encryptedData; //完整用户信息的加密数据
          // 下面开始调用注册接口
            app.http.registor({  //微信小程序用户快速注册
              code: code,
              encryptedData: encryptedData,
              iv: iv
            }).then(function (res) {
              console.log(res);
              _this.login();
            })
         
        }
      })
    }
  })
},

//登陆
login(page){
  const _this = this
  wx.login({ // 获取登陆凭证 code
    success: function (res) {
         console.log(res)
        //调用登陆接口，传code
        app.http.login({code:res.code,type:2}).then(function (res) {        
          console.log(res)
          res=res.data;
          if (res.code != 0) {
            // 登录错误
            wx.showModal({
              title: '无法登录',
              content: res.msg,
              showCancel: false
            })
            return;
          }
          console.log(res)
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('uid', res.data.uid)
          
          _this.onShow()
          
        })
    }
  })
},



//获取用户详情信息
getUserApiInfo() {
  console.log(10000)
  var that = this;
  //后去用户详细信息
  app.http.userDetail({token:wx.getStorageSync('token')}).then(function (res) {
    console.log(res);
    if (res.data.code == 0) {
      // let _data = {}
      // _data.apiUserInfoMap = res.data 
      // that.setData(_data);

      that.setData({
        apiUserInfoMap:res.data.data 
      })
    }
  })
},



//退出函数
  loginOut(){
    wx.removeStorageSync('token')
    wx.removeStorageSync('uid')
    wx.reLaunch({
      url: '/pages/my/my'
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getUserApiInfo();
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