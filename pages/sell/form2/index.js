// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        poly: [{ name: "您的预算是多少？(单位/万)", maxvalue: 50, minvalue: 0, step: 10, min: 0, max: 50, interval: 1, keyname: "exhaust" },],
        price: [{ checked: false, id: "0", name: "黑色", color: "black" }, { checked: false, id: "1", name: "白色", color: "white" }, { checked: false, id: "2", name: "银灰色", color: "#f4f4f4" }, { checked: false, id: "3", name: "深灰色", color: "grey" }, { checked: false, id: "4", name: "红色", color: "red" }, { checked: false, id: "5", name: "橙色", color: "orange" }, { checked: false, id: "6", name: "绿色", color: "green" }, { checked: false, id: "7", name: "蓝色", color: "blue" }, { checked: false, id: "8", name: "咖啡色", color: "coffee" }, { checked: false, id: "9", name: "紫色", color: "purple" }, { checked: false, id: "10", name: "香槟色", color: "#F7E7CE" }, { checked: false, id: "11", name: "黄色", color: "yellow" }, { checked: false, id: "12", name: "其他", color: "" }],
        location: [{ checked: false, id: "0", name: "买新车" }, { checked: false, id: "1", name: "买二手车" },{ checked: false, id: "2", name: "不买车" }],
        nation: [{ checked: false, id: "0", name: "德系" }, { checked: false, id: "1", name: "日系" }, { checked: false, id: "2", name: "美系" }, { checked: false, id: "3", name: "法系" }, { checked: false, id: "4", name: "韩系" }, { checked: false, id: "5", name: "国产" }],
        seat: [{ checked: false, id: "0", name: "二座" }, { checked: false, id: "1", name: "四座" }, { checked: false, id: "2", name: "五座" }, { checked: false, id: "3", name: "六座" }, { checked: false, id: "4", name: "七座及以上" },]
    },
    submit:function(e){
        var data=e.detail.value;
        if(data.min==0&&data.max==50){
            data.budget ="预算不确定"
        }
        else if(data.min==0&&data.manx!=50){
            data.budget="计划"+data.nax+"万以下";
        }
        else if (data.min != 0 && data.manx == 50) {
            data.budget = "计划" + data.min + "万以上";
        }
        else{
            data.budget = "计划" + data.min  + "-" + data.max+ "万元";
        }
        wx.request({
            url: getApp().globalData.serverName + "&a=me&op=sellcars&openid=" + getApp().globalData.openid,
            data: data,
        })
        wx.switchTab({
            url: '../home/index',
        })

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
    checkboxChange: function (e) {
        var index = e.currentTarget.dataset.index;
        var value = e.detail.value;
        console.log(value);
        var total = this.data.superfilter;
        for (var key in total[index].list) {
            var proof = total[index].list[key].name;
            if (value == proof) {
                // if (total[index].list[key].checked == false){
                //     var storage = total[index].list[key].name;
                //     totop.push(storage);
                // }
                total[index].list[key].checked = true;
            }
            else {
                total[index].list[key].checked = false;
            }
            // console.log("begin");
            // console.log(proof);
            // if (value.length != 0) {
            //     for (var i in value) {
            //     }
            // }
            // else {
            //     total[index].list[key].checked = false;
            // }
        }
        this.setData({
            superfilter: total,
        })
    },

    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        var superfilter = [{ name: "plan", chinese: "卖车后续计划", list: THIS.data.location },
        { name: "favoured", chinese: "您偏爱的品牌是？", list: THIS.data.nation },
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
        context.arc(55, 15, 5, 1 * Math.PI, 3 * Math.PI);
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
        context.arc(180, 15, 5, 1 * Math.PI, 3 * Math.PI);
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
        context.arc(315, 15, 5, 1 * Math.PI, 3 * Math.PI);
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