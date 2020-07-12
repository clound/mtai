/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-16 17:40:58
 * @LastEditTime: 2020-06-16 18:45:23
 */

var strategies = {
  isNonEmpty: function (value, errorMsg) {
    // 不为空
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    // 限制最小长度
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    // 手机号码格式
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  },
}
var Validater = function () {
  this.caches = {}
}
Validater.prototype.add = function (dom, rules) {
  var self = this
  for (var i = 0, rule; (rule = rules[i++]); ) {
    ;(function (rule) {
      var ary = rule.strategy.split(':')
      !self.caches[dom.name] && (self.caches[dom.name] = [])
      self.caches[dom.name].push(function () {
        var strategy = ary.shift()
        ary.unshift(dom.value)
        ary.push(rule.errorMsg)
        let msg = strategies[strategy].apply(dom, ary)
        console.log(msg);
        if (msg) {
          var errElement = document.createElement("span");
          errElement.innerHTML = msg
          dom.parentNode.insertBefore(errElement, dom.nextSibling)
          return msg
        }
      })
      // self.caches.push()
    })(rule)
  }
}
Validater.prototype.start = function () {
  // for (var i = 0, validatorFunc; (validatorFunc = this.caches[i++]); ) {
  //   validatorFunc()
  //   // if (msg) return msg
  // }
  console.log(this.caches);
  for (let k in this.caches)
    for (var i = 0, validatorFunc; (validatorFunc = this.caches[k][i++]); )
      {
        let msg = validatorFunc()
        console.log(msg);
        if (msg) break
      }
}

var validataFunc = function () {
  var validator = new Validater() // 创建一个 validator 对象
  validator.add(registerForm.userName, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空',
    },
    {
      strategy: 'minLength:6',
      errorMsg: '用户名长度不能小于 10 位',
    },
  ])
  validator.add(registerForm.password, [
    {
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于 6 位',
    },
  ])
  validator.add(registerForm.phoneNumber, [
    {
      strategy: 'isMobile',
      errorMsg: '手机号码格式不正确',
    },
  ])
  var errorMsg = validator.start() // 获得校验结果
  return errorMsg // 返回校验结果
}
var registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function (e) {
  e.preventDefault()

  var errorMsg = validataFunc() // 如果 errorMsg 有确切的返回值，说明未通过校验
  if (errorMsg) {
    // alert(errorMsg)
    console.log(errorMsg);  
    return false // 阻止表单提交
  }
}
