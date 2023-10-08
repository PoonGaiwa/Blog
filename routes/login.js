/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 21:39:04
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-08 19:02:54
 * @FilePath: \express\myBlog\routes\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl');
const { getUserStatusMsg } = require('../core/statusControl')
const { sendToken } = require('../core/sendToken')

/* GET users listing. */
router.post('/', async function (req, res, next) {
  let { username, pwd } = req.body
  let result = await userControl.verifyUser(username, pwd)
  // 如果验证账号密码失败
  if (result.statusCode !== getUserStatusMsg('USER_INN').statusCode) {
    res.send(200, { ...result })
    return
  }
  // 如果验证成功 签发Token
  if (result.statusCode === '4020' && result.data) {
    let token = await sendToken(result)
    res.send(200, {
      ...getUserStatusMsg('USER_LOGIN'),
      data: {
        token
      }
    })
  }
});

module.exports = router;