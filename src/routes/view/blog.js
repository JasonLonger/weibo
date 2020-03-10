/** 
 * @description 微博 view 路由
 * 
*/

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks.js')


//首页
router.get('/',loginRedirect,async(ctx,next)=>{
    // const userInfo = ctx.session.userInfo
    // const { id: userId } = userInfo

    // 获取第一页数据
    // const result = await getHomeBlogList(userId)
    // const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('index',{})
})

module.exports = router