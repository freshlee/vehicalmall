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
  phone:function(e){
      var phone=e.detail.value;
      this.setData({
          phone:phone,
      })
  },
  jump:function(){
      var phone=this.data.phone;
      if(phone){
          wx.navigateTo({
              url: '../form1/index?num='+phone,
          })
      }
      else{
          wx.showToast({
              title: '请输入正确手机号',
              image:"../../image/failure.png"
          })
      }
  },
  getLocalTime: function (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
  },
  onLoad: function (options) {
      var THIS=this;
      var cateid=options.cateid;
      this.setData({
          versioninfo: getApp().globalData.version,
      })
      var result=options.result;
      var cityname=options.cityname;
      var num = options.num;
      var catename = options.catename;
      var mile = options.mile;
      var date = options.date;
      this.setData({
          resulte:result,
          cityname:cityname,
          catename: catename,
          mile: mile,
          num: num,
          date:date,
      })
      wx.request({
          url: getApp().globalData.serverName,
          data:{
              a:"goods",
              op:"sc",
              cates:cateid,
          },
          success:function(res){
              var data=res.data.dat.goods
              for(var key in data){
                  data[key].dealtime=THIS.getLocalTime(data[key].oktimes);
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