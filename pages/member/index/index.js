var e = getApp(), r = e.requirejs("core"), t = e.requirejs("wxParse/wxParse");
Page({
  data: {
    route: "member",
    icons: e.requirejs("icons"),
    member: {},
    merch: false,
    id: 0,
    openId: "",
  },
  onLoad: function (o) {
    // var that = this 

    // e.url(o),
    // "" == e.getCache("userinfo") && wx.redirectTo({
    // 	url : "/pages/message/auth/index"
    // })

  },
  // 判断是否已经注册
  register: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    wx.showLoading({
      title: '正在加载中...',
    })
    // 分销
    if (type == "commission") {
      r.get("commission/index", {},
        function (e) {
          wx.hideLoading()
          if (7e4 == e.error) return void wx.navigateTo({
            url: "/pages/commission/register/index"
          })
          else return void wx.navigateTo({
            url: "/pages/commission/index/index"
          })
        })
      // 股东
    } else if (type == "abonus") {
      r.get("abonus", {}, function (data) {
        wx.hideLoading()
        if (data.result.member.isagent == "" || data.result.member.isagent == 0 || !data.result.member.isagent || data.result.member.status == "" || data.result.member.status == 0 || !data.result.member.status) {
          wx.navigateTo({
            url: '/pages/commission/register/index',
          })
        } else if (data.result.member.isaagent == "" || !data.result.member.isaagent || data.result.member.isaagent == 0 || data.result.member.aagentstatus == "" || data.result.member.aagentstatus == 0 || !data.result.member.aagentstatus) {
          wx.navigateTo({
            url: '/pages/abonus/register/index',
          })
        } else {
          wx.hideLoading()
          var url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url: url,
          })
        }
      })
    }
    // 区域代理
    else if (type == "globonus") {

      r.get("globonus", {}, function (data) {
        wx.hideLoading()
        if (data.result.member.isagent == "" || data.result.member.isagent == 0 || !data.result.member.isagent || data.result.member.status == "" || data.result.member.status == 0 || !data.result.member.status) {
          wx.navigateTo({
            url: '/pages/commission/register/index',
          })
        } else if (data.result.member.ispartner == "" || !data.result.member.ispartner || data.result.member.ispartner == 0 || data.result.member.partnerstatus == "" || data.result.member.partnerstatus == 0 || !data.result.member.partnerstatus) {
          wx.navigateTo({
            url: '/pages/globonus/register/index',
          })
        } else {
          wx.hideLoading()
          var url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url: url,
          })
        }
      })
    }
    // 分红
    else if (type == "weightbonus") {
      r.get("weightbonus", {}, function (data) {
        wx.hideLoading()
        if (data.result.member.isagent == "" || data.result.member.isagent == 0 || !data.result.member.isagent || data.result.member.status == "" || data.result.member.status == 0 || !data.result.member.status) {
          wx.navigateTo({
            url: '/pages/commission/register/index',
          })
        } else if (data.result.member.isweight == "" || !data.result.member.isweight || data.result.member.isweight == 0 || data.result.member.weightstatus == "" || data.result.member.weightstatus == 0 || !data.result.member.weightstatus) {
          wx.navigateTo({
            url: '/pages/weightbonus/register/index',
          })
        } else {
          wx.hideLoading()
          var url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url: url,
          })
        }
      })
    } else {
      wx.hideLoading()
      var url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url,
      })
    }
  },
  getInfo: function () {
    var q = this;
    var merchid = e.getCache("merchid");
    // console.log(merchid);
    // console.log(q.data.openId);
    let openId = "sns_wa_" + q.data.openId;
    if (merchid != "" && merchid != 0) {
      wx.hideTabBar()
      q.setData({
        id: merchid
      })
      r.get("member", { merchid: merchid }, function (r) {
        // console.log(r);
        0 != r.error ? wx.redirectTo({
          url: "/pages/message/auth/index"
        }) : q.setData({
          member: r,
          show: !0,
        }),
          t.wxParse("wxParseData", "html", r.copyright, q, "5")
      })
    }
    else {
      r.get("member", { merchid: merchid, openid: openId }, function (r) {
        // console.log(r);
        0 != r.error ? wx.redirectTo({
          url: "/pages/message/auth/index"
        }) : q.setData({
          member: r,
          show: !0,
        }),
          t.wxParse("wxParseData", "html", r.copyright, q, "5")
      })
    }

  },
  onShow: function () {
    var that = this
    // that.getInfo()
    r.get("plugins", {}, function (data) {
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
  },
  onHide: function () {
    var that = this
    that.setData({
      merch: false
    })
  },
  onShareAppMessage: function () {
    return r.onShareAppMessage()
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
          // console.log(o);
          if (!o.code)
            return void r.alert("获取用户登录态失败:" + o.errMsg);
          r.post("wxapp/login", {
            code: o.code
          }, function (o) {
            // console.log(o);
            // return;
            return o.error ? void r.alert("获取用户登录态失败:" + o.message) : o.isclose && i && "function" == typeof i ? void i(o.closetext, !0) : void r.get("wxapp/auth", {
              data: i.detail.encryptedData,
              iv: i.detail.iv,
              sessionKey: o.session_key
            }, function (e) {
              // console.log(e);
              let openId = e.openId
              n.setData({
                openId: openId
              })
              n.getInfo();
              r.get("plugins", {}, function (data) {
                for (var i = 0; i < data.length; i++) {
                  if (data[i].identity == 'merch') {
                    wx.hideTabBar()
                    n.setData({
                      merch: true,

                    })
                  }
                }
                n.setData({
                  plugins: data,
                  openId: openId
                })
              })
            })
          })
        }
      })
    }
  },

})
