
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();
const db = wx.cloud.database()

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "topic",
  /**
   * 页面的初始数据
   */

  data: {
    topic_data: {},
    hide: true,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (option) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var that = this;
    console.log(option)
    this.setData({
      id: option.id
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
    var that = this
    db.collection('topic_list').where({
      _id : that.data.id
    }).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          topic_data: res.data[0]
        })
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

