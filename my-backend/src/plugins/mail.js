/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-08-31 17:08:10
 * @LastEditTime: 2020-09-08 18:29:15
 */
"use strict";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true, 
  secureConnection: true,
  auth: {
    user: '964222602@qq.com', // 发送方的邮箱地址 
    pass: 'ymlqzmjkepskbcai'
  }
})
const info = {
  from: '964222602@qq.com',
  to: "964222602@qq.com",
  subject: "标题"
  // text: "",
  // html: "<b>Hello world?</b>" // 和text只能选择一个
}
const mail = {
  sendMail: function(ob = {}) {
    transporter.sendMail({...info, ...ob}, (err) => {
      err && console.log(err)
    })
  }
}
// mail.sendMail({
//   subject: "支付提醒", // 可以不传
//   html: `<h1>锁单了，去支付吧！</h1>`
// })

module.exports = mail