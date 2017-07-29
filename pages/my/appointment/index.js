// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getLocalTime: function (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
  },
  onLoad: function (options) {
      var THIS=this;
      this.setData({
          versioninfo: getApp().globalData.version,
      })
      wx.request({
          url: getApp().globalData.serverName,
          data:{
              a:"me",
              op:"mclist",
              openid: getApp().globalData.openid,
          },
          success:function(res){
              var data=res.data.dat.mc;
              for(var key in data){
                  data[key].date=THIS.getLocalTime(data[key].times)
              }
              THIS.setData({
                  list:data,
              })
          }
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