/** 
 * 生成json schema 验证的中间件
 * @decription json scheme 验证中间件
*/

const { ErrorModel } = require('../model/ResModel.js')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

function genValidator(validateFn){
    async function validator(ctx, next){
        //校验
        const data = ctx.request.body
        const error = validateFn(data)
        if(error){
            //验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        //验证成功，继续
        await next();
    }
    return validator
}

module.exports = {
    genValidator
}