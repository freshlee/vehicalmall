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
    getLocalTime: function (nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
    },
    jump: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../read/index?id=' + id,
        })
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
                a:"goods",
                op:"noticelist",
            },
            success:function(res){
                var list=res.data.dat.notice;
                var before=[];
                var after=[];
                for(var key in list){
                    list[key].createtime = THIS.getLocalTime(list[key].createtime);
                    if(list[key].type==0){
                        before.push(list[key])
                    }
                    else{
                        after.push(list[key])           
                    }
                }
                THIS.setData({
                    list:list,
                    before:before,
                    after:after,
                })
                THIS.all();
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
    all: function () {
        var THIS=this;
        this.setData({
            index: 0,
            myindex: 0,
            listnow:THIS.data.list,
        })
    },
    before: function () {
        var THIS = this;
        this.setData({
            index: 1,
            myindex: 1,
            listnow: THIS.data.before,
        })
    },
    after: function () {
        var THIS = this;
        this.setData({
            index: 2,
            myindex: 2,
            listnow: THIS.data.after,
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