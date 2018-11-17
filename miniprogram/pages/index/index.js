wx.cloud.init({

})
let City = require('../../utils/allcity.js');
// import getcity from './getcity'
const db = wx.cloud.database();

Page({
  data: {
    city:City,
    // inCity:'',
    myCity:'南昌',
    isCityTrue: false,
    status:1,
    ads: [],
    beforeColor: "#CBD1D9",//指示点颜色
    afterColor: "#22A038",//当前选中的指示点颜色
    classify:[
      {type:'5万以下',
       hasIcon:false,
       icon:''
    },
    {type:'5-10万',
    hasIcon:false,
    icon:''
    }, {type:'10-15万',
    hasIcon:false,
    icon:''
    },{type:'15万以上',
    hasIcon:false,
    icon:''
    },{type:'大众',
    hasIcon:true,
    icon:'../../images/dazhong.png'
    },{type:'日产',
    hasIcon:true,
    icon:'../../images/richan.png'
    },{type:'现代',
    hasIcon:true,
    icon:'../../images/xiandai.png'
    },{type:'吉利',
    hasIcon:true,
    icon:'../../images/jili.png'
    },{type:'别克',
    hasIcon:true,
    icon:'../../images/bieke.jpg'
    },{type:'雪佛兰',
    hasIcon:true,
    icon:'../../images/xuefulan.png'
    },{type:'丰田',
    hasIcon:true,
    icon:'../../images/fengtian.png'
    },{type:'更多',
    hasIcon:true,
    icon:'../../images/more.png'
    },],

    navigation_bar_lists:
      [
        [{
          category:'二手车',
          icon_type :'che',
          color:'#0DC62A',
          fontsize:'40rpx',
        },{
          category:'严选车',
          icon_type :'mai',
          color:'#6671ED',
          fontsize:'60rpx',
        },{
          category:'免费卖车',
          icon_type:'qiandai',
          color:'#13DDB2',
          fontsize:'40rpx',
        },{
          category:"快速卖车",
          icon_type:"mai1",
          color:'#FFA441',
          fontsize:'30rpx',
        },{
          category:"估价",
          icon_type:"maichegujiapsd01",
          color:'#F75B5B',
          fontsize:'40rpx',
        },{
          category:"查成交",
          icon_type:"chengjiao",
          color:'#2A92ED',
          fontsize:'40rpx',
        },{
          category:"准新车",
          icon_type:"haopingwuxing",
          color:'#F65655',
          fontsize:'40rpx',
        },{
          category:"降价急售",
          icon_type:"shandian",
          color:'#FFCF43',
          fontsize:'40rpx',
        }
      ]
      ,[
        {
          category:"今日超值",
          icon_type:"fire",
          color:'#FC781B',
          fontsize:'40rpx'
        },{
          category:"练手车",
          icon_type:"quxuechelian",
          color:'#0CC129',
          fontsize:'38rpx'
        },{
          category:"热销排行",
          icon_type:"guest-branch",
          color:'#FFA23E',
          fontsize:'40rpx' 
        },{
          category:"百科",
          icon_type:"baike-tianchong",
          color:'#3194EF',
          fontsize:'40rpx'
        }
      ]
    ],
  },
  
  onLoad: function () {

    db.collection("ads").get({
      success: res => {
        this.setData({
          ads: res.data
        })
      }
    })
  },
  showStatus:function(e){
    var st = e.currentTarget.dataset.status
    this.setData({
      status:st,
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

  
  bindtap(e){
    this.setData({
      myCity:e.detail.name
    })
  },
})
 
