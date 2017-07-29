// index.js
var pingyin = require("../../../utils/pinyin.js");
var url;
var cate = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  mileage:function(e){
      this.setData({
          mileage:e.detail.value,
      })
  },
  go:function(){
      //生成随机数作为订单号
      var random;
      var today=new Date;
      random = "" + Math.ceil(10 * Math.random()) + Math.ceil(10 * Math.random()) + Date.parse(today);
      var THIS=this;
      if (THIS.data.num&&THIS.data.location && THIS.data.mileage && THIS.data.seriesname && THIS.data.date){
          wx.request({
              url: getApp().globalData.serverName,
              data: {
                  a: "me",
                  op: "sellcars",
                  phone: THIS.data.num,
                  openid: getApp().globalData.openid,
                  address: THIS.data.location,
                  mileage: THIS.data.mileage,
                  brand: THIS.data.seriesname,
                  boarding: THIS.data.date,
                  randoms:random,
              },
          })
          wx.navigateTo({
              url: '../form2/index',
          })
      }
      else{
          wx.showToast({
              title: '请将信息填写完整',
              image:'../../../image/failure.png',
              duration:3000,
          })
      }
  },
  //取消车系
  filter: function () {
      this.setData({
          filterstatus: !this.data.filterstatus,
          brandstatus: 0,
          pricestatus: 0
      })
  },
  cancelseries: function (e) {
      this.setData({
          seriesname: null,
          seriesid: null,
      })
  },
  //取消品牌
  cancelcate: function (e) {
      this.setData({
          cateid: null,
          catename: null,
          serieslist: null,
          seriesname: null,
          seriesid: null,
      })
  },
  //直接选择车系
  justchoseseries: function () {
      this.setData({
          brandstatus: 1,
          subbrandstatus: 1,
      })
  },
  //选择车系
  choseseries: function (e) {
      var id = e.currentTarget.dataset.id;
      var name = e.currentTarget.dataset.name;
      this.setData({
          seriesname: name,
          seriesid: id,
      })
      this.brand();
  },
  //选择编号
  toscroll: function (event) {
      var index = event.currentTarget.dataset.index;
      this.setData({
          view: index,
      })
  },
  //副品牌筛选关闭
  subbrandclose: function () {
      this.setData({
          subbrandstatus: 0,
      })
  },
  //副品牌筛选开启,选择品牌
  subbrand: function (e) {
      if (e.currentTarget.dataset.all) {
          this.setData({
              serieslist: this.data.allcates,
              subbrandstatus: 1,
              cateid: null,
              catename: "所有品牌",
          })
      }
      else {
          var cateid = e.currentTarget.dataset.cateid;
          var catename = e.currentTarget.dataset.catename;
          for (var key in cate) {
              if (cate[key].id == cateid) {
                  this.setData({
                      serieslist: cate[key].tree.nodes,
                      serieslogo: cate[key].tree.thumb,
                  })
              }
          }
      }
      this.setData({
          subbrandstatus: 1,
          cateid: cateid,
          catename: catename,
      })
  },
  //主品牌筛选切换,退出时提交品牌表单
  brand: function () {
      var THIS = this;
      var pcate = this.data.cateid;
      var cates = this.data.seriesid;
      this.setData({
          brandstatus: !this.data.brandstatus,
          pricestatus: 0,
          filterstatus: 0,
          orderstatus: 0,
      })
  },
  bindDateChange: function (e) {
      this.setData({
          date: e.detail.value,
      })
  },
  location:function(){
      var THIS=this;
      wx.chooseLocation({
          success: function(res) {
             THIS.setData({
                 location:res.address,
             })
          },
      })
  },
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
      var THIS=this;
      this.setData({
          brandstatus: 0,
          subbrandstatus: 0,
          num:options.num,
      })
      //接入品牌数据
      url = getApp().globalData.serverName + "&a=category&op=list";
      wx.request({
          url: url,
          success: function (res) {
              //把参数分成26组
              var categroup = [{ name: "A", lists: [] }, { name: "B", lists: [] }, { name: "C", lists: [] }, { name: "D", lists: [] }, { name: "E", lists: [] }, { name: "F", lists: [] }, { name: "G", lists: [] }, { name: "H", lists: [] }, { name: "I", lists: [] }, { name: "J", lists: [] }, { name: "K", lists: [] }, { name: "L", lists: [] }, { name: "M", lists: [] }, { name: "N", lists: [] }, { name: "O", lists: [] }, { name: "P", lists: [] }, { name: "Q", lists: [] }, { name: "R", lists: [] }, { name: "S", lists: [] }, { name: "T", lists: [] }, { name: "U", lists: [] }, { name: "V", lists: [] }, { name: "W", lists: [] }, { name: "X", lists: [] }, { name: "Y", lists: [] }, { name: "Z", lists: [] }];
              // var cates = [{ cateid: 1, catename: "别克", series: [{ name: "车辆1", id: "1" }, { name: "车辆2", id: "2" }] }, { cateid: 2, catename: "奥迪", series: [{ name: "车辆3", id: "3" }, { name: "车辆4", id: "4" }] }, { cateid: 3, catename: "东风", series: [{ name: "车辆5", id: "5" }, { name: "车辆6", id: "6" }] }]
              var cates = res.data;
              var allcates = [];
              cate = res.data;
              for (var key in cates) {
                  allcates = allcates.concat(cates[key].tree.nodes);
                  for (var i in categroup) {
                      cates[key].chinese = pingyin.transition(cates[key].tree.name);
                      if (cates[key].chinese.substr(0, 1) == categroup[i].name) {
                          categroup[i].lists.push(cates[key]);
                      }
                  }
              }
              //设置品牌数据
              // THIS.setData({
              //     listbox: categroup,
              // })
              THIS.setData({
                  listbox: categroup,
                  allcates: allcates,
              })
          },
      })
    //   获取频幕宽度
    wx.getSystemInfo({
        success: function(res) {
            THIS.setData({
                mywidth:res.screenWidth,
                myheight:res.screenHeight,
            })
        },
    })
     var times=this.data.mywidth/375;
     this.setData({
         times:times,
     })
      var context = wx.createCanvasContext('bar')
      
      context.beginPath();
      context.arc(55, 15, 5, 1 * Math.PI,3 * Math.PI);
      context.setStrokeStyle("rgba(250, 128, 10,0.4)")
      context.setFillStyle("rgba(250, 128, 10,1)");
      context.setLineWidth(5);
      context.fill();
      context.stroke()
      context.setLineWidth(1);
      context.closePath();

      context.beginPath()
      context.setStrokeStyle("rgba(250, 128, 10,1)")
      context.setLineWidth(1);
      context.moveTo(60, 15);
      context.lineTo(175, 15);
      context.stroke()
      context.closePath();

      context.beginPath();
      context.arc(180, 15, 5, 1 * Math.PI, 3 * Math.PI);
      context.setStrokeStyle("rgba(250, 128, 10,0.4)")
      context.setFillStyle("rgba(250, 128, 10,1)");
      context.setLineWidth(5);
      context.fill();
      context.stroke()
      context.setLineWidth(1);
      context.closePath();

      context.beginPath();
      context.setStrokeStyle("rgba(144,144,144,1)")
      context.setLineWidth(1);
      context.moveTo(188, 15);
      context.lineTo(310,15);
      context.stroke()
      context.closePath();


      context.beginPath();
      context.arc(315, 15, 5, 1 * Math.PI, 3 * Math.PI);
      context.setStrokeStyle("rgba(144,144,144,0.4)")
      context.setFillStyle("rgba(144,144,144,1)");
      context.setLineWidth(5);
      context.fill();
      context.closePath();
      context.stroke()
      context.draw()
      
    //   context.setStrokeStyle("#00ff00")
    //   context.setLineWidth(5)
    //   context.rect(0, 0, 200, 200)
    //   context.stroke()
    //   context.setStrokeStyle("#ff0000")
    //   context.setLineWidth(2)
    //   context.moveTo(160, 100)
    //   context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    //   context.moveTo(140, 100)
    //   context.arc(100, 100, 40, 0, Math.PI, false)
    //   context.moveTo(85, 80)
    //   context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    //   context.moveTo(125, 80)
    //   context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    //   context.stroke()
    //   context.draw()
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