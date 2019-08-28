var t = getApp(),
  e = t.requirejs("core"),
  i = t.requirejs("foxui"),
  a = t.requirejs("jquery");
Page({
  data: {
    route: "cart",
    icons: t.requirejs("icons"),
    merch_list: !1,
    list: !1,
    edit_list: [],
    id:0,
    merch: false
  },
  onLoad: function(e) {
    t.url(e)
    if (t.getCache("merchid")) {
      merchid = t.getCache("merchid")
      i.setData({
        id: merchid
      })
    }
  },
 
  onShow: function () {
    var that = this;
    that.get_cart()
    e.get("plugins", {}, function (data) {
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
  get_cart: function() {
    var q, i = this;
  
    if (i.data.id != "" && i.data.id != 0) {
      wx.hideTabBar()
      e.get("member/cart/get_cart", { merchid: i.data.id }, function (e) {
        q = {
          show: !0,
          ismerch: !1,
          ischeckall: e.ischeckall,
          total: e.total,
          cartcount: e.total,
          totalprice: e.totalprice,
          empty: e.empty || !1
        }, void 0 === e.merch_list ? (q.list = e.list || [], i.setData(t)) : (q.merch_list = e.merch_list || [], q.ismerch = !0, i.setData(q))
      })
    }
    else{
      e.get("member/cart/get_cart", { merchid: i.data.id }, function (e) {
        t = {
          show: !0,
          ismerch: !1,
          ischeckall: e.ischeckall,
          total: e.total,
          cartcount: e.total,
          totalprice: e.totalprice,
          empty: e.empty || !1
        }, void 0 === e.merch_list ? (t.list = e.list || [], i.setData(t)) : (t.merch_list = e.merch_list || [], t.ismerch = !0, i.setData(t))
      })
    }
   
  },
  edit: function(t) {
    var i, s = e.data(t),
      c = this;
    switch (s.action) {
      case "edit":
        this.setData({
          edit: !0
        });
        break;
      case "complete":
        this.allgoods(!1), this.setData({
          edit: !1
        });
        break;
      case "move":
        i = this.checked_allgoods().data, a.isEmptyObject(i) || e.post("member/cart/tofavorite", {
          merchid: c.data.id,
          ids: i
        }, function(t) {
          c.get_cart()
        });
        break;
      case "delete":
        i = this.checked_allgoods().data, a.isEmptyObject(i) || e.confirm("是否确认删除该商品?", function() {
          e.post("member/cart/remove", {
            ids: i,
            merchid: c.data.id
          }, function(t) {
            c.get_cart()
          })
        });
        break;
      case "pay":
        this.data.total > 0 && wx.navigateTo({
          url: "/pages/order/create/index"
        })
    }
  },
  checkall: function(t) {
    e.loading();
    var i = this,
      a = this.data.ischeckall ? 0 : 1;
    e.post("member/cart/select", {
      merchid: i.data.id,
      id: "all",
      select: a
    }, function(t) {
      i.get_cart(), e.hideLoading()
    })
  },
  update: function(t) {
    var i = this,
      a = this.data.ischeckall ? 0 : 1;
    e.post("member/cart/select", {
      merchid: i.data.id,
      id: "all",
      select: a
    }, function(t) {
      i.get_cart()
    })
  },
  number: function(t) {
    var a = this,
      s = e.pdata(t),
      c = i.number(this, t),
      r = s.id,
      o = s.optionid;
    1 == c && 1 == s.value && "minus" == t.target.dataset.action || s.value == s.max && "plus" == t.target.dataset.action || e.post("member/cart/update", {
      merchid: a.data.id,
      id: r,
      optionid: o,
      total: c
    }, function(t) {
      a.get_cart()
    })
  },
  selected: function(t) {
    e.loading();
    var i = this,
      a = e.pdata(t),
      s = a.id,
      c = 1 == a.select ? 0 : 1;
    e.post("member/cart/select", {
      merchid: i.data.id,
      id: s,
      select: c
    }, function(t) {
      i.get_cart(), e.hideLoading()
    })
  },
  allgoods: function(t) {
    var e = this.data.edit_list;
    if (!a.isEmptyObject(e) && void 0 === t) return e;
    if (t = void 0 !== t && t, this.data.ismerch)
      for (var i in this.data.merch_list)
        for (var s in this.data.merch_list[i].list) e[this.data.merch_list[i].list[s].id] = t;
    else
      for (var i in this.data.list) e[this.data.list[i].id] = t;
    return e
  },
  checked_allgoods: function() {
    var t = this.allgoods(),
      e = [],
      i = 0;
    for (var a in t) t[a] && (e.push(a), i++);
    return {
      data: e,
      cartcount: i
    }
  },
  editcheckall: function(t) {
    var i = e.pdata(t).check,
      a = this.allgoods(!i);
    this.setData({
      edit_list: a,
      editcheckall: !i
    }), this.editischecked()
  },
  editischecked: function() {
    var t = !1,
      e = !0,
      i = this.allgoods();
    for (var a in this.data.edit_list)
      if (this.data.edit_list[a]) {
        t = !0;
        break
      }
    for (var s in i)
      if (!i[s]) {
        e = !1;
        break
      }
    this.setData({
      editischecked: t,
      editcheckall: e
    })
  },
  edit_list: function(t) {
    var i = e.pdata(t),
      a = this.data.edit_list;
    void 0 !== a[i.id] && 1 == a[i.id] ? a[i.id] = !1 : a[i.id] = !0, this.setData({
      edit_list: a
    }), this.editischecked()
  },
  url: function(t) {
    var i = e.pdata(t);
    wx.navigateTo({
      url: i.url
    })
  },
  onShareAppMessage: function() {
    return e.onShareAppMessage()
  }
})