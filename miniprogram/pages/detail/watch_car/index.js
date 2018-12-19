Page({

  data: {

  },
  toLast(){
    wx.navigateBack({
      delta: 1
      })
  },
  toIndex(){
    wx.navigateTo({
      url: '../../index/index'
    })
  }

})