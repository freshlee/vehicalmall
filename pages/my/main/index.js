// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    contact:function(){
        console.log("contacting")
    },
    jump: function (e) {
        var page = e.currentTarget.dataset.page;
        wx.navigateTo({
            url: page,
        })
    },
    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                THIS.setData({
                    avatar: res.userInfo.avatarUrl,
                    username: res.userInfo.nickName,
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