// pages/merch/index/index.js
var app = getApp();
var a = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
     indicatorDotsHot: !1,
    autoplayHot: !0,
    intervalHot: 5e3,
    durationHOt: 1e3,
    circularHot: !0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.merchid) {
      that.setData({
        id: options.merchid
      })
      that.getinfo(options.merchid)
    }
  },
  getinfo(merchid) {
    var that = this
    a.get("merch", {
      merchid: merchid
    }, function(data) {
      that.setData({
        list: data.result.index_cache
      })
      let obj = data.result.index_cache._sorts
      var keysort = []

      for (let i in obj) {
        keysort.push(obj[i].name)
      }
      if (keysort.length == 1) {
        that.setData({
          one: keysort[0]
        })
      } else if (keysort.length == 2) {
        that.setData({
          one: keysort[0],
          two: keysort[1]
        })
      } else if (keysort.length == 3) {
        that.setData({
          one: keysort[0],
          two: keysort[1],
          three: keysort[2],
        })
      } else if (keysort.length == 4) {
        that.setData({
          one: keysort[0],
          two: keysort[1],
          three: keysort[2],
          four: keysort[3]
        })
      } else if (keysort.length == 5) {
        that.setData({
          one: keysort[0],
          two: keysort[1],
          three: keysort[2],
          four: keysort[3],
          five: keysort[4]
        })
      } else if (keysort.length == 6) {
        that.setData({
          one: keysort[0],
          two: keysort[1],
          three: keysort[2],
          four: keysort[3],
          five: keysort[4],
          six: keysort[5]
        })
      } else if (keysort.length == 7) {
        that.setData({
          one: keysort[0],
          two: keysort[1],
          three: keysort[2],
          four: keysort[3],
          five: keysort[4],
          six: keysort[5],
          serve: keysort[6],
        })
      } else if (keysort.length == 8) {
        that.setData({
          one: keysort[0],
          two: keysort[1],
          three: keysort[2],
          four: keysort[3],
          five: keysort[4],
          six: keysort[5],
          serve: keysort[6],
          eight: keysort[7]
        })
      }
    })
  },
  // 搜索内容
  searchinput: function(e) {
    var that = this;
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.id != 0) {
      app.setCache("merchid", this.data.id)
    }
  },

  backshop: function(e) {
    app.setCache("merchid", 0)
  },
  onShareAppMessage: function () {

  }
 
})