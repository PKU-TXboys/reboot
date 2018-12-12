
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
    db.collection('topic_list').add({
      data: {
        "topic_id": 0,
        "title": "表白信科15级jz学长",
        "description": "jz学长可真的是太帅了，请问他单身么",
        "owner": {
          "nickname": "βurning",
          "avatarURL": "https://wx.qlogo.cn/mmopen/vi_32/tlnRaKic6pftKwyCkomaTBgKCUwkR4nuQGvMAVRaMG1FofZ8BREMiaibKPBAFZ0n6KmC9XAltJqyneRnGXYndBwiag/132"
        },
        "image": ["http://qty83k.creatby.com/materials/origin/e08b7f406c49e68a972a05518afe2e9a_origin.jpg"],
        "comment": [{
          "nickname": "βurning",
          "avatarURL": "https://wx.qlogo.cn/mmopen/vi_32/tlnRaKic6pftKwyCkomaTBgKCUwkR4nuQGvMAVRaMG1FofZ8BREMiaibKPBAFZ0n6KmC9XAltJqyneRnGXYndBwiag/132",
          "content": "我jio得你说的对"
        }
        ],
        "like": 250
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  }
})

