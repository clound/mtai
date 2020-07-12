/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 16:26:47
 * @LastEditTime: 2020-06-17 17:05:24
 */ 
const Crawel = require('../models').crawel
const Tips = require('../utils/tips')
// const request = require('request')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const superagent = require('superagent')
let options = [] //用于存储网址链接的数组
let n = 0

for (let i = 1319; i <1320; i++) {
    let obj = {
      url: 'http://jandan.net/ooxx/page-' + i,
      headers:{
          'User-Agent': 'request',
          'Referer': 'http://www.mzitu.com/'
      }
    }
    options.push(obj);
}
//利用fs模块download图片
// function downloadImg(url, filename, callback) {
//   var stream = fs.createWriteStream('public/images/' + filename);
//   request({url,headers:{'Referer': 'http://www.mzitu.com'}})
//   .on('error',function(){
//       console.log('done no');
//   }).pipe(stream).on('close', callback);
// }
module.exports = {
  create(ctx) {
    superagent.get('http://www.mzitu.com/mm/page/2/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) return next(err)
      let $ = cheerio.load(sres.text);
      let items = [];
      $('#pins img').each(function (idx, element) {
        let $element = $(element);
        let imgSrc = $element.attr('data-original');
        // let filename = path.basename(imgSrc.toString())
        // downloadImg(imgSrc, filename, function () {
        //     console.log(filename + 'upload 完成');
        // });
        items.push({
          name: $element.attr('alt'),
          // url:  `http://${req.headers.host}/images/${filename}`,
          url:  `${imgSrc}`,
          date: $($element.parent().nextAll()[1]).text(),
          view: $($element.parent().nextAll()[2]).text()
        });
      });
      return  Crawel.bulkCreate(items, { individualHooks: true }).then(function(result){
          ctx.body = {
            ...Tips[0]
          }
        }).catch(error => 
          ctx.body = {
            error
          }
        );
    });
  },
  list(ctx) {
    let pg = ctx.query.page || 1
    let limit = ctx.query.limit || 10
    return Crawel.findAndCountAll({
      'limit': Number(limit),
      'offset': limit * (pg - 1)
    })
    .then(data => {
      ctx.body = {
        ...Tips[0],
        data
      }
    })
    .catch(error =>{
      ctx.body = {
        status: 400,
        error
      }
    })
  }
  // delete(req, res) {
  //   let id = req.body.id
  //   return Topic.destroy({
  //     where: {
  //       id
  //     }
  //   })
  //   .then(data => {
  //     res.status(200).send({...Tips[0], data})})
  //   .catch(error =>{
  //     console.log(error)
  //     res.status(400).send(error)})
  // }
}