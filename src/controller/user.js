/** 
 * @description user controller 用户信息处理
 * @authod JasonLonger
*/
const { getUserInfo,createUser } = require('../services/user.js');
const { SuccessModel,ErrorModel,registerFailInfo } = require('../model/ResModel.js');
const {
    registerUserNameNotExistInfo,registerUserNameExistInfo,loginFailInfo
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp.js');
/** 
 * 用户名是否存在
 * @param {string} userName 用户名
*/


async function isExist(userName){
    //业务逻辑
    //调用 service 获取数据
    const userInfo = await getUserInfo(userName);
    if(userInfo){
        //已存在
        return new SuccessModel(userInfo);
        //{errno:0,data:{...}}
    }else{
        //不存在
        //{errno:10004}
        return new ErrorModel(registerUserNameNotExistInfo);
    }
    //统一返回格式
}

/** 
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1 男 2 女 3 保密） 
*/
async function register({ userName, password, gender }){
    const userInfo = await getUserInfo(userName);
    if(userInfo){
        //用户名已存在
        return ErrorModel(registerUserNameExistInfo)
    }
    try{
        await createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel();
    }catch(ex){
        console.error(ex.message, ex.stack) //打印错误信息和错误栈
        return new ErrorModel(registerFailInfo);
    }
}
//注册service


/** 
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
*/
async function login(ctx, userName, password){
    //获取用户信息
    const userInfo = await getUserInfo(userName,doCrypto(password))
    // console.log(ctx.session)
    if(!userInfo){
        //登录失败
        return new ErrorModel(loginFailInfo)
    }
    
    // 登录成功,将数据存入session  
    if(ctx.session.userInfo==null){
        // ctx.session.userInfo =userName;
        // ctx.session['userInfo'] = userInfo;
        ctx.session.userInfo = JSON.stringify(userInfo) 
    }
    return new SuccessModel()
}



module.exports = {
    isExist,
    register,
    login
}
