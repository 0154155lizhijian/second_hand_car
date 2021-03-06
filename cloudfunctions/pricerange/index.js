// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  if(event.strict){
    return await db.collection('car').where({
      price: _.gt(event.lower). and(_.lte(event.high)),
      location:event.city,
      type:event.carType
    }).get()
  }
  else{
    return await db.collection('car').where({
      price: _.gt(event.lower). and(_.lte(event.high)),
      location:event.city
    }).get()
  }
  
}


