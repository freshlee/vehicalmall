// index.js
var pingyin = require("../../../utils/pinyin.js");
var url;
var cate = [];
Page({

    /**
     * 页面的初始数据
     */
    phone:function(e){
        var num=e.detail.value;
         this.setData({
             num:num,
         })
    },
    mile: function (e) {
        var mile = e.detail.value;
        this.setData({
            mile: mile,
        })
    },
    submit:function(e){
        var num=this.data.num;
        var cityname=this.data.cityname;
        var mile=this.data.mile;
        var date=this.data.date;
        var cates=this.data.seriesid;
        var catename=this.data.seriesname;
        if(num&&cityname&&mile&&date&&cates){
            var THIS = this;
            wx.request({
                url: getApp().globalData.serverName,
                data: {
                    a: "goods",
                    op: "fl",
                    pcate: THIS.data.cateid,
                    cates: THIS.data.seriesid,
                },
                success: function (res) {
                    var list = res.data.dat.goods;
                    if (list.length) {
                        var sum = 0;
                        var reduce = 1;
                        var today = new Date;
                        console.log(THIS.data.date);
                        console.log(today.getFullYear());
                        var rate = 0.9 - 0.05 * (today.getFullYear() - THIS.data.date.substr(0, 4));
                        for (var key in list) {
                            sum += list[key].productprice;
                        }
                        var avg = sum / list.length;
                        var result = avg * rate;
                        wx.navigateTo({
                            url: '../result/index?result=' + result + '&mile=' + mile + "&date=" + date + "&catename=" + catename + "&cityname=" + cityname + '&cateid=' + cates ,
                        })
                    }
                    else {
                        wx.showToast({
                            title: '评估失败，系统无法评估',
                            duration: 0,
                        })
                    }

                },
            })
        }
        else{
            wx.showToast({
                title: '请填入完整信息',
                image:'../../image/failure.png',
            })
        }
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
    chosecity: function (e) {
        var cityid = e.currentTarget.dataset.id;
        var cityname = e.currentTarget.dataset.name;
        this.setData({
            cityname: cityname,
            cityid: cityid,
            citystatus: 0,
        })
    },
    city: function () {
        this.setData({
            citystatus: !this.data.citystatus,
        })
    },
    data: {
        tips: ["短期内不卖车，仅来估计", "着急卖车，希望1周内卖出", "不着急卖车，1-2个月内卖出即可", "我是来买车的，来看看市面价"]
    },
    bindrChange: function (e) {
        this.setData({
            purpose: this.data.tips[e.detail.value],
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value,
        })
    },
    /**
 * 生命周期函数--监听页     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        wx.getLocation({
            success: function (res) {
                console.log(res);
                //获得目前城市
                wx.request({
                    url: 'http://apis.map.qq.com/ws/geocoder/v1/?key=ASCBZ-BCQW6-U3KSD-M3PEU-SLI4F-A2FSP&get_poi=1',
                    data: {
                        location: res.latitude + "," + res.longitude,
                    },
                    success: function (res) {
                        THIS.setData({
                            cityname: res.data.result.address_component.city,
                            cityid: res.data.result.ad_info.city_code,
                        })
                    }
                })
            },
        })
        wx.request({
            url: 'http://apis.map.qq.com/ws/district/v1/list?key=ASCBZ-BCQW6-U3KSD-M3PEU-SLI4F-A2FSP',
            success: function (res) {
                console.log(res);
                THIS.setData({
                    province: res.data.result[0],
                    city: res.data.result[1],
                })
                //把参数分成26组
                var categroup = [{ name: "A", lists: [] }, { name: "B", lists: [] }, { name: "C", lists: [] }, { name: "D", lists: [] }, { name: "E", lists: [] }, { name: "F", lists: [] }, { name: "G", lists: [] }, { name: "H", lists: [] }, { name: "I", lists: [] }, { name: "J", lists: [] }, { name: "K", lists: [] }, { name: "L", lists: [] }, { name: "M", lists: [] }, { name: "N", lists: [] }, { name: "O", lists: [] }, { name: "P", lists: [] }, { name: "Q", lists: [] }, { name: "R", lists: [] }, { name: "S", lists: [] }, { name: "T", lists: [] }, { name: "U", lists: [] }, { name: "V", lists: [] }, { name: "W", lists: [] }, { name: "X", lists: [] }, { name: "Y", lists: [] }, { name: "Z", lists: [] }];
                var cates = res.data.result[1];
                for (var key in cates) {
                    for (var i in categroup) {
                        var chinese = pingyin.transition(cates[key].name);
                        if (chinese.substr(0, 1) == categroup[i].name) {
                            categroup[i].lists.push(cates[key]);
                        }
                    }
                }
                console.log(categroup);
                //设置品牌数据
                THIS.setData({
                    citybox: categroup,
                })
            }
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
            },
        })
        //初始化状态数据
        wx.location
        this.setData({
            searchstatus: 0,
            citystatus: 0,
        })
        var THIS = this;
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

        console.log(categroup);
        //设置品牌数据
        THIS.setData({
            listbox: categroup,
            brandstatus: 0,
            subbrandstatus: 0,
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