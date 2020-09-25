/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-10 12:58:46
 * @LastEditTime: 2020-09-25 09:25:36
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
    if (!ctx.session.user) {
      ctx.body = {
        ...Tips[1007]
      }
      return
    }
    return MtUser.upsert({
      mtuser_id: ctx.session.user.id,
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
  update(ctx) {
    let { id, phone, passwd } = ctx.request.body
    if (!ctx.session.user) {
      ctx.body = {
        ...Tips[1007]
      }
      return
    }
    return MtUser.update({
      phone,
      passwd
    }, {
      where: {
        id
      }
    })
    .then(user => {
      ctx.body = {
        ...Tips[0]
      }
    })
    .catch(error => {
      console.log(error)
      ctx.body = {
        ...Tips[1009],
        error
      }
    } 
    )
  },
  delete(ctx) {
    let { id } = ctx.request.body
    if (!ctx.session.user) {
      ctx.body = {
        ...Tips[1007]
      }
      return
    }
    return MtUserInfo.destroy({
      where: {
        user_id: id
      },
      force: true
    }).then(data => {
      return MtUser.destroy({
        where: {
          id
        },
        force: true
      }).then(data => {
        ctx.body = {
          ...Tips[0]
        }
      }).catch(error => {
        ctx.body = {
          ...Tips[1009],
          error
        }
      })
    })
    .catch(error => {
      console.log(error)
      ctx.body = {
        ...Tips[1009],
        error
      }
    })
  },
  bulkCreate(ctx) {
    if (!ctx.session.user) {
      ctx.body = {
        ...Tips[1009]
      }
      return
    }
    let { data: users } = ctx.request.body
    users = users.map(v => {
      return {
        ...v,
        mtuser_id: ctx.session.user.id || '',
        unique: randomStr()
      }
    })
    // console.log(users)
    return MtUser.bulkCreate(users, { 
      fields:["phone", "passwd", "unique", "mtuser_id"],
      updateOnDuplicate: ['passwd']
    })
      .then(user => {
        ctx.body = {
          ...Tips[0],
          msg: 'success'
        }
      })
      .catch(error => {
        console.log(error);
        ctx.body = {
          ...Tips[1009],
          error
        }
      })
  },
  getReqUsers(ctx) {
    let { id, name } = ctx.session.user
    return MtUser.findAndCountAll({
      attributes: ['id', 'phone', 'passwd', 'unique'],
      where: {
        ...(name !== 'Clound602' ? { mtuser_id: id } : ''),
      }
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
      orderCreated,
      jifen } = userInfo
    return MtUserInfo.upsert({
      user_id: userId,
      uname,
      mobile,
      tipInfo: result,
      choosed, 
      choosedDay,
      city: cityName ? (cityName + shopName) : '',
      limitDate,
      orderCreated,
      jifen
    })
  },
  // 获取所属用户数
  async getAccounts(ctx) {
    let { id, name } = ctx.session.user
    let hitCount = await MtUser.count({
      include:{
        model: MtUserInfo,
        as: 'mtuserinfo',
        where: {
          choosed: true
        }
      },
      ...(name !== 'Clound602' ? {
          where: {
            mtuser_id: id
          }} : ''
        )
    })
    let mtUsers = await MtUser.count({
      ...(name !== 'Clound602' ? {
        where: {
          mtuser_id: id
        }} : ''
      )
    })
    ctx.body = {
      ...Tips[0],
      count: mtUsers,
      hit: hitCount
    }
  },
  // 获取所有用户详细信息
  getAllUserInfo (ctx) {
    // console.log(ctx.request.body)
    let { id, name } = ctx.session.user
    let { phone, choosed, page = 1, pageSize = 10 } = ctx.request.body
    return MtUser.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: +pageSize,
      attributes: ['id', 'phone'],
      include:{
        model: MtUserInfo,
        as: 'mtuserinfo',
        ...(choosed === 'true' ? { where: { choosed: true } } : '')
      },
      where: {
        ...(name !== 'Clound602' ? { mtuser_id: id } : ''),
        ...(phone ? phone : '')
      }
    }).then(data => {
      ctx.body = {...Tips[0], data }
    })   
    .catch(error => {
      console.log(error);
      ctx.body = { error }
    })
  }
}