wx.cloud.init()
let City = require('../../utils/allcity.js');
let Navigation_bar_lists = require('../template/navigation-bar/navigation-bar.js')
let Classify = require('../template/hot-car/hot-car.js')
// import getcity from './getcity'
const db = wx.cloud.database();
Page({
  data: {
    navigation_bar_lists: Navigation_bar_lists,
    city: City,
    // inCity:'',
    myCity: '南昌',
    isCityTrue: false,
    status: '',
    ads: [],
    cars: [],
    beforeColor: "#CBD1D9", //指示点颜色
    afterColor: "#22A038", //当前选中的指示点颜色
    classify: Classify,
    pageNum: 5,
    page: 1,
    hiddenLoading: false,
  },
  //云数据库分页加载数据
  getcarinfo: function() {
    let page = this.data.page
    wx.cloud.callFunction({
        name: 'getcarinfo',
        data: {
          strict:false,
          page: page,
          pageSize:18,
          city:this.data.myCity
        }
      })
      .then(res => {
        let data = res.result.data
        let cars = [...data, ...this.data.cars]
        console.log(cars)
        this.setData({
          hiddenLoading: true,
          cars: cars
        })
      })
  },

  onLoad: function(options) {
    db.collection('ads').get({
      success: (res) => {
        // console.log(res)
        this.setData({
          ads: res.data
        })
      }
    })
    this.getcarinfo(),
    this.setData({
      status: 1,
    })
  },
  //状态选择
  showStatus: function(e) {
    var st = e.currentTarget.dataset.status
    this.setData({
      status: st,
    })
  },
  //打开城市选择
  showCity: function() {
    this.setData({
      isCityTrue: true
    })
  },
  //关闭城市选择
  hideCity: function() {
    this.setData({
      isCityTrue: false
    })
  },
  refreshCity(e) {
    this.setData({
      myCity: e.detail.name,
      cars:''
    })
    this.getcarinfo()
    this.setData({
      isCityTrue :!this.data.isCityTrue
    })
  },
  toDetailPage: function(e) {
    let src = e.currentTarget.dataset.src
    wx.navigateTo({
      url: src
    })
  },
  onReceiveMessage(e) {
    this.setData({
      myCity: e.detail.name
    })
  },
  toMore: function(e) {
    wx.navigateTo({
      url: '../detail/second_hand_car/index',
    })
  },
  toAll:function(e){
    wx.navigateTo({
      url: '../detail/second_hand_car/index'
    })
  },
  toInfo(e){
    let key = e.currentTarget.dataset.key
    wx.navigateTo({
      url: './info/info?key='+key,
    })
  },
  onShareAppMessage: (res) => {
    return {
      title: '二手车',
      path: 'pages/detail/second_hand_car/index',
      success: res => {
        console.log('转发成功')
      },
      fail: res => {
        console.log('转发失败')
      }
    }
  }
})
