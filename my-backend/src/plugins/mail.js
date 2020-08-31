/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-08-31 17:08:10
 * @LastEditTime: 2020-08-31 18:44:16
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
  to: "chenchen23@btte.net",
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

module.exports = mail