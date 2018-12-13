// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.userInfo.openId;
  var user = await db.collection('Users').doc(openid).get();
  console.log(user.data);
  var list = await db.collection('activity_list').where({
    _id: _.in(user.data.myactivity)
  }).get();
  console.log(list)
  return {
    activity_list: list.data
  }
}