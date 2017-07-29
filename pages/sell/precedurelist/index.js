// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  jump:function(e){
       var id = e.currentTarget.dataset.id;
       wx.navigateTo({
           url: '../procedure/index?id='+id,
       })
  },
  getLocalTime: function (nS) {
      var day= new Date(parseInt(nS) * 1000);
      var res = day.getFullYear() + "年" + (day.getMonth() + 1) + "月" + day.getDate() + "日";
      return res;
  },
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })  
      var THIS=this;
      wx.request({
          url: getApp().globalData.serverName,
          data: {
              a: "me",
              op: "selllist",
              openid: getApp().globalData.openid,
          },
          success:function(res){
              var list = res.data.dat.sell;
              for(var key in list){
                  var statusname;
                  switch (list[key].status){
                      case "1": statusname = "提交信息"; break;
                      case "2": statusname = "上门服务"; break;
                      case "3": statusname = "买家看车"; break;
                      case "4": statusname = "交易过户"; break;
                  }
                  list[key].date = THIS.getLocalTime(list[key].times);
                  list[key].statusname = statusname;
              }
              THIS.setData({
                  list:list,
              })
          }
      })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
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