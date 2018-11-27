// component/wx-index-list/wx-index-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { 
        this.resetRight(newVal);
      }
    },
    myCity: {
      type: String,
      value: "",
    },
  },

  data: {
    inCity:'',
    list: [],
    rightArr: [],// 右侧字母展示
    jumpNum: '',//跳转到那个字母
    myCityName: '请选择' // 默认我的城市

  },
  ready() {
    let data = this.data.data;
    this.resetRight(data);
    // if (this.data.myCity) {
      this.getCity()
    // }
  },
  methods: {
    
    // 数据重新渲染
    resetRight(data) {
      let rightArr = []
      for (let i in data) {
        rightArr.push(data[i].title.substr(0, 1));
      }
      this.setData({
        list: data,
        rightArr
      })
    },
    getCity() {
      wx.getLocation({
        success: (res) => {
          let lat = res.latitude
          let lon = res.longitude
          this.setData({
            lat,
            lon,
          });
          // 引入SDK核心类
          const map = require('../../utils/qqmap-wx-jssdk');
  
          // 实例化API核心类
          const demo = new map({
            key: 'ZSWBZ-EYACV-UIXPK-UJRVF-SLSTF-6AFGN' // 必填
          });
          // 调用接口
          demo.reverseGeocoder({
            location: {
              latitude: this.data.lat,
              longitude: this.data.lon,
            },
            success: (res) => {
                const inCity = res.result.address_component.city.substring(0,res.result.address_component.city.length-1)
              this.setData({
                inCity:inCity
              });
            },
            fail: (res) => {
              console.log('fail')
            },
            complete: (res) => {
              console.log('complete')
            }
          });
        },
      })
    },
    // 右侧字母点击事件
    jumpMt(e) {
      let jumpNum = e.currentTarget.dataset.id;
      this.setData({ jumpNum });
    },
    // 列表点击事件
    detailMt(e) {
      let detail = e.currentTarget.dataset.detail;
      
      let myEventOption = {
        bubbles: false,//事件是否冒泡
        composed: false,//事件是否可以穿越组件边界
        capturePhase: false //事件是否拥有捕获阶段
      } // 触发事件的选项
      this.triggerEvent('detail', detail, myEventOption)

    },
    //点击定位
    click(e){
      let cityName = e.currentTarget.dataset.detail;
      let detail={
        name:cityName
      }
      this.setData({
        myCity:this.data.inCity
      })
      this.triggerEvent('detail', detail,{})
    }
  }
})
