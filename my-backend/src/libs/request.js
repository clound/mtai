/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-09 12:20:06
 * @LastEditTime: 2020-07-09 18:09:02
 */ 
const rp = require('request-promise')
function httpRequest(options, msg) {
  return new Promise(function (resolve, reject) {
    rp(options)
      .then(function (response) {
        var _data = response
        if (_data) {
          resolve(_data)
        } else {
          throw new Error(msg + '  error')
        }
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
module.exports = httpRequest