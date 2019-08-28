// pages/authorize/authorize.js
var e = getApp(), r = e.requirejs("core")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      code:""
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

  //授权获取用户信息
  onGotUserInfo: function (i) {
    var n = this,
      a = e.getCache("userinfo");
    a = i.userInfo;
    if (a && !a.needauth)
      return void (t && "function" == typeof t && t(a));
    if (i.detail.errMsg == 'getUserInfo:ok') {
      wx.login({
        success: function (o) {
          if (!o.code)
            return void r.alert("获取用户登录态失败:" + o.errMsg);
          r.post("wxapp/login", {
            code: o.code
          }, function (o) {
            return o.error ? void r.alert("获取用户登录态失败:" + o.message) : o.isclose && i && "function" == typeof i ? void i(o.closetext, !0) : void r.get("wxapp/auth", {
              data: i.detail.encryptedData,
              iv: i.detail.iv,
              sessionKey: o.session_key
            }, function (res) {
              e.setCache("userinfo", res, 7200),
              wx.switchTab({
                url: '/pages/index/index',
              })
            })
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
           
})