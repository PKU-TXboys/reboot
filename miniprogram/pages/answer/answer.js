// miniprogram/pages/answer/answer.js
const db =wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:"",
    avatarURL:"",
    nickname:"",
    id:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      id:options.id
    })
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              var userInfo = res.userInfo
              that.setData({
                avatarURL: userInfo.avatarUrl,
                nickname: userInfo.nickName,
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  submit: function (e) {
    console.log(e)
    var that = this
    const _ = db.command
    console.log(that.data.id)
    db.collection('topic_list').doc(that.data.id).update({
      data: {
        comment: _.push(
          { 'nickname': that.data.nickname, 
          'avatarURL': that.data.avatarURL, 
          'content': that.data.comment 
          })
      },
      success: function (res) {
        console.log(res)
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          mask: true,
        })
      }

    }
    
    
    )
    
  },

  input_comment: function (res) {
    console.log(res)
    var that = this
    that.setData({
      comment: res.detail.value
    })
  }
})