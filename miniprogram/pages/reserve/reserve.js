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
    console.log(e.detail.value)
    var that = this
    var computer = e.detail.value.computer
    var description = e.detail.value.description
    var name = e.detail.value.name
    var contact = e.detail.value.contact
    var time = e.detail.value.time
    var type = that.data.type[e.detail.value.type]
    var that = this;
    const _ = db.command
    db.collection('activity_list').doc(that.data.id).update({
      data:{
        appointment: _.push({
          computer: computer,
          description: description,
          name: name,
          contact: contact,
          time: time,
          type: type
        })
      },
      success: function(res){
        console.log(res)
        wx.cloud.callFunction({
          name: 'addActivity',
          data:{
            activity_id: that.data.id
          },
          success: function(){
            console.log('call function success');
          }
        })
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