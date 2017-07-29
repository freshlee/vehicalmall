// index.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    inputnum: function (res) {
        this.setData({
            num: res.detail.value,
        })
    },
    toestimate: function () {
        wx.navigateTo({
            url: '../estimate/index',
        })
    },
    checkMobile: function (mobile) {
        var sMobile = mobile;
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))) {
            return false;
        }
        else{
            return true;
        }
    },
    tosell: function (e) {
        var num = this.data.num;
        var test=this.checkMobile(num);
        if (test) {
            wx.navigateTo({
                url: '../form1/index?num=' + num,
            })
        }
        else {
            wx.showToast({
                title: '请填写正确的手机号码',
            })
        }
    },
    statuschange: function (e) {
        var index = e.currentTarget.dataset.index;
        var expendnow = this.data.expend;
        console.log(expendnow[index]);
        if (expendnow[index] == 0) {
            expendnow[index] = 1;
            console.log(1)
        }
        else {
            expendnow[index] = 0;
            console.log()
        }
        this.setData({
            expend: expendnow,
        })
    },
    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS=this;
        this.setData({
            expend: [],
        })
        wx.request({
            url: getApp().globalData.serverName,
            data:{
                a:"me",
                op:"brlist",
            },
            success:function(res){
                var data=res.data.dat.briefing;
                console.log(data);
                for(var key in data){
                    WxParse.wxParse('content[' + key + ']', 'html', data[key].detail, THIS, 5);
                }
                THIS.setData({
                    reactive:data,
                })
            }
        })
        //获取BANNER图片
        wx.request({
            url: getApp().globalData.serverName,
            data:{
                a:"me",
                op:"mcnav",
            },
            success:function(res){
                THIS.setData({
                    banner: res.data.dat.mcnav,
                })
            }
        })
        //获取多少位预约信息
        wx.request({
            url: getApp().globalData.serverName,
            data:{
                a:"me",
                op:"dsw",
            },
            success:function(res){
                THIS.setData({
                    total:res.data.dat.count,
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