wx.cloud.init({

})
let City = require('../../utils/allcity.js');
let Navigation_bar_lists = require('../template/navigation-bar/navigation-bar.js')
let Classify = require('../template/hot-car/hot-car.js')
// import getcity from './getcity'
const db = wx.cloud.database();
const car1Promise = new Promise((resolve, reject) => {
  db.collection("car").get({
    success: res => {
      this.setData({
        car1: res.data
      })
    }
  });
  resolve();
})
const car2Promise = new Promise((resolve,reject) => {
  db.collection("car").skip(20).get({
    success: res => {
      this.setData({
        car2: res.data
      })
    }
  });
  resolve()
})
const carPromise = new Promise((resolve,reject) => {
  db.collection("car").skip(40).get({
    success: res => {
      var car = [...this.data.car1, ...this.data.car2, ...res.data]
      console.log(car)
      this.setData({
        cars: car
      })
    }
  });
  resolve()
})

Page({
  data: {
    navigation_bar_lists: Navigation_bar_lists,
    city: City,
    // inCity:'',
    myCity: '南昌',
    isCityTrue: false,
    status: 1,
    ads: [],
    beforeColor: "#CBD1D9",//指示点颜色
    afterColor: "#22A038",//当前选中的指示点颜色
    car1: [],
    car2: [],
    cars: [],
    classify: Classify,
  },

  onLoad: function () {

    db.collection("ads").get({
      success: res => {
        this.setData({
          ads: res.data
        })
      }
    })
    // car1Promise()
  //   new Promise((resolve,reject)=>{
  //     db.collection("car").get({
  //       success:res => {
  //         this.setData({
  //           car1:res.data
  //         })
  //       }
  //     });
  //     resolve(),(err)=>{
  //       console.log(err)
  //     };
  // })
  // .then(
  //   res => {
  //     db.collection("car").skip(20).get({
  //       success:res => {
  //         this.setData({
  //           car2:res.data
  //         })
  //       }
  //     });
    //  resolve(),(err) => {
    //    console.log(err)
    //  }
  //   }
  // )
  // .then(
  //   res => {
  //     db.collection("car").skip(40).get({
  //       success:res => {
  //         var car = [...this.data.car1,...this.data.car2,...res.data]
  //         console.log(car)
  //         this.setData({
  //           cars:car
  //         })
  //         }  
  //     });
  
  //   }

  // )

    // getCars()
  },
  showStatus: function (e) {
    var st = e.currentTarget.dataset.status
    this.setData({
      status: st,
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
  toDetailPage: function (e) {
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

})
const getCars = () => {
  new Promise((resolve, reject) => {
    db.collection("car").get({
      success: res => {
        this.setData({
          car1: res.data
        })
      }
    });
    resolve(1);
  }).then(
    res => {
      console.log(res)
    }
  )
}








