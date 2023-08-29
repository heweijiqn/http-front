const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')

// 将user和table模块的内容合并到mocks数组中
const mocks = [
  ...user,
  ...table
]

// 用于前端模拟
// 请谨慎使用，它会重新定义XMLHttpRequest，
// 这将导致许多第三方库失效（如进度事件）。
function mockXHR() {
  // 模拟补丁
  // https://github.com/nuysoft/Mock/issues/300
  // 重定义Mock.XHR.prototype.send方法
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      // 设置xhr对象的withCredentials属性
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        // 设置xhr对象的responseType属性
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  // 将模拟的请求转换为符合Express框架要求的格式
  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        // 将请求的body和url转换为对象格式
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      // 使用Mock.mock方法对结果进行模拟
      return Mock.mock(result)
    }
  }

  // 遍历mocks数组，根据配置拦截请求并返回模拟的数据
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}