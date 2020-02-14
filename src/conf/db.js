/** 
 * @description 存储配置
 * @author JasonLonger
 * 
*/
// const ENV = process.env.NODE_ENV
const { isProd } = require('../utils/env.js')


let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

if(ENV === 'production'){
    //线上的redis配置
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONF
}
