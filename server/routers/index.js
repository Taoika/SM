const glob = require('glob') // 文件路径读取

const registerRouter = (app) => { // 路由注册
    glob.sync('./routers/**/*.js') // 相对路径
        .filter(value => value.indexOf('index.js') === -1)
        .forEach(value => {
            const router = require(`./${value.split('\\')[1]}`)
            app.use(router.routes())
            .use(router.allowedMethods());
        })
}

module.exports = registerRouter


