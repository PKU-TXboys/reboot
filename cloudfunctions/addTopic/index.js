// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var title = event.title
  var description = event.description
  var nickname = event.owner.nickname
  var avatarURL = event.owner.avatarURL
  var image = event.image
  var res
  var openid = event.userInfo.openId

  try {
    var cnt = await db.collection('topic_list').count();
    res = await db.collection('topic_list').add({
      data: {
        "topic_id": cnt.total+1,
        "_openid": openid,
        "title": title,
        "description": description,
        "owner": {
          "nickname": nickname,
          "avatarURL": avatarURL
        },
        "image": image,
        "comment": [],
        "like": 0
      }
    });
    console.log(res)

    res = await db.collection('Users').doc(openid).update({
      data: {
        mytopic: _.push(res._id)
      }
    })
    console.log(res)
    return {
      errmsg: res,
      success: true
    }
  }
  catch (e) {
    console.error(e)
    return {
      errmsg: e,
      success: false
    }
  }

}