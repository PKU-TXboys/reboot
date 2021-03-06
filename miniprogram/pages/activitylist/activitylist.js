
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
  name: "activity",
  /**
   * 页面的初始数据
   */

  data: {
    activity_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
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
    wx.showShareMenu({
      withShareTicket: true
    })
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
    var that = this;
    wx.cloud.callFunction({
      name: 'getActivity',
      data: {},
      success: function (res) {
        console.log(res);
        that.setData({
          activity_list: res.result.data.reverse()
        });
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
    var that = this;
    wx.cloud.callFunction({
      name: 'getActivity',
      data: {},
      success: function (res) {
        console.log(res);
        that.setData({
          activity_list: res.result.data.reverse()
        });
        wx.stopPullDownRefresh();
      },
      fail: function () {
        console.log("fail to get topic_list")
        that.setData({
          activity_list: []
        });
      }
    })
  },


  //以下为自定义点击事件
  
  tap_9186d06d:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
})

