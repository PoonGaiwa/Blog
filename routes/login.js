/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 21:39:04
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-09-28 17:51:54
 * @FilePath: \express\myBlog\routes\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const { verifyUser } = require('../core/userControl');
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')

/* GET users listing. */
router.post('/', async function (req, res, next) {
  let { username, pwd } = req.body
  let result = await verifyUser(username, pwd)
  // 如果验证账号密码失败
  if (result.statusCode !== getUserStatusMsg('USER_INN').statusCode) {
    res.send(200, { ...result })
    return
  }
  // 如果验证成功 签发Token
  if (result.data) {
    let { userId, username } = result?.data
    let token = jwt.sign({
      user_name: username,
      user_id: userId,
      exp: ~~((Date.now() / 1000) + 24 * 3600 * 3)
    }, await getPrivateKey(), { algorithm: 'RS256' })
    res.send(200, {
      ...getUserStatusMsg('USER_LOGIN'),
      data: {
        token
      }
    })
  }
});

module.exports = router;