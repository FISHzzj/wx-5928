//作者YIFU YUANMA
var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({
  data: {
    route: "home",
    icons: t.requirejs("icons"),
    shop: {},
    diydata: {},
    startadv: {},
    closestartadv: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    storeRecommand: [],
    total: 0,
    page: 1,
    loaded: !1,
    loading: !0,
    indicatorDotsHot: !1,
    autoplayHot: !0,
    intervalHot: 5e3,
    durationHOt: 1e3,
    circularHot: !0,
    hotimg: "/static/images/es/hotdot.jpg",
    notification: "/static/images/es/notification.png",
    approot: t.globalData.approot,
    merch: false,
    code: "",
    showBg:true
  },
  getShop: function() {
    var t = this;
    a.get("diypage/index/main", {
      'type': 'index'
    }, function(a) {

      //e.wxParse("wxParseData", "html", a.copyright, t, "5"),

      if (a.diypage.page.title) {
        wx.setNavigationBarTitle({
          title: a.diypage.page.title
        })
      }
      if (a.diypage.page.titlebarbg) {
        wx.setNavigationBarColor({
          frontColor: a.diypage.page.titlebarcolor,
          backgroundColor: a.diypage.page.titlebarbg
        })
      }
      var htmlindex = 0;
      //var htmlArr = [];
      for (var ii in a.diypage.items) {
        //console.log(ii + "for...in用法\t" + a.diypage.items[ii].id);
        if (a.diypage.items[ii].id == 'richtext') {
          //console.log(ii);
          //e.wxParse("wxParseData", "html", a.diypage.items[ii].params.content, t, "5");
          e.wxParse("htmlcontent" + htmlindex, "html", a.diypage.items[ii].params.content, t, "5");
          a.diypage.items[ii].params.htmlindex = htmlindex;
          //console.log(wxParseData);
          htmlindex++;
        }
        if (a.diypage.items[ii].id == 'fixedsearch') { //处理接口返回的icon样式不对问题
          if (a.diypage.items[ii].params.leftnavicon != '') a.diypage.items[ii].params.leftnavicon = a.diypage.items[ii].params.leftnavicon.replace('icon', 'icox');
          if (a.diypage.items[ii].params.rightnavicon != '') a.diypage.items[ii].params.rightnavicon = a.diypage.items[ii].params.rightnavicon.replace('icon', 'icox');
        }
        if (a.diypage.items[ii].id == 'goods') { //处理商品组自定义图标路径问题
          if (a.diypage.items[ii].params.goodsiconsrc && a.diypage.items[ii].params.goodsiconsrc != '' && a.diypage.items[ii].params.goodsiconsrc.indexOf('https://') == -1) {
            a.diypage.items[ii].params.goodsiconsrc = t.data.approot.replace('/addons/ewei_shopv2/', '/attachment/') + a.diypage.items[ii].params.goodsiconsrc;
            //console.log(a.diypage.items[ii].params.goodsiconsrc);
          }
          if (a.diypage.items[ii].params.showicon == 2 && a.diypage.items[ii].params.iconposition && a.diypage.items[ii].params.iconposition != '') { //图标位置参数
            a.diypage.items[ii].params.iconleftname = a.diypage.items[ii].params.iconposition.indexOf('right') == -1 ? 'left' : 'right';
            a.diypage.items[ii].params.icontopname = a.diypage.items[ii].params.iconposition.indexOf('bottom') == -1 ? 'top' : 'bottom';
          }
        }
        if (a.diypage.items[ii].id == 'video') { //处理视频高度
          if (a.diypage.items[ii].params.poster && a.diypage.items[ii].params.poster != '' && a.diypage.items[ii].params.poster.indexOf('https://') == -1) {
            a.diypage.items[ii].params.poster = t.data.approot.replace('/addons/ewei_shopv2/', '/attachment/') + a.diypage.items[ii].params.poster;
          }
          wx.getSystemInfo({
            success: function(st) {
              //console.log(st.windowWidth);
              var videow = st.windowWidth;
              var hei = videow;
              if (a.diypage.items[ii].style.ratio == 1) hei = videow * 3 / 4;
              else if (a.diypage.items[ii].style.ratio == 0) hei = videow * 9 / 16;
              //console.log(hei);
              a.diypage.items[ii].style.height = hei;
            }
          })
        }
      }
      if (htmlindex > 0) e.wxParseTemArray("wxParseData", 'htmlcontent', htmlindex, t);
      //console.log(htmlArr);
      t.setData({
        diydata: a.diypage,
        startadv: a.startadv,
        loading: 0,
        show: 1
      })
    })
  },
  onReachBottom: function() {
    //this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand()
  },
  getRecommand: function() {
    var t = this;
    t.setData({
        loading: !0
      }),
      a.get("shop/get_recommand", {
        page: t.data.page
      }, function(a) {
        var e = {
          loading: !1,
          total: a.total
        };
        t.setData({
            loading: !1,
            total: a.total,
            show: !0
          }),
          a.list || (a.list = []),
          a.list.length > 0 && (t.setData({
            storeRecommand: t.data.storeRecommand.concat(a.list),
            page: a.page + 1
          }), a.list.length < a.pagesize && (e.loaded = !0))
      })
  },
  onLoad: function(options) {
    var that=this;
    wx.showTabBar({})
    wx.showLoading({
      title: '加载中...',
    })
    // var userinfo = t.getCache("userinfo")
    // if (!userinfo.nickname || userinfo.nickname == "null" || userinfo.nickname ==""){
    //   console.log("userinfo")
    //   wx.clearStorageSync()
    // }
    wx.getSetting({
      success: function(res) {
        wx.hideLoading()
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            showBg:true
          })
          // wx.redirectTo({
          //   url: '/pages/authorize/authorize',
          // })
        // } else {
        //     wx.login({
        //       success: function(o) {
        //         if (!o.code)
        //           return void r.alert("获取用户登录态失败:" + o.errMsg);
        //         r.post("wxapp/login", {
        //           code: o.code
        //         }, function(o) {
        //           return o.error ? void r.alert("获取用户登录态失败:" + o.message) : o.isclose && i && "function" == typeof i ? void i(o.closetext, !0) : void r.get("wxapp/auth", {
        //             data: i.detail.encryptedData,
        //             iv: i.detail.iv,
        //             sessionKey: o.session_key
        //           }, function(e) {
        //             wx.switchTab({
        //               url: '/pages/index/index',
        //             })
        //           })
        //         })
        //       }
        //     })
        }else{
          that.setData({
            showBg:false
          })
        }
      },
      // fail: function() {
      //   wx.hideLoading()
      //   wx.redirectTo({
      //     url: '/pages/authorize/authorize',
      //   })
      // }
    })
    t.url(options);
  },
  onShow: function () {
    var that = this;
    t.setCache("merchid","0");
    var set = t.getCache("sysset");
    wx.setNavigationBarTitle({
      title: set.shopname || "商城首页"
    });
      that.getShop();
    a.get("plugins", {}, function (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].identity == 'merch') {
          wx.hideTabBar()
          that.setData({
            merch: true
          })
        }
      }
      that.setData({
        plugins: data
      })
    })
    //this.getRecommand()
  },
  onHide: function () {
    var that = this
    that.setData({
      merch: false
    })
  },

  onShareAppMessage: function() {
    return a.onShareAppMessage()
  },
  imagesHeight: function(t) {
    var a = t.detail.width,
      e = t.detail.height,
      o = t.target.dataset.type,
      i = {},
      s = this;
    wx.getSystemInfo({
      success: function(t) {
        i[o] = t.windowWidth / a * e,
          (!s.data[o] || s.data[o] && i[o] < s.data[o]) && s.setData(i)
      }
    })
  },
  closestartadv: function(t) { //cc_zhong 关闭启动广告
    this.setData({
      closestartadv: 1
    })
  },
  //授权获取用户信息
  onGotUserInfo: function (i) {
    var n = this,
      info = t.getCache("userinfo");
    info = i.userInfo;
    if (info && !info.needauth)
      return void (t && "function" == typeof t && t(info));
    if (i.detail.errMsg == 'getUserInfo:ok') {
      wx.login({
        success: function (o) {
          if (!o.code)
            return void r.alert("获取用户登录态失败:" + o.errMsg);
          a.post("wxapp/login", {
            code: o.code
          }, function (o) {
            return o.error ? void a.alert("获取用户登录态失败:" + o.message) : o.isclose && i && "function" == typeof i ? void i(o.closetext, !0) : void a.get("wxapp/auth", {
              data: i.detail.encryptedData,
              iv: i.detail.iv,
              sessionKey: o.session_key
            }, function (res) {
              n.setData({
                showBg:false
              })
              t.setCache("userinfo", res, 7200),
                wx.switchTab({
                  url: '/pages/index/index',
                })
            })
          })
        }
      })
    }
  },
})