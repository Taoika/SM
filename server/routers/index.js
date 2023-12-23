const router = require('koa-router')()    //路由
const userModel = require('../lib/mysql')   //数据库方法
const moment = require('moment')

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

// 店铺申请
router.post('/applyStore', async (ctx, next) => {
    const { userId, storeName } = ctx.request.body
    let flag = false

    const value = {
        userId,
        storeName,
        storeState: 0,
        launchDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }
    await userModel.insertStore(value).then(
        res => {
            flag = true
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(flag){
        ctx.body = {
            code: 200,
            msg: '申请已发送'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '店铺名称重复/用户不存在'
        };
    }

})

// 根据id获取店铺信息
router.get('/storeInfo', async (ctx) => {
    const userId = ctx.request.querystring.split('=')[1]
    let resd = null
    await userModel.findStore('userId', userId).then(
        res => {
            resd = res;
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(resd){
        ctx.body = {
            code: 200,
            resd
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '该用户下没有店铺'
        };
    }
})

// 管理员获取全部店铺信息
router.get('/allStoreInfo', async (ctx) => {
    let resd = null
    await userModel.findAllStore().then(
        res => {
            resd = res;
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(resd){
        ctx.body = {
            code: 200,
            resd
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '一家店铺都没有'
        };
    }
})

// 处理店铺
router.post('/handleStore', async (ctx, next) => {
    
    let flag = false
    await userModel.alterStore(ctx.request.body).then(
        res => {
            flag = true
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(flag){
        ctx.body = {
            code: 200,
            msg: '店铺状态修改成功'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '店铺状态修改失败'
        };
    }

})

// 商品上架
router.post('/addGoods', async (ctx, next) => {
    let flag = false
    await userModel.addCargo(ctx.request.body).then(
        res => {
            flag = true
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(flag){
        ctx.body = {
            code: 200,
            msg: '商品已上架'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '商品上架失败'
        };
    }

})

// 获取某店铺的全部商品信息
router.get('/goodsInfo', async (ctx) => {
    const storeId = ctx.request.querystring.split('=')[1]
    let resd = null
    await userModel.findCargo(storeId).then(
        res => {
            resd = res;
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(resd){
        ctx.body = {
            code: 200,
            resd
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '该店铺下暂时没有商品'
        };
    }
})

// 商品下架
router.post('/removeStore', async (ctx, next) => {
    
    let flag = false
    await userModel.alterCargo(ctx.request.body).then(
        res => {
            flag = true
        },
        err => {
            console.log('err->', err);
        }
    )
    ctx.type = 'application/json';
    if(flag){
        ctx.body = {
            code: 200,
            msg: '商品已下架'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '商品下架失败'
        };
    }

})

module.exports= router
