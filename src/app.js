const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const koaStatic = require('koa-static')
const redisStore = require('koa-redis')
const {SESSION_SECRET_KEY} = require('./conf/secretKeys')
const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const cors = require('koa2-cors');
//路由
const HomeAPIRouter = require('./routes/api/blog-home.js')
const blogViewRouter = require('./routes/view/blog.js')
const userViewRouter = require('./routes/view/user.js');
const userAPIRouter = require('./routes/api/user.js')
const errorViewRouter = require('./routes/view/error')
const utilsAPIRouter = require('./routes/api/utils')
// error handler 页面显示
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


app.use(cors())

// session 配置
// app.keys = [SESSION_SECRET_KEY]
app.keys = [SESSION_SECRET_KEY];
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,  // 单位 ms
        overwrite: true
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
    
    // store:redisStore()
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(HomeAPIRouter.routes(),HomeAPIRouter.allowedMethods());
app.use(blogViewRouter.routes(),blogViewRouter.allowedMethods());
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods());
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods());
app.use(userViewRouter.routes(),userViewRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最后面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
