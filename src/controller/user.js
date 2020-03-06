/** 
 * @description user controller 用户信息处理
 * @authod JasonLonger
*/
const { 
    getUserInfo,
    createUser,
    deleteUser,
    updateUser } = require('../services/user.js');
const { SuccessModel,ErrorModel } = require('../model/ResModel.js');
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    loginFailInfo,
    deleteUserFailInfo,
    registerFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
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
        return new ErrorModel(registerUserNameExistInfo)
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
    console.log('Login userinfo',userInfo)
    if(!userInfo){
        //登录失败
        return new ErrorModel(loginFailInfo)
    }
   
    // 登录成功,将数据存入session  
    if(ctx.session.userInfo==null){
    
        ctx.session.userInfo = userInfo
        // console.log('login',2)
        // console.log('ctx.session',ctx.session)
        // console.log('ctx.session.userInfo',ctx.session.userInfo)
    }
    
    return new SuccessModel()
}





/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}


/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }

    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )
    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        {
            newPassword: doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        }
    )
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}