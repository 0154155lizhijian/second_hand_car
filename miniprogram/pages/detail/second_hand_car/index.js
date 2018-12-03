let City = require('../../../utils/allcity.js');
wx.cloud.init();
const db = wx.cloud.database()
Page({
  data: {
    city: City,
    myCity: '南昌',
    isCityTrue: false,
    cars:[],
    pageNum:5,
    hiddenLoading: false,
    page:1,
    isrank1:false,
    isrank2:false,
    isrank3:false,
    isrank4:false,
  },
  //云数据库分页加载数据
  getcarinfo: function () {
    let page = this.data.page
    // console.log(title)
    wx.cloud.callFunction({
      name: 'getcarinfo',
      data: {
        page: page,
      }
    })
    .then(res => {
      let data = res.result.data
      let cars = [...data, ...this.data.cars]
      console.log(cars)
      this.setData({
        hiddenLoading: true,
        cars:cars
      })
    })
  },

  onLoad: function (options) {
    this.getcarinfo()
  },
  onReachBottom() {
    if (this.data.page<=this.data.pageNum) {
      wx.showToast({
        title: '加载更多',
        image: '../../../images/loading.gif'
      })
      let page = this.data.page + 1;
      this.setData({
        page: page
      });
      this.getcarinfo()
      console.log('到页面底部了');
    }
  
  },
  //排序
  rank1:function(e){
    this.setData({
      isrank1 : !this.data.isrank1
    })
  },
  rank2:function(e){
    this.setData({
      isrank2 : !this.data.isrank2
    })
  },
  rank3:function(e){
    this.setData({
      isrank3: !this.data.isrank3
    })
  },
  rank4:function(e){
    this.setData({
      isrank4 : !this.data.isrank4
    })
  },
  //打开城市选择
  showCity: function () {
    this.setData({
      isCityTrue: true
    })
  },
  //关闭城市选择
  hideCity: function () {
    this.setData({
      isCityTrue: false
    })
  },
  bindtap(e) {
    this.setData({
      myCity: e.detail.name
    })
  },
  back(e){
    wx.navigateTo({
      url: '../../index/index'
    })
  }

})

