const userModel = require('../lib/mysql')   //数据库方法
const router = require('koa-router')()   //路由

// 注册
router.post('/register', async (ctx, next) => {
    // ctx.body 是用来返回请求体参数的
    const data = ctx.request.body
    let flag = false
    await userModel.insertUserInfo(data).then(
        res => {
            flag = true;

        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(flag){
        ctx.body = {
            code: 200,
            msg: '注册成功'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '注册失败'
        };
    }


})

// 登录
router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body
    let flag = false
    await userModel.findUserInfo(username).then(
        res => {
            if(res[0].userPassword == password) {
                flag = true;
            }
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(flag){
        ctx.body = {
            code: 200,
            msg: '登录成功'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '登录失败'
        };
    }


})

// 获取用户信息
router.get('/personInfo', async (ctx) => {
    const username = ctx.request.querystring.split('=')[1]
    let resd = null
    await userModel.findUserInfo(username).then(
        res => {
            resd = res[0]
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(resd) {
        ctx.body = {
            code: 200,
            msg: '获取用户信息成功',
            resd,
        }
    }
    else {
        ctx.body = {
            code: 400,
            msg: '获取用户信息失败'
        };
    }
})

module.exports = router