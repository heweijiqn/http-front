// 引入必要的模块
const chokidar = require('chokidar') // 文件变化监听器
const bodyParser = require('body-parser') // 解析请求体
const chalk = require('chalk') // 控制台输出样式
const path = require('path') // 路径处理
const Mock = require('mockjs') // 模拟数据生成库

// 设置mock文件夹的路径
const mockDir = path.join(process.cwd(), 'mock')

// 注册mock路由
function registerRoutes(app) {
  let mockLastIndex
  // 导入mock配置
  const { mocks } = require('./index.js')
  // 将mock配置转换为模拟的路由
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  // 将模拟的路由添加到app中
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

// 取消注册的mock路由
function unregisterRoutes() {
  // 清除mock文件夹相关的缓存
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// 用于mock服务器的模拟响应
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      // 使用Mock.mock方法对响应进行模拟
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}
module.exports = app => {
  // 解析app.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // 注册mock路由
  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // 监听文件变化，热重载mock服务器
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // 移除mock路由栈
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // 清除路由缓存
        unregisterRoutes()

        // 重新注册mock路由
        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}