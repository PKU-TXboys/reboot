// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var computer = event.computer
  var description = event.description
  var name = event.name
  var contact = event.contact
  var time = event.time
  var type = event.type
  var res

  try {
    res = await db.collection('activity_list').doc(event.id).update({
      data: {
        appointment: _.push({
          computer: computer,
          description: description,
          name: name,
          contact: contact,
          time: time,
          type: type
        })
      }
    })

    var openid = wxContext.OPENID;
    var user = await db.collection('Users').doc(openid).get();
    console.log(user);
    var flag = 1;
    for (var i = 0; i < user.data.myactivity.length; i++) {
      if (event.id == user.data.myactivity[i]) {
        flag = 0;
        break;
      }
    }
    console.log(flag)
    if (flag == 1) {
      res = await db.collection('Users').doc(openid).update({
        data: {
          myactivity: _.push(event.id)
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

}