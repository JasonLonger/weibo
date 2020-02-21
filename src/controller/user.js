/** 
 * @description user controller 用户信息处理
 * @authod JasonLonger
*/
const { getUserInfo } = require('../services/user.js');
const { SuccessModel,ErrorModel } = require('../model/ResModel.js');
const {
    registerUserNameNotExistInfo
} = require('../model/ErrorInfo');
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

module.exports = {
    isExist
}
