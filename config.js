/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:41:29
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-09-27 15:51:32
 * @FilePath: \express\express-login\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
module.exports = {
  host: '127.0.0.1',
  root: process.cwd(),
  port: 3000,
  pubKeyPath: path.join(process.cwd(), '/auth/public.cer'),
  priKeyPath: path.join(process.cwd(), '/auth/private.cer'),
  userPath: path.join(process.cwd(), '/user/user.json')
}