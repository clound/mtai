/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 15:09:49
 * @LastEditTime: 2020-07-12 16:33:04
 */ 
const User = require('../models').user
const UserCheckIn = require('../models').usercheckin
const util = require('util')
const sha1 = require('sha1')
const Tips = require('../utils/tips')
const JwtUtil = require('../utils/jwt')
module.exports = {
  create(req, res) {
    return User.create({
      name: req.body.username,
      password: sha1(req.body.passwd),
      phone: req.body.phone
    })
    .then(user => {
      res.status(200).send(Tips[0])
    })
    .catch(error => res.status(400).send(error))
  },
  login(ctx) {
    let { username, password } = ctx.request.body
    return User.findOne({
      where: {
        name: username,
        password
      }
    }).then(user => {
      if (user) {
        ctx.body = {
          ...Tips[0]
        }
        // let jwt = new JwtUtil({id: user.id, name: req.body.username})
        // let userCheckIn = UserCheckIn.build({'loginIp': req.hostname})
        // user.setCheckIn(userCheckIn)
        // res.send({
        //   code: 0,
        //   token: jwt.generateToken(),
        //   msg: 'ok'
        // })
      } else {
        ctx.body = {
          ...Tips[1006]
        }
      }
    })   
    .catch(error => {
      ctx.body = {
        ...Tips[1009],
        error
      }
    })
  },
  getUserInfo(ctx) {
    return User.findOne({
      attributes: ['id', 'name', 'phone', 'avatar'],
      include:{model: UserCheckIn, as: 'CheckIn'},
      where: {name: ctx.body.name}
    }).then(user => {
      if (user) {
        ctx.body = {...Tips[0], data: user}
      } else {
        ctx.body = { ...Tips[1006] }
      }
    })   
    .catch(error => {
      console.log(error);
      ctx.body = { error }
    })
  },
  list(req, res) {
    return User.getUsers({})
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
  },
  logout(req, res) {
    let jwt = new JwtUtil({id: req.api_token.id, name: req.api_token.name})
    jwt.expireToken()
    return res.send({...Tips[0]})
  }
}