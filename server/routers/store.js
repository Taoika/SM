const router = require('koa-router')()   //路由
const userModel = require('../lib/mysql')   //数据库方法
const moment = require('moment')

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

// 根据用户id获取店铺信息
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

module.exports = router