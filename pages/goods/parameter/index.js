// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cases:[],
  },
  getLocalTime: function (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
  },
  click:function(e){
      console.log(e.currentTarget.dataset.index);
     var index=e.currentTarget.dataset.index;
     var cases=this.data.cases;
     cases[index] = !cases[index];
     this.setData({
         cases:cases,
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
      var THIS = this;
      var id = options.id;
      wx.request({
          url: getApp().globalData.serverName,
          data: {
              goodsid: id,
              a: "goods",
              op: "onegoods"
          },
          success: function (res) {
              var createtime=res.data.dat.goods.createtime;
              createtime = THIS.getLocalTime(createtime);
              THIS.setData({
                  report: res.data.dat.accidents,
                  detail: res.data.dat,
                  createtime:createtime,
              })
          },
      })
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