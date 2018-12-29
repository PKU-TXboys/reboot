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
    if (that.data.title == ''){
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '提交中',
    })
    var fileID = []
    var imageUrls = []
    if(that.data.image.length != 0){
      // for (var i = 0; i < that.data.image.length; i++)
      // {
      //   var t = that.data.image[i].split('/')
      //   var filename = t[t.length - 1]
      //   console.log(filename)
      //   wx.cloud.uploadFile({
      //     cloudPath: filename, // 上传至云端的路径
      //     filePath: that.data.image[i], // 小程序临时文件路径
      //     success: res => {
      //       // 返回文件 ID
      //       console.log(res.fileID)
      //       fileID.push(res.fileID)
      //     },
      //     fail: console.log
      //   })
      // }
      // console.log('fileID', fileID)
      // wx.cloud.getTempFileURL({
      //   fileList: fileID,
      //   success: res => {
      //     // get temp file URL
      //     console.log(res.fileList)
      //     imageUrls = res.fileList
      //   },
      //   fail: err => {
      //     // handle error
      //   }
      // })
      /* 只有一张图片 */
      var t = that.data.image[0].split('/')
      var filename = t[t.length - 1]
      console.log(filename)
      wx.cloud.uploadFile({
        cloudPath: filename, // 上传至云端的路径
        filePath: that.data.image[0], // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          console.log(res.fileID)
          wx.cloud.getTempFileURL({
            fileList: [res.fileID],
            success: res => {
              // get temp file URL
              console.log(res.fileList)
              imageUrls = [res.fileList[0].tempFileURL]
              wx.cloud.callFunction({
                name: 'addTopic',
                data: {
                  "title": that.data.title,
                  "description": that.data.description,
                  "owner": {
                    "nickname": that.data.nickname,
                    "avatarURL": that.data.avatarURL
                  },
                  "image": imageUrls
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
              }) 
            },
            fail: err => {
              // handle error
            }
          })
        },
        fail: console.log
      })
    }
    else{
      wx.cloud.callFunction({
        name: 'addTopic',
        data: {
          "title": that.data.title,
          "description": that.data.description,
          "owner": {
            "nickname": that.data.nickname,
            "avatarURL": that.data.avatarURL
          },
          "image": []
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
      }) 
    }
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
  },

  choosephoto: function(e){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          image: tempFilePaths
        })
        wx.showToast({
          title: '附加图片成功',
        })
      }
    })
  }
})