/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-17 22:41:04
 * @LastEditTime: 2020-07-19 14:53:07
 */ 
import { request, config } from 'utils'

const { APIV1 } = config
export function query(params) {
  params.key = 'i7sau1babuzwhycn'
  console.log(APIV1)
  return request({
    url: `${APIV1}/weather/now.json`,
    method: 'get',
    data: params,
  })
}
