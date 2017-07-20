//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo();
  },

  getUserInfo: function(cb) {
    //   var that = this
    //   if (this.globalData.userInfo) {
    //       typeof cb == "function" && cb(this.globalData.userInfo)
    //   } else {
    //   }
    var THIS=this;
      wx.login({
          success: function (res) {
              //获取OPENID
              wx.request({
                  url: 'https://api.cnmmsc.org/ljf_api.php?api=getopenid',
                  data: {
                      code: res.code,
                      acid: 499,
                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  success: function (response) {
                      var openid = response.data.openid;
                      //全局变量抓取OPENID
                      THIS.globalData.openid = openid;
                      wx.getUserInfo({
                          success: function (res) {
                              var info = res.userInfo;
                              //向后台发送个人信息
                              wx.request({
                                  url: getApp().globalData.serverName,
                                  data: {
                                      'a':"login",
                                      'op':"register",
                                      'openid': openid,
                                      'avatarUrl': info.avatarUrl,
                                      'name': info.nickName,
                                      'gender': info.gender,
                                      'province': info.province,
                                      'city': info.city,
                                      'uniacid': 2,
                                  },

                              })
                              console.log(getApp().globalData.openid);
                          },
                      })
                  },
              })
          }
      })
  },

  globalData: {
    userInfo: 1111,
    serverName: "http://192.168.1.213/API/index.php?c=wxlcar&acid=" + 2 ,
    acid:2,
  }
})
