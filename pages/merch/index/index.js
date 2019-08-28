// pages/merch/list/index.js
var app = getApp();
var a = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page1: "",
    more: 0,
    page: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    a.get("merch/list", {}, function(data) {
      that.setData({
        list:data.result
      })
    })
  },
  searchinput: function(e) {
    let that = this;
    that.setData({
      search: e.detail.value
    })
  },
  store:function(e){
    let that = this;
    app.setCache("merchid", e.currentTarget.dataset.id)
  },
  search: function(e) {
    let that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    wx.navigateTo({
      url: '/pages/merch/merchuser/index?keyword=' + that.data.search,
    })
    // a.post("merch/list/merchuser", {
    //   "keyword": that.data.search
    // }, function(a) {
    //   wx.hideLoading();
    //   that.setData({
    //     link: a.result
    //   })
    //   var page = Math.floor(that.data.link.total * 1 / that.data.link.pagesize * 1) * 1 + 1
    //   that.setData({
    //     page1: page,
    //     page: 2
    //   })
    // })
  },
  onShareAppMessage: function () {

  }
})