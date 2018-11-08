//logs.js
const util = require('../../utils/util.js')

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
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    });
    var that=this;
    //获取用户经纬度
    wx.getLocation({
      success: (res) => {
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
        console.log('精度为' + latitude);
        console.log('维度为' + longitude);
      }
    });
    //调用微信扫一扫功能
    wx.scanCode({
      success:(res)=>
      {
        console.log(res)
      }
    })
  }
})
