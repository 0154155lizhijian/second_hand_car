var Time = require('../../../utils/time.js');
var Endtime = require('../../../utils/time2')
Page({
  data: {
    isGain:false,
    storageGain:false,
    nowtime:'',
    endtime:''
  },
  onLoad: function(options) {
    if(!this.data.isGain){
      wx.setStorage({
        key: 'isGain',
        data: false,
      })
    }
    const that = this;
    changeState(that)
  },

  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  get:function(e){
    wx.setStorage({
      key: 'isGain',
      data: true
    })
    wx.setStorage({
      key: 'nowtime',
      data: this.data.nowtime
    })
    wx.setStorage({
      key:'endtime',
      data:this.data.endtime
    })
    let that = this;
    changeState(that)
  }
})
function changeState(that){

  let storageGain = wx.getStorageSync('isGain')
  that.setData({
    storageGain:storageGain
  })

  if(!that.data.storageGain){
    let endtime = Endtime.formatTime(new Date());
    let nowtime = Time.formatTime(new Date());
    that.setData({
      nowtime,
      endtime,
      isGain:that.data.storageGain
    })
  }

  if(that.data.storageGain){
    let nowtime = wx.getStorageSync('nowtime')
    let endtime = wx.getStorageSync('endtime')
    that.setData({
      nowtime,
      endtime,
      isGain:that.data.storageGain
    })
  }
}