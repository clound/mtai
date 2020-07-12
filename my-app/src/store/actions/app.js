/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-15 18:22:12
 * @LastEditTime: 2020-06-15 18:23:52
 */ 
import TYPE from '@/store/types'
 
export function setResponsive(payload) {
  return { type: TYPE.RESPONSIVE, payload }
}
export function setAuth(payload) {
  return { type: TYPE.AUTH, payload }
}