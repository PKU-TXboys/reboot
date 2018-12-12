// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.userInfo.openId;
  var user = await db.collection('Users').doc(openid).get();
  console.log(user);
  var flag = 1;
  for (var i = 0; i < user.data.myactivity.length; i++)
  {
    if (event.activity_id == user.data.myactivity[i])
    {
      flag = 0;
      break;
    }
  }
  console.log(flag)
  if(flag == 1){
    var res = await db.collection('Users').doc(openid).update({
      data:{
        myactivity: _.push(event.activity_id)
      }
    })
    console.log(res);
  };
  return {
    success: true
  }
}