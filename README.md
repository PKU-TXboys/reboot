# Reboot



软工实习项目

[Burning](https://github.com/burning846)

[JZ](https://github.com/Jchaochao)



### 主要功能

* 电脑问题论坛
* 电脑小队预约



### 页面

```
APP
| - forum					论坛页面
|	| - topic				在讨论话题
|	|	| - newtopic		发起新话题
|	|	| - answer			回复话题
|	|	| - reply			查看回复
| - activitylist 			活动页面
|	| - activity			活动信息
|	| 	| - reserve			活动预约
| - home					个人主页
|	| - mytopic				我的话题
|	| - myactivity			我的预约
| - authority				获取权限
```



### 数据库

```json
回帖信息comment
{
	"nickname":"str",
    "avatarURL":"url",
	"content":"str",
	"img":["fileID"],
    "like":["openid"]
}

讨论信息topic
{
	"topic_id" : 12345,
	"title" : "str",
	"description": "str",
	"content":"str",
	"owner": user_info,
	"img":["fildID",],
	"comment":[comments],
	"like": 1,
}

论坛列表forum
{
	"topic_list":[topics]
}

个人信息user_info
{
	"open_id": "str",
	"nickN ame": "str",
	"avatar": "url",
	"mytopic":[topics],
	"myactivity":[activities]
}

活动列表activity_list
{
	"activity_list":[activities]
}

活动信息activity
{
    "_id":"str",
	"activity_id":1,
    "openid":"str",
	"title":"str",
	"time":"date",
	"description":"str",
	"location":"str",
	"appointment":[appointment]
}

预约信息appointment
{
	"name":"str",
	"time":"date",
	"description":"str",
	"computer":"str", //电脑型号
	"contact":"str",
    "type":"软件"
}
```

* API
```javascript
APi列表

获取论坛列表
function getActivity
data:{}
return:{
    activity_list:[]
}

获取某个帖子信息
function getTopic
data:{
	topic_id:""
}
return:topic

发帖 //上传数据库
function addTopic
data:topic
return:{
	success:true
	topic_id:1
}

回帖
function answer
data:{
	reply
	topic_id:1
}
return:{
	success:true
}

/*
改帖
function modify
data:{
	reply
	topic_id:1
}
return:{
	success:true
}

删帖
function deleteTopic
data:{
	topic_id:1
	replyIndex:1
}
return:{
	success:true
}
*/

给帖子点赞
function like
data:{
	topic_id:1
}
return:{
	success:true
}

获取活动列表
function getActivity
data:{}
return:activity_list

获取某个活动信息
function getActivity
data:{
	activity_id:1
}
return:activity

申请预约
function reserve
data:{
	activity_id:1
	appointment
}
return{
	success:true
}

/*
修改预约
function modifyAppointment
data:{
	activity_id:1
	appointment
}
return{
	success:true
}

取消预约
function cancelAppointment
data:{
	activity_id:1
	appointment_index:1
}
return:{
	success:true
}
*/

获取个人信息
function getUserInfo
data:{
	open_id:'sadsdasdasd'
}
return:user_info

获取个人关注列表
function getMyTopic
data:{
	open_id:'sadsadsadas'
}
return:{
	list:[topics]
}

获取个人预约活动列表
function getMyActivity
data:{
	open_id:'saddsadasds'
}
return:{
	list:[appointments]
}
```
