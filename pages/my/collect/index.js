// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myindex: 0,
        thetop: -110,
        status: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    jump: function (e) {

    },
    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS=this;
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        wx.request({
            url: getApp().globalData.serverName,
            data:{
                op:"gzlist",
                a:"me",
                openid: getApp().globalData.openid,
            },
            success:function(res){
                var data=res.data.dat.list;
                var onsale=[];
                var oversale=[];
                for(var key in data){
                    if(data[key].ok==1){
                       oversale.push(data[key]);
                    }
                    else{
                        onsale.push(data[key]);
                    }
                }
                  THIS.setData({
                      onsale:onsale,
                      oversale:oversale,
                  })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var THIS = this;
        wx.getSystemInfo({
            success: function (res) {
                THIS.setData({
                    myheight: res.screenHeight,
                })
            },
        })
    },
    video: function () {
        this.setData({
            index: 0,
            myindex: 0,
        })
    },
    course: function () {
        this.setData({
            index: 1,
            myindex: 1,
        })
    },
    article: function () {
        this.setData({
            index: 2,
            myindex: 2,
        })
    },
    teacher: function () {
        this.setData({
            index: 2,
            myindex: 2,
        })
    },
    remark: function () {
        this.setData({
            index: 3,
            myindex: 3,
        })
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