// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        poly: [{ name: "您的预算是多少？(单位/万)", maxvalue: 5, minvalue: 0, step: 1, min: 0, max: 5, interval: 1, keyname: "exhaust" },],
        price: [{ checked: false, id: "0", name: "黑色", color: "black" }, { checked: false, id: "1", name: "白色", color: "white" }, { checked: false, id: "2", name: "银灰色", color: "#f4f4f4" }, { checked: false, id: "3", name: "深灰色", color: "grey" }, { checked: false, id: "4", name: "红色", color: "red" }, { checked: false, id: "5", name: "橙色", color: "orange" }, { checked: false, id: "6", name: "绿色", color: "green" }, { checked: false, id: "7", name: "蓝色", color: "blue" }, { checked: false, id: "8", name: "咖啡色", color: "coffee" }, { checked: false, id: "9", name: "紫色", color: "purple" }, { checked: false, id: "10", name: "香槟色", color: "#F7E7CE" }, { checked: false, id: "11", name: "黄色", color: "yellow" }, { checked: false, id: "12", name: "其他", color: "" }],
        location: [{ checked: false, id: "0", name: "买新车" }, { checked: false, id: "1", name: "买二手车" },{ checked: false, id: "2", name: "不买车" }],
        nation: [{ checked: false, id: "0", name: "德系" }, { checked: false, id: "1", name: "日系" }, { checked: false, id: "2", name: "美系" }, { checked: false, id: "3", name: "法系" }, { checked: false, id: "4", name: "韩系" }, { checked: false, id: "5", name: "国产" }],
        seat: [{ checked: false, id: "0", name: "二座" }, { checked: false, id: "1", name: "四座" }, { checked: false, id: "2", name: "五座" }, { checked: false, id: "3", name: "六座" }, { checked: false, id: "4", name: "七座及以上" },]

    },
    max: function (e) {
        var index = e.currentTarget.dataset.index;
        var max = e.detail.value;
        var poly = this.data.poly;
        console.log(poly);
        if (max <= poly[index].min) {
            poly[index].max = poly[index].min + poly[index].interval;
        }
        else {
            poly[index].max = max;
        }
        this.setData({
            poly: poly,
        })

    },
    min: function (e) {
        var index = e.currentTarget.dataset.index;
        var min = e.detail.value;
        var poly = this.data.poly;
        if (min >= poly[index].max) {
            poly[index].min = poly[index].max - poly[index].interval;
        }
        else {
            poly[index].min = min;
        }
        this.setData({
            poly: poly,
        })
    },
    //取消车系
    filter: function () {
        this.setData({
            filterstatus: !this.data.filterstatus,
            brandstatus: 0,
            pricestatus: 0
        })
    },
    cancelseries: function (e) {
        this.setData({
            seriesname: null,
            seriesid: null,
        })
    },
    //取消品牌
    cancelcate: function (e) {
        this.setData({
            cateid: null,
            catename: null,
            serieslist: null,
            seriesname: null,
            seriesid: null,
        })
    },
    //直接选择车系
    justchoseseries: function () {
        this.setData({
            brandstatus: 1,
            subbrandstatus: 1,
        })
    },
    //选择车系
    choseseries: function (e) {
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        this.setData({
            seriesname: name,
            seriesid: id,
        })
        this.brand();
        console.log(this.data.brandstatus)
    },
    //选择编号
    toscroll: function (event) {
        var index = event.currentTarget.dataset.index;
        this.setData({
            view: index,
        })
    },
    //副品牌筛选关闭
    subbrandclose: function () {
        this.setData({
            subbrandstatus: 0,
        })
    },
    //副品牌筛选开启,选择品牌
    subbrand: function (e) {
        var cateid = e.currentTarget.dataset.cateid;
        var catename = e.currentTarget.dataset.catename;
        var serieslist = e.currentTarget.dataset.serieslist;
        this.setData({
            subbrandstatus: 1,
            cateid: cateid,
            catename: catename,
            serieslist: serieslist,
        })
    },
    //主品牌筛选切换
    brand: function () {
        this.setData({
            brandstatus: !this.data.brandstatus,
            pricestatus: 0,
            filterstatus: 0,
        })
    },
    //取消选择
    cancelfilter: function (e) {
        var index = e.currentTarget.dataset.index;
        var key = e.currentTarget.dataset.key;
        var total = this.data.superfilter;
        console.log(total[index]);
        total[index].list[key].checked = false;
        this.setData({
            superfilter: total,
        })
        this.totop();
    },
    checkboxChange: function (e) {
        var index = e.currentTarget.dataset.index;
        var value = e.detail.value;
        var total = this.data.superfilter;
        for (var key in total[index].list) {
            console.log("begin");
            var proof = total[index].list[key].id;
            if (value.length != 0) {
                for (var i in value) {
                    if (value[i] == proof) {
                        // if (total[index].list[key].checked == false){
                        //     var storage = total[index].list[key].name;
                        //     totop.push(storage);
                        // }
                        total[index].list[key].checked = true;
                        break;
                    }
                    else {
                        total[index].list[key].checked = false;
                    }
                }
            }
            else {
                total[index].list[key].checked = false;
            }
        }
        this.setData({
            superfilter: total,
        })
        this.totop();
    },
    totop: function () {
        var totop = [];
        var total = this.data.superfilter;
        for (var index in total) {
            for (var key in total[index].list) {
                if (total[index].list[key].checked == true) {
                    totop.push({ name: total[index].list[key].name, index: index, key: key })
                }
            }
        }
        this.setData({
            totop: totop,
        })
    },

    onLoad: function (options) {
        var THIS = this;
        var superfilter = [{ name: "location", chinese: "卖车后续计划", list: THIS.data.location },
        { name: "nation", chinese: "您偏爱的品牌是？", list: THIS.data.nation },
        ];
        this.setData({
            superfilter: superfilter,
            brandstatus: 0,
            subbrandstatus: 0,
        })
        //   获取频幕宽度
        wx.getSystemInfo({
            success: function (res) {
                THIS.setData({
                    mywidth: res.screenWidth,
                    myheight: res.screenHeight,
                })
            },
        })
        var times = this.data.mywidth / 375;
        this.setData({
            times: times,
        })
        var context = wx.createCanvasContext('bar')

        context.beginPath();
        context.arc(55, 15, 5, 1 * Math.PI, 3.5 * Math.PI);
        context.setStrokeStyle("rgba(250, 128, 10,0.4)")
        context.setFillStyle("rgba(250, 128, 10,1)");
        context.setLineWidth(5);
        context.fill();
        context.stroke()
        context.setLineWidth(1);
        context.closePath();

        context.beginPath()
        context.setStrokeStyle("rgba(250, 128, 10,1)")
        context.setLineWidth(1);
        context.moveTo(60, 15);
        context.lineTo(175, 15);
        context.stroke()
        context.closePath();

        context.beginPath();
        context.arc(180, 15, 5, 1 * Math.PI, 3.5 * Math.PI);
        context.setStrokeStyle("rgba(250, 128, 10,0.4)")
        context.setFillStyle("rgba(250, 128, 10,1)");
        context.setLineWidth(5);
        context.fill();
        context.stroke()
        context.setLineWidth(1);
        context.closePath();

        context.beginPath();
        context.setStrokeStyle("rgba(250, 128, 10,1)")
        context.setLineWidth(1);
        context.moveTo(188, 15);
        context.lineTo(310, 15);
        context.stroke()
        context.closePath();


        context.beginPath();
        context.arc(315, 15, 5, 1 * Math.PI, 3.5 * Math.PI);
        context.setStrokeStyle("rgba(250, 128, 10,0.4)")
        context.setFillStyle("rgba(250, 128, 10,1)");
        context.setLineWidth(5);
        context.fill();
        context.closePath();
        context.stroke()
        context.draw()

        //   context.setStrokeStyle("#00ff00")
        //   context.setLineWidth(5)
        //   context.rect(0, 0, 200, 200)
        //   context.stroke()
        //   context.setStrokeStyle("#ff0000")
        //   context.setLineWidth(2)
        //   context.moveTo(160, 100)
        //   context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        //   context.moveTo(140, 100)
        //   context.arc(100, 100, 40, 0, Math.PI, false)
        //   context.moveTo(85, 80)
        //   context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        //   context.moveTo(125, 80)
        //   context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        //   context.stroke()
        //   context.draw()
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