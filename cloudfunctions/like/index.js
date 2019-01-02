// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID
  var topic_id = event.topic_id
  var idx = event.idx
  var res

  res = await db.collection('topic_list').doc(topic_id).get();
  console.log(res)
  var l = res.data.comment[idx].like
  console.log(l)
  var flag = 0
  for (var i = 0; i < l.length; i++)
  {
    if(l[i] == openid)
    {
      l.splice(i, 1)
      flag = 1
      var update = await db.collection('topic_list').doc(topic_id).update({
        data:{
          comment: res.data.comment
        }
      })
      return {
        success: true,
        data: res.data
      }
      break;
    }
  }
  if(flag == 0){
    l.push(openid)
    var update = await db.collection('topic_list').doc(topic_id).update({
      data: {
        comment: res.data.comment
      }
    })
    return {
      success: true,
      data: res.data
    }
  }

  return {
    success: false,
    data: res.data
  }
}