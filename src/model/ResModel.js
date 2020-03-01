/** 
 * @description res 的数据模型 返回格式
 * @author JasonLonger
*/

/** 
 * 基础模块
*/

class BaseModel {
    constructor({errno,data,message}){
        this.errno = errno;
        if(data){
            this.data = data;
        }
        if(message){
            this.message = message;
        }
    }
}

/** 
 * @description 成功的数据模型
*/
class SuccessModel extends BaseModel{
    constructor(data = {}){
        super({
            errno: 0,
            data
        })
    }
}

/** 
 * 失败的数据模型
*/
class ErrorModel extends BaseModel {
    constructor({errno,message}){
        super({
            errno,
            message
        })
    }
}

module.exports = {
    ErrorModel,
    SuccessModel
}