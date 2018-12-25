// pages/newtopic/newtopic.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic_id: 0,
    title:"",
    description:"",
    avatarURL:"",
    nickname:"",
    image:[],
    comment:[],
    like:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              var userInfo = res.userInfo
              that.setData({
                avatarURL : userInfo.avatarUrl,
                nickname :  userInfo.nickName,
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
    wx.showLoading({
      title: '提交中',
    })
    db.collection('topic_list').add({
      data:{
        "topic_id": 0,
        "title": that.data.title,
        "description": that.data.description,
        "owner": {
          "nickname": that.data.nickname,
          "avatarURL": that.data.avatarURL
        },
        "image": [],
        "comment": [],
        "like": 0
      },
      success: function (res) {
        console.log(res)
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
        wx.hideLoading()
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

  input_title:function(res){
    console.log(res)
    var that = this
    that.setData({
      title:res.detail.value
    })
  },

  input_description: function (res) {
    console.log(res)
    var that = this
    that.setData({
      description: res.detail.value
    })
  }
})