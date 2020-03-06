/**
 * @description 登录验证的中间件
 * @author JasonLonger
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginCheck(ctx, next) {
    
    if (ctx.session && ctx.session.userInfo) {
        // 已登录

        await next()
        return
    }
  
    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {

    // console.log('checkLogin',1)
    // console.log('checkout',ctx.session)
    // console.log('loginChecks',ctx.session.userInfo)
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
       
        await next()
        return
    }
    // 未登录
    const curUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
    // await next()
}

module.exports = {
    loginCheck,
    loginRedirect
}
