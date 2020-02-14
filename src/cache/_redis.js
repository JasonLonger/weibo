/** 
 * @description 连接 redis 的方法 get set
*/

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db.js')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error',err =>{
    console.error('redie error',err)
})