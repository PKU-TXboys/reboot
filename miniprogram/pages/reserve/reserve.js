// pages/reserve/reserve.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    type: ["软件", "硬件", "清灰"],
    picker_index: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
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
  onShow: function (options) {
    wx.hideShareMenu();
    console.log(this.data.id)
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

  formSubmit: function(e){
    var that = this
    console.log(e.detail.value, that.data.id)
    var computer = e.detail.value.computer
    var description = e.detail.value.description
    var name = e.detail.value.name
    var contact = e.detail.value.contact
    var time = e.detail.value.time
    var type = that.data.type[e.detail.value.type]
    if(computer=='' || description=='' || name=='' || contact=='' || time=='')
    {
      wx.showToast({
        title: '请补全信息',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
      return;
    }
    var that = this;
    const _ = db.command
    wx.showLoading({
      title: '提交中',
    })
    wx.cloud.callFunction({
      name: 'reserve',
      data:{
        id: that.data.id,
        computer: computer,
        description: description,
        name: name,
        contact: contact,
        time: time,
        type: type
      },
      success: function(res){
        console.log(res)
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 1000,
          mask: true,
        })
      },
      fail: function (res) {
        console.error('[云函数] [reserve] 调用失败：', res.errMsg)
      }
    })
  },

  formReset: function(){
    var that = this;
    this.setData({
      picker_index:0
    });
  },

  bindPickerDateChange: function(e){
    console.log(e);
    this.setData({
      picker_index: e.detail.value
    })
  }
})