// index.js
Page({

  /**
   * 页面的初始数据
   */
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
  data: {
      items: [
          { name: '1', value: '服务不专业' },
          { name: '2', value: '带看不及时', checked: 'true' },
          { name: '3', value: '产品问题' },
          { name: '4', value: '乱收费' },
          { name: '5', value: '车描述不符' },
          { name: '6', value: '车况不属实' },
          { name: '7', value: '退款相关' },
          { name: '8', value: '停售改价' },
          { name: '9', value: '其他' },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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