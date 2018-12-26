// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.strict){
    return await db.collection('car').where({
      type:event.carType,
      location:event.city
    }).skip((event.page - 1) * event.pageSize).limit(event.pageSize).get()
  }
  else{
    return await db.collection('car').where({
      location:event.city
    }).skip((event.page - 1) * event.pageSize).limit(event.pageSize).get()
  }
}