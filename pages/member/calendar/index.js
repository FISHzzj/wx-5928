// pages/member/calendar/index.js
var t = getApp(),
  e = t.requirejs("core");
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(), // 年份
    month: new Date().getMonth() + 1, // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()], // 月份字符串

    demo4_days_style: [],
    signold_type:'',
    signold_price:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(t.getCache("userinfo"));
    t.url(options),
      "" == t.getCache("userinfo") && wx.redirectTo({
        url: "/pages/message/auth/index"
      })
    let data = t.getCache("userinfo");
    e.get("sign", {
      "openid": data.openid,
    }, function (e) {
      console.log(e);
      if(e.error==0){
        let signold_type = e.signold_type;//补签扣款方式   0余额，1积分
        let signold_price = e.signold_price;//补签所需数量
        let sign_arr = e.sign_arr;
        // console.log(sign_arr)
        let demo4_days_style = that.data.demo4_days_style;
        var newArray = sign_arr.map(function (currentValue, index, currentArray) {
          demo4_days_style.push({
            month: 'current',
            day: currentValue.day,
            color: 'white',
            background: '#46c4f3'
          });
        });
        that.setData({
          demo4_days_style,
          signold_type,
          signold_price
        });
      }
    })

  },
  // 签到操作
  qiandao:function(){
    
  },
  // 选择月份
  dateChange: function (event) {
    let that = this;
    console.log(event.detail);
    let res = event.detail;
    if (res.currentMonth<10){
      var riqi = res.currentYear + "-" + "0" + res.currentMonth;
    }else{
      var riqi = res.currentYear + "-" + res.currentMonth;
    }
    console.log(riqi);
    let data = t.getCache("userinfo");
    e.get("sign/getCalendar", {
      "openid": data.openid,
      "date": riqi
    }, function (e) {
      console.log(e);
      if (e.error == 0){
        let sign_arr = e.sign_arr;
        that.setData({
          demo4_days_style:[]
        });
        let demo4_days_style = that.data.demo4_days_style;
        var newArray = sign_arr.map(function (currentValue, index, currentArray) {
          if (currentValue.signed==1){
            demo4_days_style.push({
              month: 'current',
              day: currentValue.day,
              color: 'white',
              background: '#46c4f3'
            });
          }
        });
        that.setData({
          demo4_days_style
        });
      }
    })
  },
  //点击签到日期
  dayClick: function (event) {
    var that = this;
    var requ = e;
    // console.log(event.detail);
    let res = event.detail;
    let datayear = res.year;
    let datamonth = res.month;
    let dataDay = res.day;
    let signold_type = that.data.signold_type; //补签扣款方式   0余额，1积分
    let signold_price = that.data.signold_price; //补签所需金额
    if (datamonth<10){
      if (dataDay < 10) {
        var riqi = datayear + "-" + "0"  + datamonth + "-" + "0" + dataDay;
      } else {
        var riqi = datayear + "-" + "0" + datamonth + "-" + dataDay;
      }
    }else{
      if (dataDay < 10) {
        var riqi = datayear + "-" + datamonth + "-" + "0" + dataDay;
      } else {
        var riqi = datayear + "-" + datamonth + "-" + dataDay;
      }
    }
    if (new Date(riqi).getTime() - new Date().getTime() < -86400000){
      if (signold_price <= 0) {
        requ.confirm("确认补签吗？ ", function () {
          qiandao();
        })
      } else {
        if (signold_type == 1) { //积分
          requ.confirm("补签需扣除" + signold_price + "积分，确认补签吗？ ", function () {
            qiandao();
          })
        } else if (signold_type == 0) { //余额
          requ.confirm("补签需扣除" + signold_price + "余额，确认补签吗？", function () {
            qiandao();
          })
        }
      }
     
    }else{
      qiandao();
    }
 
    function qiandao(){
      let data = t.getCache("userinfo");
      e.post("sign/dosign", {
        "openid": data.openid,
        "date": riqi
      }, function (e) {
        // console.log(e);
        if (e.error == 0) {
          let demo4_days_style = that.data.demo4_days_style;
          demo4_days_style.push({
            month: 'current',
            day: dataDay,
            color: 'white',
            background: '#46c4f3'
          });
          that.setData({
            demo4_days_style
          });
          let message = e.message;
          requ.alert(message)
        } else {
          let message = e.message;
          requ.alert(message)
        }
      })
    }
  }
})