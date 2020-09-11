/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-09-08 14:49:13
 * @LastEditTime: 2020-09-11 14:24:33
 */
const crypto = require('crypto')
const { getmtsku, login, getUserInfo, addCart, presaleToken, order } = require('../plugins/getmtsku')
const util = require('../utils/tools')
const mailControl = require('../plugins/mail')
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbSCYMupAFFYE5vs1Zxu+
77NB03lDoeKvsqLgGQndwdGSj5NppiDguoyTN0dHANlsG7zvhyauyueGx32
LvcvfKuzfpGxMazwt91ivI+uL3ZbHkbOi74NUS8ob7Teol0iQO8ZAMmRL2f
SPeDL0RHFUf4CN185lxlZ0egiM3kTarJQIDAQAB
-----END PUBLIC KEY-----
`;
function encryptPasswd(str) {
  const encodeData = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, Buffer.from(str)).toString('base64')
  return encodeData
}
async function startMonitor ({ phone, passwd, mail, shop }) {
  let res = await getmtsku(shop).catch(err=>{
    console.log('获取失败', util.parseTime(Date.now()))
  })
  try {
    if (res.data && res.data.products.length) {
      let { products = [] } = res.data
      for (let k of products) {
        let { goodsId, productId, ruleId, subsiteId } = k
        // if (k.name.indexOf('天茅台') > -1 && k.stock > 0) {
        if (k.name.indexOf('酒鼠年') > -1 && k.stock > 0) {
          // clearInterval(timer)
          const unique = `ios-${util.randomString(8)}-${util.randomString(4)}-${util.randomString(4)}-${util.randomString(4)}-${util.randomString(12)}`
          let loginINfo = await login({
            phone: phone,
            passwd: encryptPasswd(passwd),
            unique
          })
          let loginResult = JSON.parse(loginINfo)
          let { userSession, id } = loginResult.data
          let userInfo = await getUserInfo({ unique, sessionId: userSession, userId: id })
          let userInfoResult = JSON.parse(userInfo)
          let { ncmsMemberId, mobile } = userInfoResult.data
          let cartInfo = await addCart({
            activityId: 2,
            ruleId,
            goodsId,
            productId,
            ncmsMemberId,
            mobile,
            number: 6,
            userId: id,
            userSession,
            unique
          })
          console.log(cartInfo)
          let presale = await presaleToken({
            presaleRuleId: ruleId,
            subsiteId,
            userId: id,
            userSession,
            unique
          })
          let presaleInfo = JSON.parse(presale)
          console.log(presaleInfo)
          let { data: { result } = {} } = presaleInfo
          let orderInfo = await order({
            token: result,
            goodsId,
            presaleRuleId: ruleId,
            subsiteId,
            userId: id,
            userSession,
            unique
          })
          let lastresult = JSON.parse(orderInfo)
          console.log(lastresult)
          if (lastresult.success) {
            mailControl.sendMail({
              to: mail,
              subject: "支付提醒", // 可以不传
              html: `<h1>锁单了，去支付吧！</h1>`
            })
          }
          return true
        } else if (k.name.indexOf('酒鼠年') > -1) {
          console.log('尚未更新库存', util.parseTime(Date.now()));
          setTimeout(() => {
            startMonitor({phone, passwd, mail, shop})
          }, 1000)
          return false
        }
      }
    } else {
      setTimeout(() => {
        startMonitor({phone, passwd, mail, shop})
      }, 1000)
    }
  } catch (error) {
    console.log('getsku----', error);
  }
}
let Account = [{
  phone: '18168066256',
  passwd: 'Cloud2020!',
  mail: '964222602@qq.com',
  shop: '{"activityId":"2","shopCode":"8S0336","longitude":118.79219753689236,"latitude":32.04164035373264}'
}, {
  phone: '13511603513',
  passwd: 'yan123',
  mail: '1107542349@qq.com',
  shop: '{"activityId":"2","shopCode":"206076","longitude":116.41024359809028,"latitude":39.91640353732639}'
}]
Account.forEach(v => {
  startMonitor(v)
})