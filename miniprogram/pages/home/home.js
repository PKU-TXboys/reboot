
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "home",
  /**
   * 页面的初始数据
   */

  data: {
    hidden: false,
    nickname: 'name',
    gender: 0,
    avatar: 'http://qty83k.creatby.com/materials/136955/origin/ad607ddde1e291de9b19049db1817561_origin.jpg',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var that = this;
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              that.setData({
                nickname: nickName,
                gender: gender,
                avatar: avatarUrl,
                hidden: true
              })
            }
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
    var that = this;
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              that.setData({
                nickname: nickName,
                gender: gender,
                avatar: avatarUrl,
                hidden: true
              });
              that.globalData.avatar = avatarUrl;
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  
})

