
const Koa = require('koa')
const bodyParser  = require('koa-bodyparser')   //上下文解析

const static = require('koa-static')    //静态资源服务
const path = require('path')
const cors = require('koa-cors')       //跨域访问组件
const router = require('./routers/index')


const app = new Koa()

// 配置静态资源文件
const  staticPath = './static'
app.use(static(
    path.join( __dirname, staticPath)
))

// 允许跨域访问
app.use(cors())

// body解析
app.use(bodyParser())

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(8633, () => {
    console.log("在8633端口启动成功")
})
