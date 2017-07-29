// index.js
var goodsid;
var concernstatus;
var originstatus;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    tobook:function(res){
        var THIS=this;
        var num=res.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: num,
        })
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                var name = res.userInfo.nickName;
                var avatar = res.userInfo.avatarUrl;
                wx.request({
                    url: getApp().globalData.serverName,
                    data: {
                        a:"me",
                        op:"sellmcs",
                        openid: getApp().globalData.openid,
                        wxname:name,
                        wxtx:avatar,
                        cid: THIS.data.detail.goods.merchid,
                        goodsname:THIS.data.detail.goods.title,
                    },
                })
            }
        })
    },
    jumptopara: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../parameter/index?id=' + id,
        })
    },
    jumptoreport:function(e){
        var id= e.currentTarget.dataset.id;
        wx.navigateTo({
            url:'../report/index?id='+id,
        })
    },
    concern: function () {
        concernstatus = 1;
        this.setData({
            favor: 1,
        })
        console.log(this.data.favor);
    },
    disconcern: function () {
        concernstatus = 0;
        this.setData({
            favor: 0,
        })
    },
    getLocalTime2: function (nS) {
        var day = new Date(parseInt(nS) * 1000);
        var res = day.getFullYear() + "年" + (day.getMonth() + 1) + "月" + day.getDate() + "日";
        return res;
    },
    getLocalTime: function (nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
    },
    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        goodsid=options.id;
        concernstatus=undefined;
        originstatus=undefined;
        var THIS = this;
        wx.request({
            url: getApp().globalData.serverName,
            data: {
                goodsid: goodsid,
                a: "goods",
                op: "onegoods"
            },
            success: function (res) {
                THIS.setData({
                    detail: res.data.dat,
                })
                //处理标题头
                wx.setNavigationBarTitle({
                    title: res.data.dat.goods.title,
                })
                //数据规整化处理
                var carage = THIS.data.detail.goods.carage;
                carage = "" + Math.floor(carage) + "年" + Math.ceil(carage % 1 * 12) + "月";
                var agetime = new Date;
                agetime = agetime.setDate(agetime.getDate() - THIS.data.detail.goods.carage * 365);
                agetime = THIS.getLocalTime(agetime/1000);
                THIS.setData({
                    carage: carage,
                    agetime: agetime,
                })
                var dischargeid = THIS.data.detail.goods.discharge;
                var annual = THIS.data.detail.goods.renewal;
                var complusion = THIS.data.detail.goods.insurance;
                var commerce = THIS.data.detail.goods.commercial;
                //各种保险时间处理
                THIS.setData({
                    annual: THIS.getLocalTime2(annual),
                    complusion: THIS.getLocalTime2(complusion),
                    commerce: THIS.getLocalTime2(commerce)
                })
                //接入分类数据
                wx.request({
                    url: getApp().globalData.serverName,
                    data: {
                        openid: getApp().globalData.openid,
                        a: "goods",
                        op: "screen",
                    },
                    success: function (res) {
                        var data = res.data.dat;
                        // var superfilter = [{ name: "carmodels", chinese: "车型", list: data.carmodels },
                        // { name: "countrys", chinese: "国别", list: data.countrys },
                        // { name: "carage", chinese: "车龄", list: data.carage },
                        // { name: "colours", chinese: "颜色", list: data.colours },
                        // { name: "discharge", chinese: "排标准量", list: data.discharge },
                        // { name: "fueltype", chinese: "能源类型", list: data.fueltype },
                        // { name: "seats", chinese: "座位数", list: data.seats },
                        // { name: "displacement", chinese: "排量", list: data.displacement },
                        // { name: "mileage", chinese: "车龄", list: data.mileage }

                        // ];
                        // THIS.setData({
                        //     cates: data,
                        //     superfilter: superfilter,
                        // })
                        var discharge=data.discharge;
                        for(var key in discharge){
                            if (discharge[key].id==dischargeid){
                                THIS.setData({
                                    discharge:discharge[key].name,
                                })
                            }
                        }
                    }
                })
            }
        })
        var context = wx.createCanvasContext('firstCanvas')
        context.setStrokeStyle("#dfdfdf")
        context.setLineWidth(1)
        context.moveTo(0, 10);
        context.lineTo(45, 10)
        context.lineTo(55, 0);
        context.lineTo(65, 10);
        context.lineTo(375, 10);
        context.stroke()
        context.draw()
        //获取关注状态
        wx.request({
            url: getApp().globalData.serverName,
            data:{
               a:"me",
               op:"gz",
               goodsid:goodsid,
               openid: getApp().globalData.openid,
            },
            success: function (res) {
                THIS.setData({
                    favor: res.data.dat.gz || res.data.dat.wgz,
                })
                originstatus = res.data.dat.gz || res.data.dat.wgz;
            }
        })
        //留下脚印
        wx.request({
            url: getApp().globalData.serverName,
            data: {
                a: "me",
                op: "addfootstep",
                goodsid: goodsid,
                openid: getApp().globalData.openid,
                isfavorite:1,
            },
            success: function (res) {
                console.log("已经加入浏览记录")
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
        //关注
        console.log()
        if (concernstatus === undefined) { }
        else {
            if (concernstatus == 1 && originstatus == 0) {
                wx.request({
                    url: getApp().globalData.serverName+ "&isfavorite=1",
                    data: {
                        a: "me",
                        op: "toggle",
                        goodsid: goodsid,
                        openid: getApp().globalData.openid,
                    },
                })
            }
            else if (concernstatus == 0 && originstatus == 1) {
                wx.request({
                    url: getApp().globalData.serverName +  "&isfavorite=0",
                    data: {
                        a: "me",
                        op: "toggle",
                        goodsid: goodsid,
                        openid: getApp().globalData.openid,
                    },
                })
            }
        }
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