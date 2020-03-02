/** 
 * @description utils controller
 * @author JasonLonger
*/
const { ErrorModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

//文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

/** 
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
*/

async function saveFile({name,type,size,filePath}){
    if(size>MIX_SIZE){
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
}

module.exports = {
    saveFile
}