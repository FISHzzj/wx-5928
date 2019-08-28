// pages/SecKill/seckill.js
import formatTime from '../../utils/util.js'
var app = getApp(),
  model = app.requirejs("model"),
  c = app.requirejs("core"),
  s = app.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load:false,//是否在加载中
    load1: false,//是否在加载中
    roomid:10,//选择秒杀类型
    tarbarNow:0,//tarbar切换
    actEndTimeList: '',//倒计时开始时间
    countDownList:[],
    nowkillTime:'0',
    times:'',//当前时间的内容
    roomid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '整点秒杀-海鲜'
    })
    // 执行倒计时函数
    this.countDown();
    this.requestData();
    
  },

  requestData:function(){//请求数据
    var that = this;
    var onload = that.data.load;
    if(onload){return;}
    that.setData({
      load:true
    });
    wx.showLoading({
      title: '加载中...',
    })
    c.get('seckill',{
      roomid: that.data.roomid
    }, function (data) {
      wx.hideLoading();
      if (data.status == 1) { 
        that.setData({
          data: data,
          roomid: data.result.roomid,
          timeid: data.result.timeid,
          taskid: data.result.taskid
        });
        data.result.times.forEach(function (o, i) {
          if (o.status == 0) {
            that.setData({
              timeSlide: i,
              actEndTimeList: o.endtime,
              startTime: o.starttime,
              nowkillTime: '1',
              times: o
            });
          }
        });
        that.requestList();//调用
        if (that.data.nowkillTime == '0') {
          that.setData({
            timeSlide: '0',
            actEndTimeList: data.result.times[0].endtime,
            times: data.result.times[0]
          });
        }
      } else if (data.status == 0){
        that.setData({
          load: false,
          data: data
        })
      }
      that.setData({
        load:false
      });

    })

  },
  requestList:function(){//请求商品列表数据
    var that = this;
    var onload = that.data.load;
    var onload1 = that.data.load1;
    if (onload && onload1) { return; }
    that.setData({
      load1: true
    });
    wx.showLoading({
      title: '加载中...',
    })
    c.get('seckill.get_goods', {
        timeid:that.data.timeid,
        roomid:that.data.roomid,
        taskid:that.data.taskid
    }, function (data) {
      wx.hideLoading();
        that.setData({
          load1:false
        });
        if(data.status==1){
          that.setData({
            produList:data,
            times:data.result.time,
            actEndTimeList: data.result.time.endtime
          });
        }else{
          that.setData({
            produList:data
          });
        }
    })
  },
  selectedTitle:function(res){//切换抢购标题
    this.setData({
      roomid: res.currentTarget.dataset.roomid
    });
    this.requestData();

    // this.requestList();//调用
  },
  clickTime:function(res){//点击时间
    var that = this;
    var aa = res.currentTarget.dataset.timeslide;
    this.setData({
      timeSlide: aa,
      timeid: res.currentTarget.dataset.id
    });
    that.requestList();//调用
  },
  qiehuan:function(res){//底部切换烂
    var that = this;
    var aa = res.currentTarget.dataset.now;
    this.setData({
      tarbarNow: aa
    });
    if(aa==1){
      // 跳到购物车
      wx.switchTab({
        url: '/pages/member/cart/index',
      })
    }else if(aa==2){
      wx.navigateTo({
        url: '/pages/order/index',
      })
    }else if(aa==3){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  gobackk:function(){//返回
      wx.navigateBack({
        
      })
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown:function(){//倒计时函数
    var that = this;
    let newTime = new Date().getTime();
    let endTimeList = that.data.actEndTimeList*1000;
    let countDownArr = [];
    let obj = null;
    
    let endTime = endTimeList;
      if(endTime-newTime>0){
        let time = (endTime - newTime) / 1000;
        let hou = parseInt(time/3600);
        let min = parseInt((time-hou*3600)/60);
        let sec = parseInt((time - hou * 3600) % 60);
        obj = {
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      }else{
        obj = {
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    
    that.setData({
      countDownList: countDownArr
    });
    setTimeout(this.countDown,1000);
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