// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var nickname = event.nickname
  var gender = event.gender
  var avatar = event.avatar
  var openid = event.userInfo.openId
  var res
  try{
    res = await db.collection('Users').doc(openid).get()
    res = await db.collection('Users').doc(openid).update({
      data: {
        nickName: nickname,
        avatar: avatar
      }
    })
    console.log(res)
    return {
      errmsg: res
    }
  }
  catch(ex){
    console.log(ex)
    res = await db.collection('Users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: openid,
        nickName: nickname,
        avatar: avatar,
        mytopic: [],
        myactivity: []
      }
    })
    return {
      errmsg: res
    }
  }
}