//app.js
var coolsite360 = require('./coolsite/index.js');

App({
  onLaunch: function () {

    var that = this;
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: function (res) {
        that.globalData.openid = res.result.openid
      },
      fail: function (e) {
        wx.showToast({
          title: '小程序故障',
          icon: 'none',
        })
        console.log(e)
      }
    })

    this.update();
  },

  coolsite360: coolsite360,

  update: function(){
    var that = this
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              console.log(userInfo)
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              wx.cloud.callFunction({
                name: 'updateUser',
                data: {
                  nickname: nickName,
                  gender: gender,
                  avatar: avatarUrl,
                },
                success: function(e){
                  console.log('success', e)
                },
                fail: function(e){
                  console.log('fail:', e)
                }
              });
              that.globalData.avatar = avatarUrl;
              that.globalData.nickName = nickName;
            }
          })
        }
        else{
          wx.redirectTo({
            url: '/pages/authority/authority',
          })
        }
      }
    })
  },

  globalData:{
    nickName: '',
    openid: '',
    avatar: ''
  }
})

// {
//   "pagePath": "pages/index/index",
//     "text": "homepage",
//       "iconPath": "images/home.png",
//         "selectedIconPath": "images/home_selected.png"
// },