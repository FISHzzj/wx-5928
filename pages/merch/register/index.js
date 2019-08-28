// pages/merch/register/index.js
var t = getApp(),
  e = t.requirejs("core"),
  i = t.requirejs("foxui"),
  a = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    submit: !1,
    checked: false,
    choose: "立即申请入驻"
  },
  inputChange: function(t) {
    var i = this.data.postData,
      s = e.pdata(t).type,
      o = t.detail.value;
    i[s] = a.trim(o),
      this.setData({
        postData: i
      })
  },
  submit: function(t) {
    var s = this,
      o = this.data.postData;
    if (!a.isMobile(o.mobile))
      return void e.alert("请填写正确的手机号");
    if (!o.realname || "" == o.realname)
      return void e.alert("请填写联系人");
    if (!o.merchname || "" == o.merchname)
      return void e.alert("请填写商家名称");
    if (!o.salecate || "" == o.salecate)
      return void e.alert("请填写主营项目");
    if (!o.uname || "" == o.uname)
      return void e.alert("请输入账号");
    if (!o.upass || "" == o.upass)
      return void e.alert("请输入密码");
    // if (this.data.checked == false)
    //   return void e.alert("请阅读协议")
    let parms = {
      realname: o.realname,
      mobile: o.mobile,
      merchname: o.merchname,
      uname: o.uname,
      upass: o.upass,
      salecate: o.salecate,
      desc: o.desc
    }
    s.setData({
      choose: "处理中..."
    })
    e.post("merch/register", parms, function(data) {
      if (data.status == 1)
        e.confirm("您的申请已经提交，请等待我们联系您!", function() {
          wx.switchTab({
            url: '/pages/index/index',
          })
        });
      else {
        e.confirm(data.result.message)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var i = this
    e.get("merch/register", {}, function(data) {
      console.log(data)
      i.setData({
        list: data.result,
        status: data.status
      })

    })
  },
  checkChange: function(e) {
    if (this.data.checked == true) {
      this.setData({
        checked: "flase"
      });
    } else {
      this.setData({
        checked: true
      });
    }
  },
  onShareAppMessage: function () {

  }
})