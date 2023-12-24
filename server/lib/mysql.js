const mysql = require('mysql2') // mysql2的才支持mysql 8
const config = require('./config')

// 数据库连接池
const pool = mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE
});


// 查询函数 查询语句 查询参数数组
const query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                resolve( err )
            } else {
                connection.query(sql, values, (err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })

}

// 查询user_info
const findUserInfo = function (value) {
    const  _sql = `SELECT * FROM user_info where userName="${value}"`
    return query(_sql)
}

// 插入到user_info
const insertUserInfo = (values) => {
    const { password, username, phone } = values
    const _sql = `INSERT INTO user_info (userName, userPassword, address, phone, permission) VALUES ("${username}", "${password}", "", "${phone}", 0)`
    return query(_sql)
}

// 插入到store
const insertStore = (value) => {
    const { userId, storeName, launchDate } = value;
    const _sql = `INSERT INTO store (storeName, launchDate, storeState, userId) VALUES ("${storeName}", timestamp('${launchDate}'), 0, "${userId}")`
    return query(_sql)
}

// 查询store
const findStore = function (key, value) {
    const  _sql = `SELECT * FROM store where ${key}="${value}"`
    return query(_sql)
}

// 查询所有store
const findAllStore = function () {
    const  _sql = `SELECT * FROM store`
    return query(_sql)
}

// 修改store状态
const alterStore = function (values) {
    const { state, storeName } = values
    const  _sql = `UPDATE store SET storeState=${state} where storeName="${storeName}"`
    return query(_sql)
}

// 添加商品
const addCargo = function (values) {
    const { storeId, cargoName, price, quantity } = values
    const  _sql = `INSERT INTO cargo (cargoName, price, quantity, cargoState, storeId) VALUES ("${cargoName}", "${price}", ${quantity}, 0, ${storeId})`
    return query(_sql)
}

// 查询某店铺的所有商品
const findCargo = function (value) {
    const  _sql = `SELECT * FROM cargo where storeId=${value}`
    return query(_sql)
}

// 修改商品状态
const alterCargo = function (values) {
    const { state, cargoName } = values
    const  _sql = `UPDATE cargo SET cargoState=${state} where cargoName="${cargoName}"`
    return query(_sql)
}

// 查询所有上架商品
const findAllCargo = function (value) {
    const  _sql = `SELECT * FROM cargo as c join store as s on c.storeId=s.storeId where c.cargoState=0`
    return query(_sql)
}

// 添加用户商品关联
const addUserCargo = function (values) {
    const { userId, cargoId } = values
    const  _sql = `INSERT INTO user_cargo (ucState, userId, cargoId, quantity) VALUES (0, ${userId}, ${cargoId}, 1)`
    return query(_sql)
}

// 修改购物车商品数量
const alterQuantityOfUserCargo = function (values) {
    const { userId, cargoId, state } = values
    const  _sql = `UPDATE user_cargo SET quantity=quantity+1 where userId=${userId} and cargoId=${cargoId} and ucState=${state}`
    return query(_sql)
}

// 查询某用户的关联商品
const findUserCargo = function (value) {
    const  _sql = `SELECT * FROM cargo c JOIN user_cargo uc on c.cargoId=uc.cargoId where uc.userId=${value}`
    return query(_sql)
}

// 查询某用户某商品某状态的信息
const findByUserCargo = function (values) {
    const { userId, cargoId, state } = values
    const  _sql = `SELECT * FROM cargo c JOIN user_cargo uc on c.cargoId=uc.cargoId where uc.userId=${userId} and uc.cargoId=${cargoId} and uc.ucState=${state}`
    return query(_sql)
}

// 从user_cargo表中删除数据
const delUserCargo = function (value) {
    const { ucId } = value
    const  _sql = `DELETE FROM user_cargo where ucId=${ucId}`
    return query(_sql)
}

// 修改用户商品状态
const alterUserCargo = function (values) {
    const { ucId, state, ucState } = values
    const  _sql = `UPDATE user_cargo SET ucState=${state} where ucId=${ucId} and ucState=${ucState}`
    return query(_sql)
}

// 修改商品数量
const alterQuantityOfCargo = function (values) {
    const { ucId, quantity } = values
    const  _sql = `UPDATE cargo c join user_cargo uc on c.cargoId=uc.cargoId SET c.quantity=c.quantity-${quantity} where uc.ucId=${ucId}`
    return query(_sql)
}

module.exports={
    findUserInfo,
    insertUserInfo,
    insertStore,
    findStore,
    findAllStore,
    alterStore,
    addCargo,
    findCargo,
    alterCargo,
    findAllCargo,
    addUserCargo,
    findUserCargo,
    delUserCargo,
    alterUserCargo,
    alterQuantityOfCargo,
    alterQuantityOfUserCargo,
    findByUserCargo
}
