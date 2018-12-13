// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var success = false;
  console.log(event, context)
  try {
    var res = await db.collection('Users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: event.userInfo.openId,
        nickName: event.nickName,
        avatar: event.avatarUrl,
        mytopic: [],
        myactivity: []
      }
    })
    return {
      success: true
    }
  } catch (e) {
    console.error(e)
    return {
      success: false
    }
  }
}