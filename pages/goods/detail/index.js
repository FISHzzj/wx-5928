//作者YIFU YUANMA
var t = getApp(),
  e = t.requirejs("core"),
  a = (t.requirejs("icons"), t.requirejs("foxui")),
  o = t.requirejs("biz/diyform"),
  i = t.requirejs("jquery"),
  s = t.requirejs("wxParse/wxParse"),
  n = 0,
  r = [],
  d = [];
Page({
      data: {
        icons: t.requirejs("icons"),
        tap:'info',
        startScroll:1,//是否滚动
        goods: {},
        indicatorDots: !0,
        autoplay: false,
        interval: 5e3,
        duration: 500,
        circular: !0,
        active: "",
        slider: "",
        tempname: "",
        info: "active",
        preselltimeend: "",
        presellsendstatrttime: "",
        advWidth: 0,
        dispatchpriceObj: 0,
        now: parseInt(Date.now() / 1e3),
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        timer: 0,
        discountTitle: "",
        istime: 1,
        istimeTitle: "",
        params: {},
        total: 1,
        optionid: 0,
        defaults: {
          id: 0,
          merchid: 0
        },
        buyType: "",
        pickerOption: {},
        specsData: [],
        specsTitle: "",
        canBuy: "",
        diyform: {},
        showPicker: !1,
        pvalOld: [0, 0, 0],
        pval: [0, 0, 0],
        areas: [],
        noArea: !0,
        commentObj: {},
        commentObjTab: 1,
        loading: !1,
        commentEmpty: !1,
        commentPage: 1,
        commentLevel: "all",
        commentList: [],
        ver: t.globalData.ver,
        seckill:""
      },
      favorite: function(t) {
        var a = this,
          o = t.currentTarget.dataset.isfavorite == 1 ? 0 : 1;
        e.get("member/favorite/toggle", {
          id: a.data.options.id,
          isfavorite: o
        }, function(t) {
          t.isfavorite ? a.setData({
            "goods.isfavorite": 1
          }) : a.setData({
            "goods.isfavorite": 0
          })
        })
      },
      //滚动加载详情
      myScroll:function(e){
        if (this.data.startScroll==1){
          this.setData({
            startScroll: 2
          });
        }
      },
      goodsTab: function(t) {
        var a = this,
          o = t.currentTarget.dataset.tap;
        if (t.currentTarget.dataset.tap == a.data.tap)return
        a.setData({
           tap:o
        });
       
            e.get("goods/get_comment_list", {
              id: a.data.options.id,
              level: a.data.commentLevel,
              page: a.data.commentPage
            }, function(t) {
              t.list.length > 0 ? a.setData({
                loading: !1,
                commentList: t.list,
                commentPage: t.page
              }) : a.setData({
                loading: !1,
                commentEmpty: !0
              })
            })
      },
  store: function (e) {
    let that = this;
    t.setCache("merchid", e.currentTarget.dataset.id)
  },
      comentTap: function(t) {
        var a = this,
          o = t.currentTarget.dataset.type,
          i = "";
        1 == o ? i = "all" : 2 == o ? i = "good" : 3 == o ? i = "normal" : 4 == o ? i = "bad" : 5 == o && (i = "pic"),
          o != a.data.commentObjTab && e.get("goods/get_comment_list", {
            id: a.data.options.id,
            level: i,
            page: a.data.commentPage
          }, function(t) {
            t.list.length > 0 ? a.setData({
              loading: !1,
              commentList: t.list,
              commentPage: t.page,
              commentObjTab: o,
              commentEmpty: !1
            }) : a.setData({
              loading: !1,
              commentList: t.list,
              commentPage: t.page,
              commentObjTab: o,
              commentEmpty: !0
            })
          })
      },
      number: function(t) {
        var o = this,
          i = e.pdata(t),
          s = a.number(this, t);
        i.id,
          i.optionid;
        1 == s && 1 == i.value && "minus" == t.target.dataset.action || i.value == i.max && "plus" == t.target.dataset.action || o.setData({
          total: s
        })
      },
      inputNumber: function(t) {
        var e = this,
          a = e.data.goods.maxbuy,
          o = e.data.goods.minbuy,
          i = t.detail.value;
        i > 0 ? (a > 0 && a <= parseInt(t.detail.value) && (i = a), o > 0 && o > parseInt(t.detail.value) && (i = o)) : i = o > 0 ? o : 1,
          e.setData({
            total: i
          })
      },
      buyNow: function(t) {
        var i = this,
          s = i.data.optionid,
          r = i.data.diyform;
        if (n > 0 && 0 == s)
          return void a.toast(i, "请选择规格");
        if (this.data.total > this.data.goodsg.seckillmaxbuy)
          return void e.alert("改秒杀商品最多可选择" + this.data.goodsg.seckillmaxbuy + "件商品");
        if (r && r.fields.length > 0) {
          if (!o.verify(i, r))
            return;
          e.post("order/create/diyform", {
            id: i.data.options.id,
            diyformdata: r.f_data
          }, function(t) {
            wx.redirectTo({
              url: "/pages/order/create/index?id=" + i.data.options.id + "&total=" + i.data.total + "&optionid=" + s + "&gdid=" + t.gdid
            })
          })
        } else
          wx.redirectTo({
            url: "/pages/order/create/index?id=" + i.data.options.id + "&total=" + i.data.total + "&optionid=" + s
          })
      },
      getCart: function(t) {
        var i = this,
          s = i.data.optionid,
          r = i.data.diyform;
        if (n > 0 && 0 == s)
          return void a.toast(i, "请选择规格");
   
        if (this.data.total > this.data.goodsg.seckillmaxbuy)
          return void e.alert("改秒杀商品最多可选择" + this.data.goodsg.seckillmaxbuy+"件商品");
        if (r && r.fields.length > 0) {
          if (!o.verify(i, r))
            return;
          e.post("order/create/diyform", {
            id: i.data.options.id,
            diyformdata: r.f_data
          }, function(t) {
            e.post("member/cart/add", {
              id: i.data.options.id,
              total: i.data.total,
              optionid: s,
              diyformdata: r.f_data
            }, function(t) {
              0 == t.error && i.setData({
                "goods.cartcount": t.cartcount,
                active: "",
                slider: "out"
              })
            })
          })
        } else
          e.post("member/cart/add", {
            id: i.data.options.id,
            total: i.data.total,
            optionid: s
          }, function(t) {
            0 == t.error && i.setData({
              "goods.cartcount": t.cartcount,
              active: "",
              slider: "out"
            })
          })
      },
      getDetail: function(t) {
        var a = this,
          o = parseInt(Date.now() / 1e3);
        a.setData({
          loading: !0
        }),
          e.get("goods/get_detail", {
            id: t.id
          }, function (t) {
            // var s
            // if (t.goods.content_type == 1) {
            //   s = getApp().requirejs("wxParse/wxParse"),
            //     setTimeout(function (q) { s.wxParse("wxParseData", "html", t.goods.content, a, "5") }, 1)
            // }
            if (
              setTimeout(function (q) { 
                s.wxParse("wxParseData", "html", t.goods.content, a, "5") }, 1),
              a.setData({
                show: !0,
                goods: t.goods,
                goodsg:t.g
              }), wx.setNavigationBarTitle({
                title: t.goods.title || "商品详情"
              }), n = t.goods.hasoption, i.isEmptyObject(t.goods.dispatchprice) || "string" == typeof t.goods.dispatchprice ? a.setData({
                dispatchpriceObj: 0
              }) : a.setData({
                dispatchpriceObj: 1
              }), t.goods.isdiscount > 0 && t.goods.isdiscount_time >= o) {
              clearInterval(a.data.timer);
              var r = setInterval(function () {
                a.countDown(0, t.goods.isdiscount_time)
              }, 1e3);
              a.setData({
                timer: r
              })
            } else
              a.setData({
                discountTitle: "活动已结束"
              });
            if (t.goods.istime > 0) {
              clearInterval(a.data.timer);
              var r = setInterval(function () {
                a.countDown(t.goods.timestart, t.goods.timeend, "istime")
              }, 1e3);
              a.setData({
                timer: r
              })
            }
            var app = getApp();
            var time = app.requirejs("util");
            var newDate = new Date();
            newDate.setTime(t.goods.preselltimeend * 1000);
            t.goods.ispresell > 0 && a.setData({
              preselltimeend: time.formatTime(newDate) || t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
              presellsendstatrttime: t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日"
            }),
              setTimeout(function (q) {
                t.goods.getComments > 0 && e.get("goods/get_comments", {
                  id: a.data.options.id
                }, function (t) {
                  a.setData({
                    commentObj: t
                  })
                })
              }, 1)
          })
          },
          countDown: function(t, e, a) {
            var o = parseInt(Date.now() / 1e3),
              i = t > o ? t : e,
              s = i - o,
              n = parseInt(s),
              r = Math.floor(n / 86400),
              d = Math.floor((n - 24 * r * 60 * 60) / 3600),
              c = Math.floor((n - 24 * r * 60 * 60 - 3600 * d) / 60);
            Math.floor(n - 24 * r * 60 * 60 - 3600 * d - 60 * c);
            if (this.setData({
                day: Math.floor(n / 86400),
                hour: Math.floor((n - 24 * r * 60 * 60) / 3600),
                minute: Math.floor((n - 24 * r * 60 * 60 - 3600 * d) / 60),
                second: Math.floor(n - 24 * r * 60 * 60 - 3600 * d - 60 * c)
              }), "istime") {
              var l = "";
              t > o ? l = "距离限时购开始" : t <= o && e > o ? l = "距离限时购结束" : (l = "活动已经结束，下次早点来~", this.setData({
                  istime: 0
                })),
                this.setData({
                  istimeTitle: l
                })
            }
          },
          cityPicker: function(t) {
            var e = this;
            t.currentTarget.dataset.tap;
            wx.navigateTo({
              url: "/pages/goods/region/index?id=" + e.data.goods.id + "&region=" + e.data.goods.citys
            })
          },
          selectPicker: function(t) {
            var a = this,
              o = t.currentTarget.dataset.tap,
              i = t.currentTarget.dataset.buytype;
            "" == o && a.setData({
                active: "active",
                slider: "in",
                tempname: "select-picker",
                buyType: i
              }),
              e.get("goods/get_picker", {
                id: a.data.goods.id
              }, function(t) {
                n > 0 && (d = t.options, a.setData({
                    pickerOption: t
                  })),
                  t.diyform && a.setData({
                    diyform: {
                      fields: t.diyform.fields,
                      f_data: t.diyform.lastdata
                    }
                  })
              })
          },
          specsTap: function(t) {
            var e = this,
              a = t.target.dataset.idx;
            r[a] = {
              id: t.target.dataset.id,
              title: t.target.dataset.title
            };
            var o = "",
              i = "";
            r.forEach(function(t) {
                o += t.title + ";",
                  i += t.id + "_"
              }),
              i = i.substring(0, i.length - 1),
              d.forEach(function(a) {
                a.specs == i && (e.setData({
                  optionid: a.id,
                  "goods.total": a.stock,
                  "goods.maxprice": a.marketprice,
                  "goods.minprice": a.marketprice
                }), "" != t.target.dataset.thumb && e.setData({
                  "goods.thumb": t.target.dataset.thumb
                }), a.stock <= 0 ? e.setData({
                  canBuy: "库存不足"
                }) : e.setData({
                  canBuy: ""
                }))
              }),
              e.setData({
                specsData: r,
                specsTitle: o
              })
          },
          emptyActive: function() {
            this.setData({
              active: "",
              slider: "out",
              showshare: 0
            })
          },
          onLoad: function(e) {
            t.url(e);
            if (e.scene) { //来自商品海报
              var scene = decodeURIComponent(e.scene);
              var qstring = [];
              var strs = scene.split("&");
              for (var ii = 0; ii < strs.length; ii++) {
                qstring[strs[ii].split("=")[0]] = unescape(strs[ii].split("=")[1]);
              }
              if (qstring.id && !e.id) e.id = qstring.id;
            }
            var a = this;
            a.setData({
                options: e,
                // areas: t.getCache("cacheset").areas
              }),
              wx.getSystemInfo({
                success: function(t) {
                  a.setData({
                    advWidth: t.windowWidth,
                    advVideoHeight: t.windowWidth * 3 / 4
                  })
                  a.getDetail(e)
                }
              })
            if (e.taskid){
              a.seckill(e.taskid, e.roomid, e.timeid)
              }
          },
          // 秒杀
           seckill: function (taskid,roomid,timeid){
            var that = this
             e.get("seckill/get_goods", {
              taskid: taskid,
              roomid: roomid,
              timeid:timeid
            }, function (res) {
              setInterval(function () {
                that.countDown(res.result.time.starttime, res.result.time.endtime, "istime")
              }, 1e3);
              that.setData({
                seckill: res.result
              })
            })
          },
          onShow: function() {
            r = [],
              d = []
          },
          onChange: function(t) {
            return o.onChange(this, t)
          },
          DiyFormHandler: function(t) {
            return o.DiyFormHandler(this, t)
          },
          selectArea: function(t) {
            return o.selectArea(this, t)
          },
          bindChange: function(t) {
            return o.bindChange(this, t)
          },
          onCancel: function(t) {
            return o.onCancel(this, t)
          },
          onConfirm: function(t) {
            return o.onConfirm(this, t)
          },
          getIndex: function(t, e) {
            return o.getIndex(t, e)
          },
          onShareAppMessage: function() {
            return e.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.options.id)
          },
          onShareAppMessage: function() {
            return {
              title: this.data.goods.shopdetail.shopname,
              path: '/pages/index/index'
            }
          },
          //cc_zhong 以下为新增分享相关
          showShare: function(t) {
            var a = this;
            a.setData({
              active: "active",
              slider: "in",
              showshare: 1
            })
          },
          goodsposter: function(t) { //商品海报
            var i = this;
            e.post("goods/poster/getimage", {
              id: i.data.options.id,
            }, function(t) {
              0 == t.error && i.setData({
                goodsposter: t.url
              });
              //i.emptyActive();
            })
          },
          showcoupon: function(t) { //coupon
            var a = this;
            var showModalStatus = a.data.showModalStatus ? false : true;
            a.setData({
              showModalStatus: showModalStatus,
            })
          },
          getcoupon: function(n) {
            var a = this;
            var couponid = n.currentTarget.dataset.id;
            if (!couponid || couponid == '') return e.alert('此优惠券无法领取！');
            e.post("goods/pay_coupon", {
              id: couponid,
            }, function(t) {
              if (0 == t.error) {
                e.alert('优惠券领取成功！'), a.setData({
                  showModalStatus: false,
                });
              } else e.alert(t.message);
            })
          },
          //cc_zhong 快捷导航
          openmenu: function(n) {
            var a = this;
            var quickmen = a.data.quickmen ? false : true;
            quickmen ? a.menuani("open") : a.menuani("close");
            //animation.opacity(1).step(); 
            a.setData({
              quickmen: quickmen,
            });
          },
          menuani: function(currentStatu) {
            //关闭抽屉  
            if (currentStatu == "close") {
              var animation = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });
              var animation1 = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });
              var animation2 = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });
              var animation3 = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });

              animation.translateY(0).step()
              animation1.translateY(0).step()
              animation2.translateY(0).step()
              animation3.translateY(0).step()
              this.setData({
                animationData: animation.export(),
                animationData1: animation1.export(),
                animationData2: animation2.export(),
                animationData3: animation3.export(),
              })
              // 第5步：设置定时器到指定时候后，执行第二组动画  
              setTimeout(function() {
                // 执行第二组动画：Y轴不偏移，停  
                animation.translateY(240).step()
                animation1.translateY(180).step()
                animation2.translateY(120).step()
                animation3.translateY(60).step()
                // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
                this.setData({
                  animationData: animation,
                  animationData1: animation1,
                  animationData2: animation2,
                  animationData3: animation3,
                })
              }.bind(this), 0)
              setTimeout(function() {
                this.setData({
                  flag: true
                });
              }.bind(this), 400)

            }
            // 显示抽屉  
            if (currentStatu == "open") {
              /* 动画部分 */
              // 第1步：创建动画实例   
              var animation = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });
              var animation1 = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });
              var animation2 = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });
              var animation3 = wx.createAnimation({
                duration: 400, //动画时长  
                timingFunction: "linear", //线性  
                delay: 0 //0则不延迟  
              });

              // 第2步：这个动画实例赋给当前的动画实例  
              // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停 
              animation.translateY(240).step()
              animation1.translateY(180).step()
              animation2.translateY(120).step()
              animation3.translateY(60).step()
              this.setData({
                animationData: animation.export(),
                animationData1: animation1.export(),
                animationData2: animation2.export(),
                animationData3: animation3.export(),
              })

              // 第5步：设置定时器到指定时候后，执行第二组动画  
              setTimeout(function() {
                // 执行第二组动画：Y轴不偏移，停  
                animation.translateY(0).step()
                animation1.translateY(0).step()
                animation2.translateY(0).step()
                animation3.translateY(0).step()
                // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
                this.setData({
                  animationData: animation,
                  animationData1: animation1,
                  animationData2: animation2,
                  animationData3: animation3,
                })
              }.bind(this), 0)
              this.setData({
                flag: false
              });
            }
          },
      })