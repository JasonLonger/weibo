/** 
 * @description 微博数据模型
 * @author JasonLonger
*/

const seq = require('../seq');
const { INTEGER, STRING, TEXT } = require('../types.js');


const Blog = seq.define('blog',{
    userId:{
        type: INTEGER,
        allowNull:false,
        comment: '用户 ID'
    },
    content:{
        type: TEXT,
        allowNull:false,
        comment:'微博内容'
    },
    image:{
        type:STRING,
        comment: '图片地址'

    }
})


module.exports = {
    Blog
}