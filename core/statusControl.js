/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 20:44:43
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-07 17:45:09
 * @FilePath: \express\myBlog\core\statusControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const userTtC = {
  'USER_ADD': '4010',
  'USER_TRIM': '4011',
  'USER_DR': '4016',
  'USER_NOF': '4012',
  'USER_FOND': '4013',
  'USER_INN': '4020',
  'USER_LOGIN': '4021',
  'USER_FERR': '4099',
}
const userCtM = {
  '4010': '用户注册成功',
  '4011': '用户名或密码不能为空',
  '4016': '用户已存在',
  '4012': '用户不存在',
  '4013': '用户查询成功',
  '4020': '账号密码验证成功',
  '4021': '登录成功',
  '4099': '用户账号密码不正确'
}

module.exports = {
  getUserStatusMsg(tag) {
    if (!tag) {
      return false
    }
    let statusCode = userTtC[tag]
    let errMsg = userCtM[statusCode]
    return {
      statusCode, errMsg
    }
  },

}
