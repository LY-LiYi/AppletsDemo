//logs.js
const util = require('../../utils/util.js')
//引入腾讯地图jdk
const QQMapWX=require('../../utils/qqmap-wx-jssdk.min.js')

Page({
  data: {
    logs: [],
    jingdu:'经度',
    weidu:'维度',
    latitude:'',
    longitude:'',
  },
  // 渲染完界面之后的回调函数
  onLoad: function () {
    //传值方法
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
    });

    //获取用户经纬度
    wx.getLocation({
      success: (res) => {
        let latitude = res.latitude // 纬度
        let longitude = res.longitude // 经度
        console.log('精度为' + latitude);
        console.log('维度为' + longitude);
        // this.setData:设置当前页面绑定的属性 微信的方法
       this.setData(
         {
           latitude:latitude,
           longitude:longitude,
         });
        

        // 实例化API核心类
        var qqmapsdk = new QQMapWX({
          key: 'L2ABZ-BW5R4-VYAUD-XONDT-5AP46-IZFL5'
        });

        //调用地图接口
        qqmapsdk.reverseGeocoder(
          {
            location: {
              latitude: this.latitude,
              longitude: this.longitude,
            },
            success: function (address) {
              console.log('address');
            },
            complete: function (res) {
              console.log('调用腾讯地图成功');
            }
          });
      }
    });

    


    //调用微信扫一扫功能
    // wx.scanCode({
    //   success:(res)=>
    //   {
    //     console.log(res)
    //   }
    // })
  }
})
