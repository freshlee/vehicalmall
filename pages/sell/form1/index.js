// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
      console.log(this.data.brandstatus)
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
      var cateid = e.currentTarget.dataset.cateid;
      var catename = e.currentTarget.dataset.catename;
      var serieslist = e.currentTarget.dataset.serieslist;
      this.setData({
          subbrandstatus: 1,
          cateid: cateid,
          catename: catename,
          serieslist: serieslist,
      })
  },
  //主品牌筛选切换
  brand: function () {
      this.setData({
          brandstatus: !this.data.brandstatus,
          pricestatus: 0,
          filterstatus: 0,
      })
  },

  onLoad: function (options) {
      var THIS=this;
      this.setData({
          brandstatus: 0,
          subbrandstatus: 0,
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
      context.arc(55, 15, 5, 1 * Math.PI,3.5 * Math.PI);
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
      context.arc(180, 15, 5, 1 * Math.PI, 3.5 * Math.PI);
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
      context.arc(315, 15, 5, 1 * Math.PI, 3.5 * Math.PI);
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