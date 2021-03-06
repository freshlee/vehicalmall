// index.js
var pingyin = require("../../utils/pinyin.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    dosearch:function(e){
        this.setData({
            hidden:false,
        })
        var THIS=this;
        var title=e.detail.value; 
        for (var key in title){
           title=title[key];
        }
        console.log(title)
        wx.request({
            url: getApp().globalData.serverName,
            data:{
                a:"goods",
                op:"likegoods",
                title:title,
            },
            success:function(res){
                THIS.setData({
                    searchlist: res.data.dat.goods,
                    hidden: true,
                })
            }
        })
    },
    jumptodetail:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../goods/detail/index?id=' + id,
        })
    },
    jumptoarticle:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../read/index?id='+id,
        })
    },
    jump:function(e){
        var page=e.currentTarget.dataset.page;
        if(page=="../sell/home/index"||page=="../filter/index"||page=="../my/main/index"){
           wx.switchTab({
               url: page,
           })            
        }
        else{
            wx.navigateTo({
                url: page,
            })
        }
    },
    tonews:function(){
        wx.navigateTo({
            url: '../news/index',
        })
    },
    tofilterbrand:function(e){
        var id = e.currentTarget.dataset.id;
        getApp().globalData.brand = id;
        wx.switchTab({
            url: "../filter/index",
        }) 
    },
    tofilterfirst:function(e){
        var id = e.currentTarget.dataset.id;
        getApp().globalData.carmodels=id;
        wx.switchTab({
            url: "../filter/index",
        })
    },
    tofiltersecond: function (e) {
        var id = e.currentTarget.dataset.id;
        getApp().globalData.discharge = id;
        wx.switchTab({
            url: "../filter/index",
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
    search: function () {
        this.setData({
            searchstatus: !this.data.searchstatus,
        })
    },
    choscity: function () {

    },
    //选择编号
    toscroll: function (event) {
        var index = event.currentTarget.dataset.index;
        this.setData({
            view: index,
        })
        wx.showToast({
            title: index,
        })
    },
    onLoad: function (options) {
        var THIS = this;
        this.setData({
            hidden:true,
        })
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
                THIS.setData({
                    listbox: categroup,
                })
            }
        })
        //初始化状态数据
        wx.location
        this.setData({
            searchstatus: 0,
            citystatus: 0,
        })
        var THIS = this;
        wx.getSystemInfo({
            success: function (res) {
                THIS.setData({
                    myheight: res.screenHeight,
                })
            },
        })
        //获取首页信息
        wx.request({
            url: getApp().globalData.serverName,
            data: {
                openid: getApp().globalData.openid,
                a: "index",
            },
            success: function (res) {
                var nav=res.data.nav;
                var probe = /cate=\d*/
                for(var key in nav){
                        if(nav[key].url.match(probe)) {
                        var id = nav[key].url.match(probe)[0];
                        var id = id.substring(5);
                        nav[key].id =  + id
                    }
                }
                res.data.nav=nav;
                console.log(res);
                THIS.setData({
                    home: res.data,
                })
            }
        })
        //获取分类信息
        wx.request({
            url: getApp().globalData.serverName,
            data:{
                a:"goods",
                op:"screen"
            },
            success:function(res){
                THIS.setData({
                    firstrow:res.data.dat.carmodels,
                    secondrow:res.data.dat.discharge,
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
        this.setData({
            versioninfo: getApp().globalData.version,
        })  
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