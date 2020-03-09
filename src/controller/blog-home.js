/** 
 * @description 首页 controller
 * @author JasonLonger
*/

const { SuccessModel,ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo.js')
/** 
 * 创建微博
 * @param {Object} param0 创建微博所需的数据{userId,content,image}
*/
async function create({userId, content, image}){
    try {
        //创建微博
        const blog = await createBlog({
            userId,
            content:xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}