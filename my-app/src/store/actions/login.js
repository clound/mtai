/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 14:13:50
 * @LastEditTime: 2020-06-15 18:25:18
 */
import TYPE from '@/store/types'

export function setAuth(payload) {
  return { type: TYPE.AUTH, payload }
}