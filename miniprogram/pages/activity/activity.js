// pages/activitylist/activitylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ],
    activity_data: {
      "activity_id": 1,
      "title": "电脑小队第二次活动",
      "time": "2018年11月24日",
      "description": "只修电脑，绝不过夜。",
      "location": "理教107",
      "appointment": [
        {
          "id" : 1,
          "name": "str",
          "time": "1:30",
          "type": "软件",
          "description": "睡过头玩儿去台湾而出去玩而长期无法让千万人味儿的全额外人的万人气味儿",
          "computer": "str",
          "phone_number": "str"
        },
        {
          "id" : 2,
          "name": "str",
          "time": "2:30",
          "type": "清灰",
          "description": "str",
          "computer": "str",
          "phone_number": "str"
        }
      ]
    }
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

  }
})