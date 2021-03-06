// pages/myactivity/myactivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.hideShareMenu()
    var that = this;
    wx.cloud.callFunction({
      name: 'getMyActivity',
      data:{},
      success:function(res){
        console.log(res)
        that.setData({
          activity_list: res.result.activity_list
        })
      },
      fail: function () {
        wx.showToast({
          title: '没有活动',
          icon: 'none'
        })
        that.setData({
          activity_list: []
        });
      }
    })
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
    var that = this;
    wx.cloud.callFunction({
      name: 'getMyActivity',
      data: {},
      success: function (res) {
        console.log(res)
        that.setData({
          activity_list: res.result.activity_list
        })
      },
      fail: function () {
        wx.showToast({
          title: '没有活动',
          icon: 'none'
        })
        that.setData({
          activity_list: []
        });
        wx.stopPullDownRefresh()
      }
    })
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

  }
})