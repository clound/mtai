/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 10:48:00
 * @LastEditTime: 2020-09-24 18:55:03
 */
const Koa = require('koa')
const session = require('koa-session')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static2')
const SystemConfig = require('./config')
const path = require('path')
const ErrorRoutes = require('./middleware/errorRouters')
const entryRoutes = require('./routes')
// const ErrorRoutes = require('./routes/error-routes')
const jwt = require('koa-jwt')
const fs = require('fs')
const { getmtsku } = require('./plugins/getmtsku')
const util = require('./utils/tools')
// import PluginLoader from './lib/PluginLoader'

const app = new Koa()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, './pem/publicKey.pem'))
app.keys = ['koabackend']
app
  .use((ctx, next) => {
    // console.log(ctx)
    if (
      ctx.request.header.host.split(':')[0] === 'localhost' ||
      ctx.request.header.host.split(':')[0] === '127.0.0.1'
    ) {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else {
      ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
    }
    ctx.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  // .use(ErrorRoutes())
  // .use(
  //   jwt({ secret: publicKey }).unless({
  //     path: [/^\/public|\/user\/login|\/assets/],
  //   })
  // )
  .use(session({
    key: 'koawx', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
  }, app))
  .use(
    KoaBody({
      multipart: true,
      parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // parse GET, HEAD, DELETE requests
      formidable: {
        uploadDir: path.join(__dirname, '../assets/uploads/tmp'),
      },
      jsonLimit: '10mb',
      formLimit: '10mb',
      textLimit: '10mb',
    })
  )
.use(entryRoutes.routes())
.use(entryRoutes.allowedMethods())
// .use(ErrorRoutes())
if (env === 'development') {
  // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

// // 刷新库存
// try {
//   let paths = path.resolve(__dirname, 'plugins/time.txt')
//   // console.log(path.resolve(__dirname, 'plugins/time.txt'));
//   let r = 5
//   setInterval(async () => {
//     r = 5 + Math.floor(Math.random() * (15 - 5))
//     let fData = fs.readFileSync(paths)
//     // console.log(fData.toString(), util.parseTime(Date.now(), '{y}/{m}/{d}'));
//     if (fData.toString() !== util.parseTime(Date.now(), '{y}/{m}/{d}')) {
//       let res = await getmtsku()
//       if (res) {
//         fs.writeFileSync(paths, util.parseTime(Date.now(), '{y}/{m}/{d}'))
//       }
//       else console.log('继续监控中....');
//     } else {
//       console.log('今天已经上过库存并发送邮件了!');
//     }
//   }, r * 1000)
// } catch (error) {
//   console.log(error);
// }
app.listen(SystemConfig.System.API_server_port)

console.log(
  'Now start API server on port ' + SystemConfig.System.API_server_port + '...'
)

// mp app
