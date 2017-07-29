// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cases: [],
    },
    click: function (e) {
        console.log(e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        var cases = this.data.cases;
        cases[index] = !cases[index];
        this.setData({
            cases: cases,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS=this;
        var id=options.id;
        wx.request({
            url: getApp().globalData.serverName,
            data: {
                goodsid: id,
                a: "goods",
                op: "onegoods"
            },
            success:function(res){
                THIS.setData({
                    report:res.data.dat.accidents,
                    detail:res.data.dat,
                })
                // var data=res.dat.dat.accidents;
                // var accident=data.accident.split(",");
                // var driver=data.driver.split(",");
                // var interior=data.interior.split(",");
                // var safe=data.safe.split(",");
                //组装安全参数
            },
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