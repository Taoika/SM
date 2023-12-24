const userModel = require('../lib/mysql')   //数据库方法
const router = require('koa-router')()   //路由

// 商品加入购物车
router.post('/addToCart', async (ctx, next) => {
    let flag = false
    const { userId, cargoId } = ctx.request.body
    const data = { userId, cargoId, state: 0 }
    await userModel.findByUserCargo(data).then(
        async res => {
            if(res[0]){
                await userModel.alterQuantityOfUserCargo(data).then(
                    res => {
                        flag = true
                    },
                    err => {
                        console.log('err->', err);
                    }
                )
            }
            else {
                await userModel.addUserCargo(data).then(
                    res => {
                        flag = true
                    },
                    err => {
                        console.log('err->', err);
            
                    }
                )
            }
        }
    )
    ctx.type = 'application/json';
    if(flag){
        ctx.body = {
            code: 200,
            msg: '商品已加入购物车'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '商品加入购物车失败'
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

// 根据用户id获取购物车信息
router.get('/cartInfo', async (ctx) => {
    const userId = ctx.request.querystring.split('=')[1]
    let resd = null
    await userModel.findUserCargo('userId', userId).then(
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
            msg: '该用户购物车为空'
        };
    }
})

// 商品从购物车中移除
router.post('/removeFromCart', async (ctx, next) => {
    let flag = false
    await userModel.delUserCargo(ctx.request.body).then(
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
            msg: '商品已移出购物车'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '商品移出失败'
        };
    }

})

// 修改用户商品状态
router.post('/alterCart', async (ctx, next) => {
    let flag = false
    let ucState = 2
    if(ctx.request.body.state == 2) { // 下单
        await userModel.alterQuantityOfCargo(ctx.request.body).then(
            res => {
                flag = true
            },
            err => {
                console.log('err->', err);
            }
        )
        ucState = 0
    }
    if(!flag){
        ctx.body = {
            code: 400,
            msg: '操作失败'
        };
    }
    flag = false;
    const { ucId, quantity, state } = ctx.request.body
    const data = { ucId, quantity, state, ucState }
    await userModel.alterUserCargo(data).then(
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
            msg: '操作成功'
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '操作失败'
        };
    }

})

module.exports = router