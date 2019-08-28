var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui");
Page({
	data : {
		icons : t.requirejs("icons"),
		success : !1,
		successData : {}

	},
	onLoad : function (e) {
		this.setData({
			options : e
		}),
		t.url(e)
	},
	onShow : function () {
		this.get_list()
	},
	get_list : function () {
		var t = this;
		e.get("order/pay", t.data.options, function (i) {
      if(i.url){
        //代付
        return void wx.navigateTo({
          url: '/pages/'+i.url + '?id='+i.id
        });
      }else{
        if (50018 == i.error)
          return void wx.navigateTo({
            url: "/pages/order/detail/index?id=" + t.data.options.id
          });
        !i.wechat.success && "0.00" != i.order.price && i.wechat.payinfo && e.alert(i.wechat.payinfo.message + "\n不能使用微信支付!"),
          t.setData({
            list: i,
            show: !0
          })
      }
			
		})
	},
	pay : function (t) {
		var i = e.pdata(t).type,
		o = this,
		a = this.data.list.wechat;
		"wechat" == i ? e.pay(a.payinfo, function (t) {
			"requestPayment:ok" == t.errMsg && o.complete(i)
		}) : "credit" == i ? e.confirm("确认要支付吗?", function () {
			o.complete(i)
		}, function () {}) : "cash" == i ? e.confirm("确认要使用货到付款吗?", function () {
			o.complete(i)
		}, function () {}) : o.complete(i)
	},
	complete : function (t) {
		var o = this;
		e.post("order/pay/complete", {
			id : o.data.options.id,
			type : t
		}, function (t) {
      console.log(11111);
      console.log(t);
			if (0 == t.error)
				return wx.setNavigationBarTitle({
					title : "支付成功"
				}), void o.setData({
					success : !0,
					successData : t
				});
			i.toast(o, t.message)
		}, !0, !0)
    
	},
	shop : function (t) {
		0 == e.pdata(t).id ? this.setData({
			shop : 1
		}) : this.setData({
			shop : 0
		})
	},
	phone : function (t) {
		e.phone(t)
	},
  //cc_zhong 全付通支付
  swiftpay: function (t) {
    var t = this;
    e.get("changce/swift/dopay", t.data.options, function (a) {
      if (!a.token){
        return void e.alert(a.message);
        //return void wx.navigateBack();
      }else{
        var result = JSON.parse(a.pay_info);
        wx.requestPayment({
          'timeStamp': result.timeStamp,
          'nonceStr': result.nonceStr,
          'package': result.package,
          'signType': 'MD5',
          'paySign': result.paySign,
          'success': function (res) {
            //t.complete('swift');
            wx.showModal({
              title: '支付成功',
              content: '如订单状态未变更，可耐心等待片刻！',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                return void wx.navigateTo({
                  url: "/pages/order/detail/index?id=" + t.data.options.id
                });
              }
            })
          },
          'fail': function (res) {
            e.alert('支付失败！');
          }
        })
      }
    })
  },
  //
  // // 请人代付  start
  // peerpay: function(t){
  //   var t = this;
  //   // console.log(t)
  //   return void wx.navigateTo({
  //     url: "/pages/order/pay/peerpay?id="+t.options.id
  //   });
  // }
  // // 请人代付  end
})
