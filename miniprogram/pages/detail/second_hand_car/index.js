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
    status:'',
    liststatus_1:'',
    liststatus_3:'',
    liststatus_4:'',
    floorstatus: false,
  },
  //云数据库分页加载数据
  getcarinfo: function () {
    let page = this.data.page
    wx.cloud.callFunction({
      name: 'getcarinfo',
      data: {
        strict:false,
        page: page,
        pageSize:10,
        city:this.data.myCity
      }
    })
    .then(res => {
      let data = res.result.data
      let cars = [...data, ...this.data.cars]
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
    let st = e.currentTarget.dataset.status
    this.setData({
      isrank1 : !this.data.isrank1,
      status:st
    })
  },
  rank2:function(e){
    let st = e.currentTarget.dataset.status
    this.setData({
      isrank2 : !this.data.isrank2,
      status:st
    })
  },
  rank3:function(e){
    let st = e.currentTarget.dataset.status
    this.setData({
      isrank3: !this.data.isrank3,
      status:st
    })
  },
  rank4:function(e){
    let st = e.currentTarget.dataset.status
    this.setData({
      isrank4 : !this.data.isrank4,
      status:st
    })
  },
  rankList1_1:function(e){
    let liststatus = e.currentTarget.dataset.liststatus_1
    this.setData({
      page:1,
      liststatus_1:liststatus,
      cars:[],
      isrank1:!this.data.isrank1
    })
    this.getcarinfo()
  },
  rankList1_2:function(e){
    let that=this
    rankList1(e,that)
    rankList('price','asc',that)
  },
  rankList1_3:function(e){
    let that=this
    rankList1(e,that)
    rankList('price','desc',that)
  },
  rankList1_4:function(e){
    let that=this
    rankList1(e,that)
    rankList('kilometer','asc',that)
  },
  rankList1_5:function(e){
    let that=this
    rankList1(e,that)
    rankList('year','desc',that)
  },
  rankList3_1:function(e){
    let that = this;
    rankList3(e,that);
    priceRange(0,1000,that)
  },
  rankList3_2:function(e){
    let that = this;
    rankList3(e,that);
    priceRange(0,5,that)
  },
  rankList3_3:function(e){
    let that = this;
    rankList3(e,that);
    priceRange(5,10,that)
  },
  rankList3_4:function(e){
    let that = this;
    rankList3(e,that);
    priceRange(10,20,that)
  },
  rankList3_5:function(e){
    let that = this;
    rankList3(e,that);
    priceRange(20,1000,that)
  },
  rankList4_1:function(e){
    let that = this;
    rankList4(e,that)
    typeSelect('严选车',that)
  },
  rankList4_2:function(e){
    let that = this;
    rankList4(e,that)
    typeSelect('超值车源',that)
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
  refreshCity(e) {
    this.setData({
      myCity: e.detail.name,
      cars:''
    })
    this.getcarinfo()
  },
  back(e){
    wx.navigateTo({
      url: '../../index/index'
    })
  },
  toInfo(e){
    let key = e.currentTarget.dataset.key
    wx.navigateTo({
      url: './info/info?key='+key,
    })
  },
   // 获取滚动条当前位置
 onPageScroll: function (e) {
  if (e.scrollTop > 100) {
    this.setData({
      floorstatus: true
    });
  } else {
    this.setData({
      floorstatus: false
    });
  }
},

//回到顶部
goTop: function (e) {  // 一键回到顶部
  if (wx.pageScrollTo) {
    wx.pageScrollTo({
      scrollTop: 0
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
},

})

function rankList(type,sort,that){
  wx.cloud.callFunction({
    name: 'rank',
    data: {
      strict:false,
      page: that.data.page,
      type: type,
      sort:sort,
    }
  })
  .then(res => {
    let data = res.result.data
    that.setData({
      hiddenLoading: true,
      cars:data
    })
  })
}
function priceRange(lower,high,that){
  wx.cloud.callFunction({
    name: 'pricerange',
    data: {
      strict:false,
      lower:lower,
      high:high
    }
  })
  .then(res => {
    let data = res.result.data
    that.setData({
      hiddenLoading: true,
      cars:data
    })
  })
}
function typeSelect(type,that){
  wx.cloud.callFunction({
    name: 'typeselect',
    data: {
      type:type
    }
  })
  .then(res => {
    let data = res.result.data
    that.setData({
      hiddenLoading: true,
      cars:data
    })
  })
}
function rankList1(e,that){
  let liststatus = e.currentTarget.dataset.liststatus_1
    that.setData({
      page:6,
      liststatus_1:liststatus,
      cars:[],
      isrank1:!that.data.isrank1
    })
}
function rankList3(e,that){
  let liststatus = e.currentTarget.dataset.liststatus_3
    that.setData({
      page:6,
      liststatus_3:liststatus,
      cars:[],
      isrank3:!that.data.isrank3
    })
}
function rankList4(e,that){
  let liststatus = e.currentTarget.dataset.liststatus_4
  that.setData({
    page:6,
    liststatus_4:liststatus,
    cars:[],
    isrank4:!that.data.isrank4
  })
}

