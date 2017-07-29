// index.js
var pingyin = require("../../utils/pinyin.js");
var cate = [];
var url;
var maxpage;
var page;
var datastatus;
var sliderbox = [];
var done = 0;

Page({

    /**
     * 页面的初始数据
     */
    jumptodetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../goods/detail/index?id=' + id,
        })
    },
    end: function (res) {
        return false;
    },
    custom: function () {
        this.price();
        this.dofilter();
    },
    data: {
        poly: [{ name: "车龄(年)", maxvalue: 10, minvalue: 0, step: 1, min: 0, max: 10, interval: 1, keyname: "carage" },
        { keyname: "mileage", name: "行程(万公里)", maxvalue: 15, minvalue: 0, step: 1, min: 0, max: 15, interval: 1 }
        ],
        price: [{ checked: false, id: "1", min: "", max: "", name: "不限", color: "white" },
        { checked: false, id: "2", min: "0", max: "3", name: "3万以下", color: "#f4f4f4" },
        { checked: false, id: "3", min: "3", max: "5", name: "3-5万", color: "grey" },
        { checked: false, id: "4", min: "5", max: "7", name: "5-7万", color: "red" },
        { checked: false, id: "5", min: "7", max: "9", name: "7-9万", color: "orange" },
        { checked: false, id: "6", min: "9", max: "12", name: "9-12万", color: "green" },
        { checked: false, id: "7", min: "12", max: "16", name: "12-16万", color: "blue" },
        { checked: false, id: "8", min: "16", max: "20", name: "16-20万", color: "coffee" },
        { checked: false, id: "9", min: "20", max: "2000", name: "20万以上", color: "purple" }],
        location: [{ checked: false, id: "0", name: "本地牌照" }, { checked: false, id: "1", name: "外地牌照" }],
        nation: [{ checked: false, id: "0", name: "德系" }, { checked: false, id: "1", name: "日系" }, { checked: false, id: "2", name: "美系" }, { checked: false, id: "3", name: "法系" }, { checked: false, id: "4", name: "韩系" }, { checked: false, id: "5", name: "国产" }, { checked: false, id: "6", name: "其他" }],
        fuel: [{ checked: false, id: "0", name: "汽油" }, { checked: false, id: "1", name: "柴油" }, { checked: false, id: "2", name: "电动" }, { checked: false, id: "3", name: "油电混合" }, { checked: false, id: "4", name: "其他" }],
        gear: [{ checked: false, id: "0", name: "手动" }, { checked: false, id: "1", name: "自动" }],
        exhaust: [{ checked: false, id: "0", name: "国二及以上" }, { checked: false, id: "1", name: "国三及以上" }, { checked: false, id: "2", name: "国四及以上" }, { checked: false, id: "3", name: "国五" }],
        color: [{ checked: false, id: "0", name: "黑色", color: "black" }, { checked: false, id: "1", name: "白色", color: "white" }, { checked: false, id: "2", name: "银灰色", color: "#f4f4f4" }, { checked: false, id: "3", name: "深灰色", color: "grey" }, { checked: false, id: "4", name: "红色", color: "red" }, { checked: false, id: "5", name: "橙色", color: "orange" }, { checked: false, id: "6", name: "绿色", color: "green" }, { checked: false, id: "7", name: "蓝色", color: "blue" }, { checked: false, id: "8", name: "咖啡色", color: "coffee" }, { checked: false, id: "9", name: "紫色", color: "purple" }, { checked: false, id: "10", name: "香槟色", color: "#F7E7CE" }, { checked: false, id: "11", name: "黄色", color: "yellow" }, { checked: false, id: "12", name: "其他", color: "" }],
        seat: [{ checked: false, id: "0", name: "二座" }, { checked: false, id: "1", name: "四座" }, { checked: false, id: "2", name: "五座" }, { checked: false, id: "3", name: "六座" }, { checked: false, id: "4", name: "七座及以上" },]

    },
    cancelage: function () {
        var poly = this.data.poly;
        poly[0].max = 10;
        poly[0].min = 0;
        this.setData({
            agemin: null,
            agemax: null,
            poly: poly,
        })
        this.dofilter();
    },
    cancelmileage: function () {
        var poly = this.data.poly;
        poly[1].max = 10;
        poly[1].min = 0;
        this.setData({
            mileagemin: null,
            mileagemax: null,
            poly: poly,
        })
        this.dofilter();
    },
    dofilter: function () {
        this.setData({
            hidden: false,
        })
        var THIS = this;
        var result = [];
        var topricetop = this.data.topricetop || [];
        var totop = this.data.totop || [];
        var cateid = this.data.cateid || null;
        var seriesid = this.data.seriesid || null;
        var times = this.data.times || null;
        var pr = this.data.pr || null;
        //解析数价格区间

        var min;
        var max;
        switch (pr) {
            case "1": min = ""; max = ""; break;
            case "2": min = 0; max = 3; break;
            case "3": min = 3; max = 5; break;
            case "4": min = 5; max = 7; break;
            case "5": min = 7; max = 9; break;
            case "6": min = 9; max = 12; break;
            case "7": min = 12; max = 16; break;
            case "8": min = 16; max = 20; break;
            case "9": min = 20; max = 10000; break;
        }
        console.log(seriesid);
        result = topricetop.concat(totop);
        result.push({ formname: "pcate", id: cateid });
        result.push({ formname: "cates", id: seriesid });
        result.push({ formname: "agemax", id: THIS.data.agemax ? THIS.data.agemax : 200000 });
        result.push({ formname: "agemin", id: THIS.data.agemin ? THIS.data.agemin : 0 });
        result.push({ formname: "mileagemax", id: THIS.data.mileagemax ? THIS.data.mileagemax : 200000 });
        result.push({ formname: "mileagemin", id: THIS.data.mileagemin ? THIS.data.mileagemin : 0 });
        result.push({ formname: "pr", id: THIS.data.pr });
        result.push({ formname: "age", id: THIS.data.age });
        result.push({ formname: "mile", id: THIS.data.mile });
        result.push({ formname: "times", id: THIS.data.times });
        result.push({ formname: "min", id: THIS.data.min ? THIS.data.min : 0 });
        result.push({ formname: "max", id: THIS.data.max == 40 ? 200000 : THIS.data.max ? THIS.data.max : 200000 });
        console.log(result);
        var row = result;
        var i = 0;
        var box = [[]];
        while (row.length) {
            console.log(row.length)
            var res = 0;
            for (var key in box) {
                if (box[key].length == 0 || box[key][0].formname == row[0].formname) {
                    box[key].push(row[0])
                    row.splice(0, 1);
                    res = 1;
                    break;
                }
            }
            if (res == 0) {
                box.push([]);
                box[box.length - 1].push(row[0]);
                row.splice(0, 1);
            }
        }
        console.log(box);
        var allrequest = "";
        for (var key in box) {
            var name = box[key][0].formname;
            var request = "&" + name + "=";
            var newbox = [];
            for (var i in box[key]) {
                newbox.push(box[key][i].id)
            }
            request = request + newbox;
            allrequest += request;
        }
        url = getApp().globalData.serverName + allrequest + "&a=goods&op=fl";
        console.log(url)
        if (datastatus == 0) {
            console.log("重新加载")
            page = 1;
            wx.request({
                url: url,
                data: {
                    page: page,
                },
                success: function (res) {
                    maxpage = Math.ceil(parseInt(res.data.dat.total) / res.data.dat.pagesize);
                    console.log(maxpage);
                    THIS.setData({
                        goods: res.data.dat.goods,
                        hidden: true,
                    })
                },
            })
        }
        else {
            console.log("继续加载")
            wx.request({
                url: url,
                data: {
                    page: page,
                },
                success: function (res) {
                    maxpage = Math.ceil(parseInt(res.data.dat.total) / res.data.dat.pagesize);
                    console.log(maxpage);
                    var newdata = res.data.dat.goods;
                    var olddata = THIS.data.goods;
                    THIS.setData({
                        goods: res.data.dat.goods.concat(olddata),
                        hidden: true,
                    })
                },
            })
            datastatus = 0;
        }


        // wx.request({
        //     url: getApp().globalData.serverName + "&a=goods&op=fl",
        //     data:result,
        //     success: function (res) {
        //         THIS.setData({
        //             goods: res.data.dat.goods,
        //         })
        //     }
        // })
    },
    //提交品牌表单
    //提交高级筛选表单
    filtersubmit: function (e) {
        var THIS = this;
        THIS.dofilter();
        //发送排序请求
        // url = getApp().globalData.serverName + "&discharge=" + discharge;
        // wx.request({
        //     url: url,
        //     data:{
        //          a:"goods",
        //          op:"fl",
        //     },
        //     success:function(){
        //             THIS.setData({
        //                 goods: res.data.dat.goods,
        //             })
        //     }
        // })
    },
    choseorder: function (e) {
        var THIS = this;
        var index = e.currentTarget.dataset.index;
        this.setData({
            orderindex: index,
        })
        var times = null;
        var pr = null;
        var age = null;
        var mile = null;
        switch (index) {
            case "1": break;
            case "2": times = 1; break;
            case "3": pr = 2; break;
            case "4": pr = 1; break;
            case "5": age = 1; break;
            case "6": mile = 2; break;
        }
        this.setData({
            times: times,
            pr: pr,
            age: age,
            mile: mile,
        })
        this.dofilter();

    },
    order: function () {
        var THIS = this
        this.setData({
            orderstatus: !THIS.data.orderstatus,
        })

    },
    cancelprice: function (e) {
        // var key = e.currentTarget.dataset.key;
        // var price = this.data.price;
        // price[key].checked = false;
        this.setData({
            max: null,
            min: null,
        })
        this.topricetop();
        this.dofilter();
    },
    priceChange: function (e) {
        var THIS = this;
        var value = e.detail.value;
        var min;
        var max;
        console.log(value);
        switch (value) {
            case "1": min = ""; max = ""; break;
            case "2": min = 0; max = 3; break;
            case "3": min = 3; max = 5; break;
            case "4": min = 5; max = 7; break;
            case "5": min = 7; max = 9; break;
            case "6": min = 9; max = 12; break;
            case "7": min = 12; max = 16; break;
            case "8": min = 16; max = 20; break;
            case "9": min = 20; max = 10000; break;
        }
        THIS.setData({
            min: min,
            max: max,
        })
        THIS.dofilter();
        var price = this.data.price;
        for (var key in price) {
            var proof = price[key].id;
            if (value.length != 0) {
                for (var i in value) {
                    if (value[i] == proof) {
                        price[key].checked = true;
                        break;
                    } else {
                        price[key].checked = false;
                    }
                }
            } else {
                price[key].checked = false;
            }
        }
        this.setData({
            price: price,
        })
        this.topricetop();
        this.price;
    },
    topricetop: function () {
        var totop = [];
        var price = this.data.price;
        for (var key in price) {
            if (price[key].checked == true) {
                totop.push({ name: price[key].name, key: key, formname: "price", id: price[key].id })
            }
        }
        this.setData({
            topricetop: totop,
        })
    },
    price: function () {
        var THIS = this
        this.setData({
            pricestatus: !THIS.data.pricestatus,
            brandstatus: 0,
            filterstatus: 0,
            orderstatus: 0
        })
    },
    //取消选择
    cancelfilter: function (e) {
        var index = e.currentTarget.dataset.index;
        var key = e.currentTarget.dataset.key;
        var total = this.data.superfilter;
        total[index].list[key].checked = false;
        this.setData({
            superfilter: total,
        })
        this.totop();
        this.dofilter();
    },
    checkboxChange: function (e) {
        var index = e.currentTarget.dataset.index;
        var value = e.detail.value;
        var total = this.data.superfilter;
        for (var key in total[index].list) {
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
                    } else {
                        total[index].list[key].checked = false;
                    }
                }
            } else {
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
                    totop.push({ name: total[index].list[key].name, index: index, key: key, formname: total[index].name, id: total[index].list[key].id })
                }
            }
        }
        this.setData({
            totop: totop,
        })
    },
    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        page = 1;
        done = 0;
        datastatus = 0;
        //接入推荐品牌数据,其实是首页数据
        wx.request({
            url: getApp().globalData.serverName,
            data: {
                openid: getApp().globalData.openid,
                a: "index",
            },
            success: function (res) {
                THIS.setData({
                    home: res.data,
                })
            }
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
                var superfilter = [{ name: "carmodels", chinese: "车型", list: data.carmodels },
                { name: "countrys", chinese: "国别", list: data.countrys },
                // { name: "carage", chinese: "车龄", list: data.carage },
                { name: "colours", chinese: "颜色", list: data.colours },
                { name: "discharge", chinese: "排标准量", list: data.discharge },
                { name: "fueltype", chinese: "能源类型", list: data.fueltype },
                { name: "seats", chinese: "座位数", list: data.seats },
                { name: "displacement", chinese: "排量", list: data.displacement },
                    // { name: "mileage", chinese: "车龄", list: data.mileage }
                ];
                THIS.setData({
                    cates: data,
                    superfilter: superfilter,
                })
                //接入品牌数据
                url = getApp().globalData.serverName + "&a=category&op=list";
                wx.request({
                    url: url,
                    success: function (res) {
                        //把参数分成26组
                        var categroup = [{ name: "A", lists: [] }, { name: "B", lists: [] }, { name: "C", lists: [] }, { name: "D", lists: [] }, { name: "E", lists: [] }, { name: "F", lists: [] }, { name: "G", lists: [] }, { name: "H", lists: [] }, { name: "I", lists: [] }, { name: "J", lists: [] }, { name: "K", lists: [] }, { name: "L", lists: [] }, { name: "M", lists: [] }, { name: "N", lists: [] }, { name: "O", lists: [] }, { name: "P", lists: [] }, { name: "Q", lists: [] }, { name: "R", lists: [] }, { name: "S", lists: [] }, { name: "T", lists: [] }, { name: "U", lists: [] }, { name: "V", lists: [] }, { name: "W", lists: [] }, { name: "X", lists: [] }, { name: "Y", lists: [] }, { name: "Z", lists: [] }];
                        // var cates = [{ cateid: 1, catename: "别克", series: [{ name: "车辆1", id: "1" }, { name: "车辆2", id: "2" }] }, { cateid: 2, catename: "奥迪", series: [{ name: "车辆3", id: "3" }, { name: "车辆4", id: "4" }] }, { cateid: 3, catename: "东风", series: [{ name: "车辆5", id: "5" }, { name: "车辆6", id: "6" }] }]
                        var cates = res.data;
                        var allcates = [];
                        cate = res.data;
                        for (var key in cates) {
                            allcates = allcates.concat(cates[key].tree.nodes);
                            for (var i in categroup) {
                                cates[key].chinese = pingyin.transition(cates[key].tree.name);
                                if (cates[key].chinese.substr(0, 1) == categroup[i].name) {
                                    categroup[i].lists.push(cates[key]);
                                }
                            }
                        }
                        //设置品牌数据
                        // THIS.setData({
                        //     listbox: categroup,
                        // })
                        THIS.setData({
                            listbox: categroup,
                            allcates: allcates,
                        })
                        done = 1;
                        THIS.connect();
                        done = 0;
                    },
                })
            }
        })
        // var THIS = this;
        // var superfilter = [{ name: "location", chinese: "本地牌照", list: THIS.data.location },
        // { name: "nation", chinese: "国别", list: THIS.data.nation },
        // { name: "fuel", chinese: "油耗", list: THIS.data.fuel },
        // { name: "gear", chinese: "变速箱", list: THIS.data.gear },
        // { name: "exhaust", chinese: "排标准量", list: THIS.data.exhaust },
        // { name: "seat", chinese: "座位数", list: THIS.data.seat }
        // ];
        // this.setData({
        //     superfilter: superfilter,
        // })

        //初始化参数
        this.setData({
            brandstatus: 0,
            subbrandstatus: 0,
            orderstatus: 0,
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
        // var categroup = [{ name: "A", lists: [] }, { name: "B", lists: [] }, { name: "C", lists: [] }, { name: "D", lists: [] }, { name: "E", lists: [] }, { name: "F", lists: [] }, { name: "G", lists: [] }, { name: "H", lists: [] }, { name: "I", lists: [] }, { name: "J", lists: [] }, { name: "K", lists: [] }, { name: "L", lists: [] }, { name: "M", lists: [] }, { name: "N", lists: [] }, { name: "O", lists: [] }, { name: "P", lists: [] }, { name: "Q", lists: [] }, { name: "R", lists: [] }, { name: "S", lists: [] }, { name: "T", lists: [] }, { name: "U", lists: [] }, { name: "V", lists: [] }, { name: "W", lists: [] }, { name: "X", lists: [] }, { name: "Y", lists: [] }, { name: "Z", lists: [] }];
        // var cates = [{ cateid: 1, catename: "别克", series: [{ name: "车辆1", id: "1" }, { name: "车辆2", id: "2" }] }, { cateid: 2, catename: "奥迪", series: [{ name: "车辆3", id: "3" }, { name: "车辆4", id: "4" }] }, { cateid: 3, catename: "东风", series: [{ name: "车辆5", id: "5" }, { name: "车辆6", id: "6" }] }]
        // for (var key in cates) {
        //     for (var i in categroup) {
        //         cates[key].chinese = pingyin.transition(cates[key].catename);
        //         if (cates[key].chinese.substr(0, 1) == categroup[i].name) {
        //             categroup[i].lists.push(cates[key]);
        //         }
        //     }
        // }
        // console.log(categroup);
        //设置品牌数据
        // THIS.setData({
        //     listbox: categroup,
        // })
        this.dofilter();
    },
    max: function (e) {
        var index = e.currentTarget.dataset.index;
        var max = e.detail.value;
        var poly = this.data.poly;
        if (max <= poly[index].min) {
            poly[index].max = poly[index].min + poly[index].interval;
        } else {
            poly[index].max = max;
        }
        this.setData({
            poly: poly,
        })
        if (max == poly[index].maxvalue) {
            max = null;
        }
        if (index == '0') {
            this.setData({
                agemax: max,
            })
        }
        else {
            this.setData({
                mileagemax: max,
            })
        }
        console.log(this.data.agemax);


    },
    min: function (e) {
        var index = e.currentTarget.dataset.index;
        var min = e.detail.value;
        var poly = this.data.poly;
        if (min >= poly[index].max) {
            poly[index].min = poly[index].max - poly[index].interval;
        } else {
            poly[index].min = min;
        }
        this.setData({
            poly: poly,
        })
        if (index == '0') {
            this.setData({
                agemin: min,
            })
        }
        else {
            this.setData({
                mileagemin: min,
            })
        }
    },
    maxexhaust: function (e) {
        var maxexhaust = e.detail.value;
        if (maxexhaust <= this.data.minexhaust) {
            this.setData({
                maxexhaust: this.data.minexhaust + 0.5,
            })
        } else {
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
        } else {
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
        } else {
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
        } else {
            this.setData({
                mindistance: mindistance,
            })
        }
    },
    maxprice: function (e) {
        var maxprice = e.detail.value;
        if (maxprice <= this.data.min) {
            this.setData({
                maxprice: this.data.min + 1,
            })
        } else {
            this.setData({
                max: maxprice,
            })
        }
    },
    minprice: function (e) {
        var minprice = e.detail.value;
        if (this.data.max <= minprice) {
            this.setData({
                minprice: this.data.max - 1,
            })
        } else {
            this.setData({
                min: minprice,
            })
        }
    },
    //拖动小球
    slidering: function (e) {
        var left = e.touches[0].clientX - 15.5;
        this.setData({
            left: left,
        })
    },
    //取消车系
    filter: function () {
        this.setData({
            filterstatus: !this.data.filterstatus,
            brandstatus: 0,
            pricestatus: 0,
            orderstatus: 0,
        })
    },
    cancelseries: function (e) {
        this.setData({
            seriesname: null,
            seriesid: null,
        })
        this.dofilter();
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
        this.dofilter();
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
        this.dofilter();
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
        if (e.currentTarget.dataset.all) {
            this.setData({
                serieslist: this.data.allcates,
                subbrandstatus: 1,
                cateid: null,
                catename: "所有品牌",
            })
        }
        else {
            var cateid = e.currentTarget.dataset.cateid;
            var catename = e.currentTarget.dataset.catename;
            for (var key in cate) {
                if (cate[key].id == cateid) {
                    this.setData({
                        serieslist: cate[key].tree.nodes,
                        serieslogo: cate[key].tree.thumb,
                    })
                }
            }
        }
        this.setData({
            subbrandstatus: 1,
            cateid: cateid,
            catename: catename,
        })
    },
    //主品牌筛选切换,退出时提交品牌表单
    brand: function () {
        var THIS = this;
        var pcate = this.data.cateid;
        var cates = this.data.seriesid;
        this.setData({
            brandstatus: !this.data.brandstatus,
            pricestatus: 0,
            filterstatus: 0,
            orderstatus: 0,
        })
    },
    connect: function () {
        var THIS = this;
        var carmodels = getApp().globalData.carmodels;
        var discharge = getApp().globalData.discharge;
        var brand = getApp().globalData.brand;
        //看看基础信息加载完没
        if (done == 1 || carmodels || discharge || brand) {
            console.log("错误执行");
            //对接其他页面数据
            if (carmodels) {
                var total = THIS.data.superfilter;
                for (var key in total[0].list) {
                    if (total[0].list[key].id == carmodels) {
                        total[0].list[key].checked = true;
                    }
                    else {
                        total[0].list[key].checked = false;
                    }
                }
                THIS.setData({
                    serieslist: null,
                    serieslogo: null,
                    cateid: null,
                    catename: null,
                })
                for (var key in total[3].list) {
                    total[3].list[key].checked = false;
                }
                THIS.setData({
                    superfilter: total,
                })
                THIS.totop();
                THIS.dofilter();
                // url = getApp().globalData.serverName + "&a=goods&op=fl" + "&carmodels=" + carmodels;
                // wx.request({
                //     url: url,
                //     success: function (res) {
                //         THIS.setData({
                //             goods: res.data.dat.goods,
                //         })
                //         getApp().globalData.carmodels = null;
                //     }
                // })
            }
            if (brand) {
                var total = THIS.data.superfilter;
                console.log(cate);
                for (var key in cate) {
                    if (cate[key].id == brand) {
                        THIS.setData({
                            serieslist: cate[key].tree.nodes,
                            serieslogo: cate[key].tree.thumb,
                            cateid: cate[key].id,
                            catename: cate[key].tree.name,
                        })
                    }
                }
                for (var key in total[0].list) {
                    total[0].list[key].checked = false;
                }
                for (var key in total[3].list) {
                    total[3].list[key].checked = false;
                }
                THIS.setData({
                    superfilter: total,
                })
                THIS.dofilter();
                THIS.totop();
                getApp().globalData.brand = null;
            }
            if (discharge) {
                var total = THIS.data.superfilter;
                for (var key in total[3].list) {
                    if (total[3].list[key].id == discharge) {
                        total[3].list[key].checked = true;
                    }
                    else {
                        total[3].list[key].checked = false;
                    }
                }
                for (var key in total[0].list) {
                    total[0].list[key].checked = false;
                }
                THIS.setData({
                    serieslist: null,
                    serieslogo: null,
                    cateid: null,
                    catename: null,
                })
                THIS.setData({
                    superfilter: total,
                })
                THIS.totop();
                THIS.dofilter();
                getApp().globalData.discharge = null;
            }
        }
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
        this.connect();
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
        console.log(maxpage);
        console.log(page);
        if (page < maxpage) {
            var THIS = this;
            page += 1;
            datastatus = 1,
                this.dofilter();

        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})