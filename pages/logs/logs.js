//logs.js
const util = require('../../utils/util.js')
//引入腾讯地图jdk
const QQMapWX=require('../../utils/qqmap-wx-jssdk.min.js')

Page({
  data: {
    logs: [],
    latitude:'',
    longitude:'',
    addrsss:'',
    speed:'',
    accuracy:'',
    altitude:'',
    verticalAccuracy:'',
    horizontalAccuracy:'',
  },

  // 渲染完界面之后的回调函数
  onLoad: function () {

    //打开转发功能
    wx.showShareMenu({
      withShareTicket: true
    })

   
    var that=this;
    //传值方法
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
    });
   
    //判断用户是否打开定位权限
    // wx.getUserInfo(
    // { 
    //   success:function(res)
    //   {
    //     var city = userInfo.city;
    //   }
    // })
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log('用户位置 权限未打开');
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userLocation"]) {
                console.log("用户完成授权");
                wx.getLocation({
                  success: res => {
                    console.log(res);
                    let latitude = res.latitude; // 纬度
                    let longitude = res.longitude; // 经度
                    let speed = res.speed;
                    let accuracy = res.accuracy;
                    let altitude = res.altitude;
                    let verticalAccuracy=res.verticalAccuracy;
                    let horizontalAccuracy = res.horizontalAccuracy;
                    console.log('授权后精度为' + latitude);
                    console.log('授权后为' + longitude);
                    console.log('授权后为' + speed);
                    // this.setData:设置当前页面绑定的属性 微信的方法
                   that.setData(
                     {
                       latitude:latitude,
                       longitude:longitude,
                       speed: speed,
                       accuracy: accuracy,
                       altitude: altitude,
                       verticalAccuracy: verticalAccuracy,
                       horizontalAccuracy:horizontalAccuracy,
                     });
                     
                    // 实例化API核心类
                    var qqmapsdk = new QQMapWX({
                      key: 'L2ABZ-BW5R4-VYAUD-XONDT-5AP46-IZFL5'
                    });

                    //调用地图接口
                    qqmapsdk.reverseGeocoder(
                      {
                        location: {
                          latitude: that.data.latitude,
                          longitude: that.data.longitude,
                        },
                        success: function (res) {
                          console.log(res);
                          var address = res.result.address;
                          console.log(res.result.address);
                          that.setData(
                            {
                              addrsss: res.result.address,
                            });
                        },
                        fail: function (res) {
                          console.log(res);
                          console.log(res.status);
                        },
                        complete: function (res) {
                          console.log(this.location.latitude);
                          console.log(this.location.longitude);
                        }
                      });
            
                  },
                  
                });
              }
              else
              {
                console.log("授权失败");
              }
             
            },
            fail: (res) => {
              console.log("授权失败")
            }
          })

         
        }
      }
    })

    
    //获取用户经纬度及其他信息
    wx.getLocation({
      success: res => {
        console.log(res);
        let latitude = res.latitude; // 纬度
        let longitude = res.longitude; // 经度
        let speed = res.speed;
        let accuracy = res.accuracy;
        let altitude = res.altitude;
        let verticalAccuracy=res.verticalAccuracy;
        let horizontalAccuracy = res.horizontalAccuracy;
        console.log('精度为' + latitude);
        console.log('维度为' + longitude);
        console.log('速度为' + speed);
        // this.setData:设置当前页面绑定的属性 微信的方法
       that.setData(
         {
           latitude:latitude,
           longitude:longitude,
           speed: speed,
           accuracy: accuracy,
           altitude: altitude,
           verticalAccuracy: verticalAccuracy,
           horizontalAccuracy:horizontalAccuracy,
         });
        

        // 实例化API核心类
        var qqmapsdk = new QQMapWX({
          key: 'L2ABZ-BW5R4-VYAUD-XONDT-5AP46-IZFL5'
        });

        //调用地图接口
        qqmapsdk.reverseGeocoder(
          {
            location: {
              latitude: that.data.latitude,
              longitude: that.data.longitude,
            },
            success: function (res) {
              console.log(res);
              var address = res.result.address;
              console.log(res.result.address);
              that.setData(
              {
                  addrsss: res.result.address,
              });
            },
            fail:function(res)
            {
              console.log(res);
              console.log(res.status);
            },
            complete: function (res) {
              console.log(this.location.latitude);
              console.log(this.location.longitude);
            }
          });
      },
      
    });

  
    


    //调用微信扫一扫功能
    // wx.scanCode({
    //   success:(res)=>
    //   {
    //     console.log(res)
    //   }
    // })
    
   
  },
})

