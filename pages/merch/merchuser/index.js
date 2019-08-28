// pages/merch/merchuser/index.js
var app = getApp();
var a = app.requirejs('core');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    more: 0,
    page:1,
    cateid: 0,
    range:2000,
    keyword: "",
    sorttype: 0,
    name:"附近",
    cate: "全部分类",
    sort: "智能排序"
  },
  store: function (e) {
    let that = this;
    app.setCache("merchid", e.currentTarget.dataset.id)
  },
  // 搜索内容
  searchinput: function (e) {
    var  that = this;
    that.setData({
      keyword: e.detail.value
    })
    wx.showLoading({
      title: '加载中...',
    })
    var param = {
      page: that.data.page,
      keyword: e.detail.value,
      cateid: that.data.cateid,
      lat: that.data.lat,
      lng: that.data.lng,
      range: that.data.range,
      sorttype: that.data.sorttype,
    }
    that.http1(param)
  },
  // 电话
  iphone: function (e) {
    a.phone(e)
  },
  // 点击附近
  tapstyle: function(e) {
    if (this.data.num == 1) {
      this.setData({
        num: 0
      })
      return;
    }
    this.setData({
      num: e.target.dataset.num
    })
  },
  // 点击背景
  bg: function(e) {
    this.setData({
      num: e.target.dataset.num
    })
  },
  // 点击分类
  taparea: function(e) {
    if (this.data.num == 2) {
      this.setData({
        num: 0
      })
      return;
    }
    this.setData({
      num: e.target.dataset.num
    })
  },
  // 点击排序
  tapsort: function(e) {
    if (this.data.num == 3) {
      this.setData({
        num: 0
      })
      return;
    }
    this.setData({
      num: e.target.dataset.num
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.catename) that.setData({
      cate: options.catename
    });
    if (options.cateid)  that.setData({
      cateid: options.cateid
    })
    ;
    else if (that.data.keyword)  that.setData({
      keyword: that.data.keyword
    });
    a.get("merch/list/merchuser", { cateid: options.cateid}, function(data) {
     
      that.setData({
        list: data.result
      })
    })
    // var num 
    var id = options.id
    var index = options.index
    wx.showLoading({
      title: '加载中...',
    })
    that.location()
   
  },
  // 获取用户经纬度
  location:function(e){
    var that = this
     // 用户经纬度
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude
        var param = {
          page: 1,
          keyword: that.data.keyword,
          cateid: that.data.cateid,
          lat: latitude,
          lng: longitude,
          range: 2000,
          sorttype: 0,
        }
        that.http1(param)
        that.setData({
          lat: latitude,
          lng: longitude
        })
      },
    })
  },
  // 点击商家分类
  cate:function(e){
    var that = this;
   var cateid=e.currentTarget.dataset.cateid;
    var param = {
      page: that.data.page,
      keyword: that.data.keyword,
      cateid: cateid,
      lat: that.data.lat,
      lng: that.data.lng,
      range: that.data.range,
      sorttype: that.data.sorttype,
    }
    this.http1(param)
    this.setData({
      num: 0,
      cate: e.currentTarget.dataset.cate,
      cateid: e.currentTarget.dataset.cateid
    })
  },
  // 点击距离
  range(e){
    var that = this;
    var  range=e.currentTarget.dataset.range;
    var param = {
      page: that.data.page,
      keyword: that.data.keyword,
      cateid: that.data.cateid,
      lat: that.data.lat,
      lng: that.data.lng,
      range: range,
      sorttype: that.data.sorttype,
    }
    this.http1(param)
    this.setData({
      num: 0,
      name: e.currentTarget.dataset.name,
      range: e.currentTarget.dataset.range
    })
  },
    // 点击排序
  sorttype:function(e){
    var that = this;
    var sorttype=e.currentTarget.dataset.sorttype;
    var param = {
      page: that.data.page,
      keyword: that.data.keyword,
      cateid: that.data.cateid,
      lat: that.data.lat,
      lng: that.data.lng,
      range: that.data.range,
      sorttype: sorttype,
    } 
    this.http1(param)
    this.setData({
      num: 0,
      sort: e.currentTarget.dataset.sort,
      sorttype: sorttype
    })
  },
  // 请求
  http1(z) {
    var that = this
    a.get("merch/list/ajaxmerchuser", z, function(data) {
      wx.hideLoading();
      that.setData({
        link: data.result
      })
     that.page(data.result.total,data.result.pagesize)
    })
  },
  // 加载更多
  moreinfo: function(e) {
    var that = this
    var page1 = (that.data.page1) * 1 + 1
    var page = ++that.data.page
    var param = {
      page: page,
      keyword: that.data.keyword,
      cateid: that.data.cateid,
      lat: that.data.lat,
      lng: that.data.lng,
      range: that.data.range,
      sorttype: that.data.sorttype,
    }
    if (page < page1 ) {
      wx.showLoading({
        title: '加载中...',
      })
      a.get("merch/merch/ajaxmerchuser", params, function(data) {
        wx.hideLoading();
        var concat = (that.data.link.list).concat(data.result.list)
        that.setData({
          "link.list": concat
        })
      })
    } else {
      that.setData({
        more: 1
      })
    }
  },
  // 加载page
  page: function (a, b) {
    var page = Math.floor(a * 1 / b * 1) * 1 + 1
    this.setData({
      page1: page,
      page: 1
    })
    if (this.data.page > page || this.data.page == page) {
      this.setData({
        more: 1
      })
    } else {
      this.setData({
        more: 0
      })
    }
  },
  onShareAppMessage: function () {

  }

})