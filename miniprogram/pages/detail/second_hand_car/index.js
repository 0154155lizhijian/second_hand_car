wx.cloud.init({ })
let City = require('../../../utils/allcity.js');
Page({
  data: {
    city: City,
    myCity: '南昌',
    isCityTrue: false,
  },

  onLoad: function (options) {
    
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

