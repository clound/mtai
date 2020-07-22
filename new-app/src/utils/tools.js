/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 16:22:08
 * @LastEditTime: 2020-07-21 14:19:58
 */
import XLSX from 'xlsx'
export const parseTime = (time, cFormat) => {
  if (!time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timestr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timestr
}
export const importExcel = (file) => {
  // 获取上传的文件对象
  // 通过FileReader对象读取文件
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const results = XLSX.utils.sheet_to_json(worksheet)
      resolve(results)
    }
    reader.readAsArrayBuffer(file)
  })
}
