wx.cloud.init();
Page({
  data: {
    car: [],
  },
  onLoad: function (options) {
    let key = options.key
    wx.cloud.callFunction({
      name: 'toinfo',
      data: {
        key:key
      }
    })
    .then(res => {
      let data = res.result.data
      let [car]=data;   //结构
      this.setData({
        hiddenLoading: true,
        car
      })
    })
  },
  goback(e){
    wx.navigateTo({
      url: '../index',
    })
  },
  toDiscounts(e){
    wx.navigateTo({
      url:'../../discount/index'
    })
  },
  toCar(e){
    wx.navigateTo({
      url:'../../watch_car/index'
    })
  }
})