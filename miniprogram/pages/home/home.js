
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
              console.log(userInfo)
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
              app.globalData.avatar = avatarUrl;
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
  add: function(){
    const db = wx.cloud.database()
    db.collection('activity_list').add({
      data: {
        activity_list: [
          {
            "activity_id": 1,
            "title": "电脑小队第二次活动",
            "time": "2018年11月24日",
            "description": "只修电脑，绝不过夜。",
            "location": "理教107",
            "appointment": [
              {
                "id": 1,
                "name": "str",
                "time": "1:30",
                "type": "软件",
                "description": "睡过头玩儿去台湾而出去玩而长期无法让千万人味儿的全额外人的万人气味儿",
                "computer": "str",
                "phone_number": "str"
              },
              {
                "id": 2,
                "name": "str",
                "time": "2:30",
                "type": "清灰",
                "description": "str",
                "computer": "str",
                "phone_number": "str"
              }
            ]
          },
          {
            "activity_id": 2,
            "title": "电脑小队第二次活动",
            "time": "2018年11月24日",
            "description": "只修电脑，绝不过夜。",
            "location": "理教107",
            "appointment": [
              {
                "id": 1,
                "name": "str",
                "time": "1:30",
                "type": "软件",
                "description": "睡过头玩儿去台湾而出去玩而长期无法让千万人味儿的全额外人的万人气味儿",
                "computer": "str",
                "phone_number": "str"
              },
              {
                "id": 2,
                "name": "str",
                "time": "2:30",
                "type": "清灰",
                "description": "str",
                "computer": "str",
                "phone_number": "str"
              }
            ]
          },
          {
            "activity_id": 3,
            "title": "电脑小队第二次活动",
            "time": "2018年11月24日",
            "description": "只修电脑，绝不过夜。",
            "location": "理教107",
            "appointment": [
              {
                "id": 1,
                "name": "str",
                "time": "1:30",
                "type": "软件",
                "description": "睡过头玩儿去台湾而出去玩而长期无法让千万人味儿的全额外人的万人气味儿",
                "computer": "str",
                "phone_number": "str"
              },
              {
                "id": 2,
                "name": "str",
                "time": "2:30",
                "type": "清灰",
                "description": "str",
                "computer": "str",
                "phone_number": "str"
              }
            ]
          }
        ]
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  }
})

