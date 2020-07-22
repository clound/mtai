/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 15:09:49
 * @LastEditTime: 2020-07-22 09:50:17
 */ 
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const User = require('../models').user
const MtUser = require('../models').mtuser
const MtUserInfo = require('../models').mtuserinfo
const util = require('util')
const sha1 = require('sha1')
const Tips = require('../utils/tips')
const JwtUtil = require('../utils/jwt')
module.exports = {
  async create(ctx) {
    let { username, password, phone = ''} = ctx.request.body
    let res = await User.findOne({
      attributes: ['id', 'name'],
      where: {name: username}
    })
    if (res && res.id) {
      ctx.body = {
        ...Tips[1004]
      }
      return
    }
    return User.create({
      name: username,
      password: sha1(password),
      phone: phone,
      role: username === 'Clound602' ? true : false
    })
    .then(user => {
      ctx.body = {
        ...Tips[0]
      }
    })
    .catch(error => {
      ctx.body = {
        ...Tips[1006]
      }
    })
  },
  login(ctx) {
    let { username, password } = ctx.request.body
    return User.findOne({
      where: {
        name: username
      }
    }).then(user => {
      if (user) {
        if (sha1(password) !== user.password) {
          ctx.body = {
            ...Tips[1006],
            msg: '用户密码错误'
          }
        } else {
          delete user.password
          let { id, name, phone, role } = user
          ctx.session.user = {
            id,
            name,
            phone,
            role
          }
          ctx.body = {
            ...Tips[0]
          }
        }
      } else {
        ctx.body = {
          ...Tips[1006],
          msg: '不存在该账号'
        }
      }
    })   
    .catch(error => {
      ctx.body = {
        ...Tips[1008],
        error
      }
    })
  },
  update(ctx) {
    let { id, username, password, phone } = ctx.request.body
    return User.update({
      name: username,
      password: sha1(password),
      phone
    }, {
      where: {
        id,
      }
    }).then(data => {
      ctx.body = {
        ...Tips[0],
        data
      }
    })   
    .catch(error => {
      ctx.body = {
        ...Tips[1009],
        error
      }
    })
  },
  async delete(ctx) {
    let { id } = ctx.request.body
    if (!ctx.session.user) {
      ctx.body = {
        ...Tips[1007]
      }
      return
    }
    let userRes = await MtUser.findAll({
      attributes: ['id', 'mtuser_id'],
      where: {
        mtuser_id: id
      }
    })
    // console.log(userRes[0].id, userRes.length)
    // return 
    if (userRes.length) {
      for (k of userRes) {
        await MtUserInfo.destroy({
           where: {
             user_id: k.id
           },
           force: true
         })
         await MtUser.destroy({
           where: {
             id: k.id
           },
           force: true
         })
      }
      return User.destroy({
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
    } else {
      return User.destroy({
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
    }
  },
  getUserInfo(ctx) {
    if (!ctx.session.user) {
      ctx.body = {
        ...Tips[1005]
      }
      return
    }
    ctx.body = {
      ...Tips[0],
      user: ctx.session.user
    }
    // return User.findOne({
    //   attributes: ['id', 'name', 'role'],
    //   where: {name: ctx.body.name}
    // }).then(user => {
    //   if (user) {
    //     ctx.body = {...Tips[0], data: user}
    //   } else {
    //     ctx.body = { ...Tips[1006] }
    //   }
    // })   
    // .catch(error => {
    //   console.log(error);
    //   ctx.body = { error }
    // })
  },
  getUserList(ctx) {
    console.log(ctx.query)
    let { name, page = 1, pageSize = 10 } = ctx.query
    return User.findAndCountAll({
      attributes: ['id', 'name', 'phone', 'role', 'updatedAt'],
      ...(name ? { where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }} : ''),
      offset: (page - 1) * pageSize,
      limit: +pageSize
    })
    .then(user => {
      ctx.body = {
        ...Tips[0],
        user,
      }
    })
    .catch(error => {
      console.log(error);
      ctx.body = {
        ...Tips[1006]
      }
    })
  },
  logout(ctx) {
    ctx.session = null
    ctx.body = {
      ...Tips[0]
    }
    // let jwt = new JwtUtil({id: req.api_token.id, name: req.api_token.name})
    // jwt.expireToken()
    // return res.send({...Tips[0]})
  }
}