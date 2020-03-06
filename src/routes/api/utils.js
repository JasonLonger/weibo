/** 
 * @decription utils api 路由
 * @author JasonLonger
*/

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks.js')
const koaFrom = require('formidable-upload-koa') //上传中间件
const { saveFile } = require('../../controller/utils')


router.prefix('/api/utils')

//上传图片
router.post('/upload',loginCheck,koaFrom(),async(ctx,next)=>{
    const file = ctx.req.files['file']
    //controller
    if (!file) {
        return
    }
    const{size,path,name,type} = file
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router