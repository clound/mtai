/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-09-08 15:15:42
 * @LastEditTime: 2020-09-08 17:03:18
 */
const Headers = {
  host: 'app.crv.com.cn',
  Connection:	'keep-alive',
  language:	'zh-CN',
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92',
  appVersion: '3.2.1',
  os: 'ios',
  channel: 'ios',
  networkType: 'wifi',
  osVersion:	12.1,
  subsiteId: 1451,
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  // unique:	'ios-55AC6BA3-EB07-4803-BC3C-E0CE2821A12F',
  appkey:	'ef1fc57c13007e33',
  'X-Requested-With':	'com.crv.wanjia',
  addressId: '',
  appHref: 'http://localhost:8080/var/mobile/Containers/Data/Application/3A0BD31B-0FCB-45CC-9480-7CAEF813B2DA/Library/Application%20Support/3.1.11/index.html?cordova_js_bootstrap_resource=/var/containers/Bundle/Application/E34B0004-D782-4646-8354-A7CA6EBACD13/%E5%8D%8E%E6%B6%A6%E4%B8%87%E5%AE%B6.app/www/cordova.js#/tabs/appIndex/preSaleSelfMentionTwo?preSaleRuleId=118&title=53%E5%BA%A6500ml%E9%A3%9E%E5%A4%A9%E8%8C%85%E5%8F%B0%E9%85%92%E9%A2%84%E5%94%AE-%E6%8A%BD%E7%AD%BE',
  Referer: 'http://localhost:8080/var/mobile/Containers/Data/Application/3A0BD31B-0FCB-45CC-9480-7CAEF813B2DA/Library/Application%20Support/3.1.11/index.html?cordova_js_bootstrap_resource=/var/containers/Bundle/Application/E34B0004-D782-4646-8354-A7CA6EBACD13/%E5%8D%8E%E6%B6%A6%E4%B8%87%E5%AE%B6.app/www/cordova.js'
}
const prefix = `https://app.crv.com.cn/app_timelimit/v1/dc-timelimit`
const USERINFO_URL = `https://app.crv.com.cn/app_api/v1/dc-app-api/mobile/api/user/info`
const skuUrl = `${prefix}/presale/serialwine/getProducts`
const LOGIN_URL = `https://app.crv.com.cn/app_api/v1/dc-app-api/mobile/api/user/login`
const Cart_URL = `https://app.crv.com.cn/app_timelimit/v1/dc-timelimit/presale/serialwine/addCart`
const PresaleToken_URL = `https://app.crv.com.cn/app_api/v1/crv-app-checkout/checkout/token/presale`
const Order_URL = `https://app.crv.com.cn/app_api/v1/crv-app-order/front/order/create/presale`

module.exports = {
  Headers,
  USERINFO_URL,
  skuUrl,
  LOGIN_URL,
  Cart_URL,
  PresaleToken_URL,
  Order_URL
}