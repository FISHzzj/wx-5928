var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));
Page({
	data : {
		route : "category",
		category : {},
		icons : t.requirejs("icons"),
		selector : 0,
		advimg : "",
		recommands : {},
		level : 0,
		back : 0,
		child : {},
		parent : {},
    id: 0,
    merch: false
	},
	tabCategory : function (t) {
		this.setData({
			selector : t.target.dataset.id,
			advimg : t.target.dataset.src,
			child : t.target.dataset.child,
			back : 0
		}),
		a.isEmptyObject(t.target.dataset.child) ? this.setData({
			level : 0
		}) : this.setData({
			level : 1
		})
	},
	cateChild : function (t) {
		this.setData({
			parent : t.currentTarget.dataset.parent,
			child : t.currentTarget.dataset.child,
			back : 1
		})
	},
	backParent : function (t) {
		this.setData({
			child : t.currentTarget.dataset.parent,
			back : 0
		})
	},
	getCategory : function () {
		var q = this;
    var merchid = t.getCache("merchid")
    if (merchid != "" && merchid != 0) {
      wx.hideTabBar()
     q.setData({
        id: merchid
      })
      e.get("shop/get_category", { merchid: merchid }, function (e) {
        q.setData({
          category: e.category,
          show: !0,
          set: e.set,
          advimg: e.set.advimg,
          recommands: e.recommands,
          child: e.recommands
        })
      })
    }
    else{
      wx.showTabBar()
      e.get("shop/get_category", {}, function (e) {
        q.setData({
          category: e.category,
          show: !0,
          set: e.set,
          advimg: e.set.advimg,
          recommands: e.recommands,
          child: e.recommands
        })
      })
    }
	},
 
  onShow: function () {
    var that = this;
    that.getCategory()
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
	onShareAppMessage : function () {
		return e.onShareAppMessage()
	},

   onLoad: function (options) {
   
  },
})
