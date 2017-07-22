// index.js
var pingyin = require("../../utils/pinyin.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        poly:[{name:"排量",maxvalue:5,minvalue:0,step:1,min:0,max:5,interval:1,keyname:"exhaust"},
        {keyname:"distance",name:"行程",maxvalue:15,minvalue:0,step:1,min:0,max:5,interval:1}],
        price: [{ checked: false, id: "0", name: "黑色", color: "black" }, { checked: false, id: "1", name: "白色", color: "white" }, { checked: false, id: "2", name: "银灰色", color: "#f4f4f4" }, { checked: false, id: "3", name: "深灰色", color: "grey" }, { checked: false, id: "4", name: "红色", color: "red" }, { checked: false, id: "5", name: "橙色", color: "orange" }, { checked: false, id: "6", name: "绿色", color: "green" }, { checked: false, id: "7", name: "蓝色", color: "blue" }, { checked: false, id: "8", name: "咖啡色", color: "coffee" }, { checked: false, id: "9", name: "紫色", color: "purple" }, { checked: false, id: "10", name: "香槟色", color: "#F7E7CE" }, { checked: false, id: "11", name: "黄色", color: "yellow" }, { checked: false, id: "12", name: "其他", color: "" }],
        location: [{ checked: false, id: "0", name: "本地牌照" }, { checked: false, id: "1", name: "外地牌照" }],
        nation: [{ checked: false, id: "0", name: "德系" }, { checked: false, id: "1", name: "日系" }, { checked: false, id: "2", name: "美系" }, { checked: false, id: "3", name: "法系" }, { checked: false, id: "4", name: "韩系" }, { checked: false, id: "5", name: "国产" }, { checked: false, id: "6", name: "其他" }],
        fuel: [{ checked: false, id: "0", name: "汽油" }, { checked: false, id: "1", name: "柴油" }, { checked: false, id: "2", name: "电动" }, { checked: false, id: "3", name: "油电混合" }, { checked: false, id: "4", name: "其他" }],
        gear: [{ checked: false, id: "0", name: "手动" }, { checked: false, id: "1", name: "自动" }],
        exhaust: [{ checked: false, id: "0", name: "国二及以上" }, { checked: false, id: "1", name: "国三及以上" }, { checked: false, id: "2", name: "国四及以上" }, { checked: false, id: "3", name: "国五" }],
        color: [{ checked: false, id: "0", name: "黑色", color: "black" }, { checked: false, id: "1", name: "白色", color: "white" }, { checked: false, id: "2", name: "银灰色", color: "#f4f4f4" }, { checked: false, id: "3", name: "深灰色", color: "grey" }, { checked: false, id: "4", name: "红色", color: "red" }, { checked: false, id: "5", name: "橙色", color: "orange" }, { checked: false, id: "6", name: "绿色", color: "green" }, { checked: false, id: "7", name: "蓝色", color: "blue" }, { checked: false, id: "8", name: "咖啡色", color: "coffee" }, { checked: false, id: "9", name: "紫色", color: "purple" }, { checked: false, id: "10", name: "香槟色", color: "#F7E7CE" }, { checked: false, id: "11", name: "黄色", color: "yellow" }, { checked: false, id: "12", name: "其他", color: "" }],
        seat: [{ checked: false, id: "0", name: "二座" }, { checked: false, id: "1", name: "四座" }, { checked: false, id: "2", name: "五座" }, { checked: false, id: "3", name: "六座" }, { checked: false, id: "4", name: "七座及以上" },]

    },
    cancelprice:function(e){
        var key = e.currentTarget.dataset.key;
        var price = this.data.price;
        price[key].checked = false;
        this.setData({
            price: price,
        })
        this.topricetop();
    },
    priceChange: function (e){
        var value = e.detail.value;
        var price = this.data.price;
        for(var key in price){
        var proof = price[key].id;
        if(value.length!=0){
            for (var i in value) {
                if (value[i] == proof) {
                    price[key].checked = true;
                    break;
                }
                else {
                    price[key].checked = false;
                }
            }
        }
        else{
            price[key].checked = false;
        }
        }
        this.setData({
            price: price,
        })
        this.topricetop();
    },
    topricetop:function(){
        var totop = [];
        var price = this.data.price;
            for (var key in price) {
                if (price[key].checked == true) {
                    totop.push({ name: price[key].name, key: key })
                }
            }
        this.setData({
            topricetop: totop,
        })
        console.log(totop);
    },
    price: function () {
        var THIS = this
        this.setData({
            pricestatus: !THIS.data.pricestatus,
            brandstatus:0,
            filterstatus:0,
        })
        console.log(this.data.pricestatus);
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
            if(value.length!=0){
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
            else{
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
        var superfilter = [{ name: "location", chinese: "本地牌照", list: THIS.data.location },
        { name: "nation", chinese: "国别", list: THIS.data.nation },
        { name: "fuel", chinese: "油耗", list: THIS.data.fuel },
        { name: "gear", chinese: "变速箱", list: THIS.data.gear },
        { name: "exhaust", chinese: "排标准量", list: THIS.data.exhaust },
        { name: "seat", chinese: "座位数", list: THIS.data.seat }
        ];
        this.setData({
            superfilter: superfilter,
        })

        //初始化参数
        this.setData({
            brandstatus: 0,
            subbrandstatus: 0,
            filterstatus: 0,
            minage: 0,
            maxage: 8,
            mindistance: 0,
            maxdistance: 15,
            minexhaust: 0,
            maxexhaust: 5,
            pricestatus: 0,
        })
        //获取屏幕高度
        wx.getSystemInfo({
            success: function (res) {
                THIS.setData({
                    myheight: res.screenHeight,
                })
            },
        })
        //把参数分成26组
        var categroup = [{ name: "A", lists: [] }, { name: "B", lists: [] }, { name: "C", lists: [] }, { name: "D", lists: [] }, { name: "E", lists: [] }, { name: "F", lists: [] }, { name: "G", lists: [] }, { name: "H", lists: [] }, { name: "I", lists: [] }, { name: "J", lists: [] }, { name: "K", lists: [] }, { name: "L", lists: [] }, { name: "M", lists: [] }, { name: "N", lists: [] }, { name: "O", lists: [] }, { name: "P", lists: [] }, { name: "Q", lists: [] }, { name: "R", lists: [] }, { name: "S", lists: [] }, { name: "T", lists: [] }, { name: "U", lists: [] }, { name: "V", lists: [] }, { name: "W", lists: [] }, { name: "X", lists: [] }, { name: "Y", lists: [] }, { name: "Z", lists: [] }];
        var cates = [{ cateid: 1, catename: "别克", series: [{ name: "车辆1", id: "1" }, { name: "车辆2", id: "2" }] }, { cateid: 2, catename: "奥迪", series: [{ name: "车辆3", id: "3" }, { name: "车辆4", id: "4" }] }, { cateid: 3, catename: "东风", series: [{ name: "车辆5", id: "5" }, { name: "车辆6", id: "6" }] }]
        for (var key in cates) {
            for (var i in categroup) {
                cates[key].chinese = pingyin.transition(cates[key].catename);
                if (cates[key].chinese.substr(0, 1) == categroup[i].name) {
                    categroup[i].lists.push(cates[key]);
                }
            }
        }
        console.log(categroup);
        //设置品牌数据
        THIS.setData({
            listbox: categroup,
        })
    },
    max: function (e) {
        var index=e.currentTarget.dataset.index;
        var max = e.detail.value;
        var poly=this.data.poly;
        console.log(poly);
        if (max <= poly[index].min) {
            poly[index].max=poly[index].min+poly[index].interval;
        }
        else{
          poly[index].max=max;
        }
            this.setData({
                poly: poly,
            })

    },
    min: function (e) {
        var index=e.currentTarget.dataset.index;
        var min = e.detail.value;
        var poly=this.data.poly;
        if (min >= poly[index].max) {
            poly[index].min=poly[index].max-poly[index].interval;
        }
        else{
          poly[index].min=min;
        }
        this.setData({
            poly: poly,
        })
    },
    maxexhaust: function (e) {
        var maxexhaust = e.detail.value;
        if (maxexhaust <= this.data.minexhaust) {
            this.setData({
                maxexhaust: this.data.minexhaust + 0.5,
            })
        }
        else {
            this.setData({
                maxexhaust: maxexhaust,
            })
        }
    },
    minexhaust: function (e) {
        var minexhaust = e.detail.value;
        if (this.data.maxexhaust <= minexhaust) {
            this.setData({
                minexhaust: this.data.maxexhaust - 0.5,
            })
        }
        else {
            this.setData({
                minexhaust: minexhaust,
            })
        }
    },
    maxdistance: function (e) {
        var maxdistance = e.detail.value;
        if (maxdistance <= this.data.mindistance) {
            this.setData({
                maxdistance: this.data.mindistance + 1,
            })
        }
        else {
            this.setData({
                maxdistance: maxdistance,
            })
        }
    },
    mindistance: function (e) {
        var mindistance = e.detail.value;
        if (this.data.maxdistance <= mindistance) {
            this.setData({
                mindistance: this.data.maxdistance - 1,
            })
        }
        else {
            this.setData({
                mindistance: mindistance,
            })
        }
    },
    maxage: function (e) {
        var maxage = e.detail.value;
        if (maxage <= this.data.minage) {
            this.setData({
                maxage: this.data.minage + 1,
            })
        }
        else {
            this.setData({
                maxage: maxage,
            })
        }
    },
    minage: function (e) {
        var minage = e.detail.value;
        if (this.data.maxage <= minage) {
            this.setData({
                minage: this.data.maxage - 1,
            })
        }
        else {
            this.setData({
                minage: minage,
            })
        }
    },
    //拖动小球
    slidering: function (e) {
        console.log(e);
        var left = e.touches[0].clientX - 15.5;
        this.setData({
            left: left,
        })
    },
    //取消车系
    filter: function () {
        this.setData({
            filterstatus: !this.data.filterstatus,
            brandstatus:0,
            pricestatus:0
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
            pricestatus:0,
            filterstatus:0,
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