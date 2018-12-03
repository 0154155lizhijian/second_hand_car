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
          page: page,
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
  onReachBottom() {
    if (this.data.page <= this.data.pageNum) {
      let page = this.data.page + 1;
      this.setData({
        page: page
      });
      this.getcarinfo()
    }
    console.log('到页面底部了');
  },
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
  bindtap(e) {
    this.setData({
      myCity: e.detail.name
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
  }

})