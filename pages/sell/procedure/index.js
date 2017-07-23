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
  onLoad: function (options) {
      var THIS = this;
      this.setData({
          status:3,
      })
      //   获取频幕宽度
      wx.getSystemInfo({
          success: function (res) {
              THIS.setData({
                  mywidth: res.screenWidth,
                  myheight: res.screenHeight,
              })
          },
      })
      var times = this.data.mywidth / 375;
      this.setData({
          times: times,
      })
      var context = wx.createCanvasContext('bar')
    //   1阶段
      context.beginPath();
      context.setLineWidth(4);
      context.setStrokeStyle(this.data.status >= 2 ? "rgba(250, 128, 10, 1)" :"#454545");
      context.moveTo(0,0);
      context.lineTo(0,145);
      context.stroke();
      context.closePath();
    //   2阶段
      context.beginPath()
      context.setStrokeStyle(this.data.status >= 3 ? "rgba(250, 128, 10, 1)" : "#454545");
      context.moveTo(0, 145);
      context.lineTo(0,260)
      context.stroke();
      context.closePath();
    //   3阶段
      context.beginPath()
      context.setStrokeStyle(this.data.status >= 4 ? "rgba(250, 128, 10, 1)" : "#454545");
      context.moveTo(0, 260);
      context.lineTo(0, 375)
      context.stroke();
      context.closePath();


      context.stroke();
      context.draw();
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