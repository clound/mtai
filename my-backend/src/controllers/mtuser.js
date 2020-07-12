/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-10 12:58:46
 * @LastEditTime: 2020-07-11 22:49:10
 */ 
const MtUser = require('../models').mtuser
const MtUserInfo = require('../models').mtuserinfo
const Tips = require('../utils/tips')
const util = require('../utils/tools')
// const util = require('util')
// const sha1 = require('sha1')
// const JwtUtil = require('../utils/jwt')
function randomStr() {
  return `ios-${util.randomString(8)}-${util.randomString(4)}-${util.randomString(4)}-${util.randomString(4)}-${util.randomString(12)}`
}
module.exports = {
  create(ctx) {
    let { phone, passwd } = ctx.request.body
    return MtUser.create({
      phone,
      passwd,
      unique: randomStr()
    })
    .then(user => {
      ctx.body = {
        ...Tips[0]
      }
    })
    .catch(error => 
      ctx.body = {
        error
      }
    )
  },
  bulkCreate(ctx) {
    let { data: users } = ctx.request.body
    users = users.map(v => {
      return {
        ...v,
        unique: randomStr()
      }
    })
    // console.log(users)
    return MtUser.bulkCreate(users, { 
      fields:["phone", "passwd", "unique"],
      updateOnDuplicate: ['passwd']
    })
      .then(user => {
        ctx.body = {
          ...Tips[0]
        }
      })
      .catch(error => {
        console.log(error);
        ctx.body = {
          error
        }
      })
  },
  getReqUsers(ctx) {
    return MtUser.findAndCountAll({
      attributes: ['id', 'phone', 'passwd', 'unique']
    })
  },
  // 更新用户信息
  updateUserInfo(userInfo) {
    let { userId,
      uname,
      mobile,
      result,
      choosed, 
      choosedDay,
      cityName,
      shopName,
      limitDate,
      orderCreated } = userInfo
    return MtUserInfo.upsert({
      user_id: userId,
      uname,
      mobile,
      tipInfo: result,
      choosed, 
      choosedDay,
      city: cityName ? (cityName + shopName) : '',
      limitDate,
      orderCreated 
    })
  },
  // 获取所有用户数
  getUsers(ctx) {
    return MtUser.count()
    .then(data => {
      ctx.body = {
        ...Tips[0],
        count: data
      }
    }
    )
    .catch(error => {
      console.log(error);
      ctx.body = {
        error
      }
    })
  },
  // 获取所有用户详细信息
  getAllUserInfo (ctx) {
    console.log(ctx.request.body)
    let { page = 1, limit = 20 } = ctx.request.body
    return MtUser.findAndCountAll({
      offset: (page - 1) * limit,
      limit: limit,
      attributes: ['id', 'phone'],
      include:{ model: MtUserInfo, as: 'mtuserinfo' },
      // where: {name: ctx.body.name}
    }).then(data => {
      ctx.body = {...Tips[0], data }
    })   
    .catch(error => {
      console.log(error);
      ctx.body = { error }
    })
  },
  logout(req, res) {
    let jwt = new JwtUtil({id: req.api_token.id, name: req.api_token.name})
    jwt.expireToken()
    return res.send({...Tips[0]})
  }
}