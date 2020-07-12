/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 15:17:58
 * @LastEditTime: 2020-06-17 16:07:00
 */ 
const JwtUtil = require('../utils/jwt')
const Tips = require('../utils/tips')

module.exports = function(ctx, next){
  try {
    console.log(ctx.query.jwt);
    let token = ctx.query.jwt || ctx.body.jwt || ctx.headers.jwt || '';
    if (token) {
      let jwt = new JwtUtil(token)
      let result = jwt.verifyToken()
      ctx.api_token = result
      next()
    } else {
      return ctx.body = {
        status: 403,
        ...Tips[1003],
        msg: '没有提供token'
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}