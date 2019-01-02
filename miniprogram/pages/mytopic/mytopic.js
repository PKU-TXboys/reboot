// pages/mytopic/mytopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "bar for new topic",
    search: "search",
    newtopic: "new",
    topic_list: []
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
      name: 'getMyTopic',
      data: {},
      success: function (res) {
        console.log(res)
        that.setData({
          topic_list: res.result.topic_list.reverse()
        })
      },
      fail: function (res) {
        console.log(res)
        console.log('failed');
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
      name: 'getMyTopic',
      data: {},
      success: function (res) {
        console.log(res)
        that.updateTime(res.result.topic_list)
        that.setData({
          topic_list: res.result.topic_list.reverse()
        })
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        wx.showToast({
          title: '没有发帖',
          icon: 'none'
        })
        console.log('failed');
        that.setData({
          topic_list: []
        });
        wx.stopPullDownRefresh();
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

  },

  updateTime: function (list) {
    for (var i = 0; i < list.length; i++) {
      var timestamp = list[i].time;
      var date = new Date(timestamp)
      //年
      var Y = date.getFullYear();
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      //分
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      //秒
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

      list[i].year = Y;
      list[i].month = M;
      list[i].day = D;
      list[i].hour = h;
      list[i].minute = m;
      list[i].second = s;
    }
  }
})