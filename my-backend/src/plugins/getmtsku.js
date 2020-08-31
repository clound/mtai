const mail = require('./mail')
const httpRequest = require('../libs/request')
async function getmtsku() {
  // Headers = Object.assign({}, config.header, {
  //   // cookie: config.orderCookie(token)
  // })
  // let form = Object.assign({}, config.orderJson, {
  //   token
  // })
  let options = {
    method: 'GET',
    uri: 'https://app.crv.com.cn/app_timelimit/v1/dc-timelimit/presale/serialwine/getProducts',
    // proxy: 'http://127.0.0.1:8888',
    // rejectUnauthorized: false,
    qs: {
      param: `{"activityId":"2","shopCode":"206076","longitude":116.41024359809028,"latitude":39.91640353732639}`
    },
    // headers: Headers,
    json: true
  }
  // console.log(options)
  let res = await httpRequest(options, 'getmtsku')
  // console.log('getmtsku=====', res);
  try {
    let { products } = res.data
    for (let k of products) {
      if (k.goodsId === 9718118 && k.stock > 0) {
        mail.sendMail({
          subject: "库存添加提醒", // 可以不传
          html: `<h1>华润万家${k.name}库存更新了，去购买吧！</h1>`
        })
        return true
      } else if (k.goodsId === 9718118) {
        console.log('尚未更新库存');
        return false
      }
    }
    
  } catch (error) {
    console.log('getsku----', error);
  }
}

module.exports = {
  getmtsku
}