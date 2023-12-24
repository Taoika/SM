const userModel = require('../lib/mysql')   //数据库方法
const router = require('koa-router')()   //路由

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

// 获取全部商品信息
router.get('/allGoods', async (ctx) => {
    let resd = null
    await userModel.findAllCargo().then(
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

module.exports = router