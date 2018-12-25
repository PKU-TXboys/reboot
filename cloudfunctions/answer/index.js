// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var nickname = event.nickname
  var avatarURL = event.avatarURL
  var content = event.content

  try {
    res = await db.collection('topic_list').doc(event.id).update({
      data: {
        comment: _.push({
          nickname: nickname,
          avatarURL: avatarURL,
          content: content
        })
      }
    })

    var openid = wxContext.OPENID;
    var user = await db.collection('Users').doc(openid).get();
    console.log(user);
    var flag = 1;
    for (var i = 0; i < user.data.mytopic.length; i++) {
      if (event.id == user.data.mytopic[i]) {
        flag = 0;
        break;
      }
    }
    console.log(flag)
    if (flag == 1) {
      res = await db.collection('Users').doc(openid).update({
        data: {
          mytopic: _.push(event.id)
        }
      })
      console.log(res);
    };
    return {
      success: true
    }
  }
  catch (e) {
    console.error(e)
    return {
      success: false
    }
  }

  //********************************************* */
  

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}