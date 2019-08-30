// pages/member/detailRecords/index.js
var e = getApp(), r = e.requirejs("core"), t = e.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    width: '',
    lists: [],
    page: 1,
    totalpage: '',
    scrollend: false,
    bigbg: false,
    imgPic: '',
  },
  scroll: function (e) {
    // console.log(e)
  },
  lower: function (e) {
    // console.log(e)
    // console.log('到底了');
    // console.log(this.data.page)
    let num = this.data.page;
    let page = num + 1;
    // console.log(page)
    if (this.data.totalpage > page*10) {
      this.scrollPages(page);
    } else {
      this.setData({
        scrollend: true
      })
    }

  },
  scrollPages(page) {
    let that = this;
    let data = e.getCache("userinfo");
    r.post("sign/getRecords", {
      "openid": data.openid,
      "page": page,
    }, function (r) {
      // console.log(r)
      if (r.error == 0) {
        let lists = that.data.lists.concat(r.list);
        // console.log(lists)
        that.setData({
          lists: lists,
          totalpage: r.total
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.scrollPages(1);
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    console.log(this.data.height);
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