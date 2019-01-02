
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();
const db = wx.cloud.database();


// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "forum",

  /**
   * 页面的初始数据
   */

  data: {
    message:"bar for new topic",
    search: "search",
    newtopic: "new",
    topic_list: []
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
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
    var that = this;
    wx.cloud.callFunction({
      name: 'getTopic',
      data:{},
      success: function (res) {
        console.log(res);
        that.updateTime(res.result.data)
        that.setData({
          topic_list: res.result.data.reverse(),
        });
        console.log(res.result.data.length);
      },
      fail: function () {
        console.log("fail to get topic_list")
        that.setData({
          topic_list: []
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
      name: 'getTopic',
      data: {},
      success: function (res) {
        console.log(res);
        that.updateTime(res.result.data)
        that.setData({
          topic_list: res.result.data.reverse()
        });
        wx.stopPullDownRefresh();
      },
      fail: function () {
        console.log("fail to get topic_list")
        wx.showToast({
          title: '没有发帖',
          icon: 'none'
        })
        that.setData({
          topic_list: []
        });
        wx.stopPullDownRefresh();
      }
    })
  },


  //以下为自定义点击事件
  updateTime: function(list){
    for (var i = 0; i < list.length; i++)
    {
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

