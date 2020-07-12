/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 11:24:59
 * @LastEditTime: 2020-06-17 15:59:07
 */

module.exports = function () {
  return function (ctx, next) {
    console.log('url===>', ctx.request.url);
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 200
          ctx.body = {
            status: 401,
            result: {
              err: 'Authentication Error',
              errInfo:
                'Protected resource, use Authorization header to get access.',
            },
          }
          break
        default:
          throw err
      }
    })
  }
}
