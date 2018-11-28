//app.js
var coolsite360 = require('./coolsite/index.js');

App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  coolsite360: coolsite360,

  globalData:{
    openid:'',
    atavar:''
  }
})

// {
//   "pagePath": "pages/index/index",
//     "text": "homepage",
//       "iconPath": "images/home.png",
//         "selectedIconPath": "images/home_selected.png"
// },