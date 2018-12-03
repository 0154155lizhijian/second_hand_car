// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const pageSize = 10
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('car').skip((event.page - 1) * pageSize).limit(pageSize).get()
}