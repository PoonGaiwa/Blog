/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:28:24
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-08 18:48:37
 * @FilePath: \express\myBlog\routes\register.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl');
const { sendToken } = require('../core/sendToken');

/* GET users listing. */
router.post('/', async function (req, res, next) {
  let { username, pwd } = req.body
  // TODO 验证username pwd格式内容
  if (!username || !pwd || username?.length === 0 || pwd?.length === 0) {
    res.send(200, {
      ...getUserStatusMsg('USER_TRIM')
    })
  }
  let result = await userControl.addUser(username, pwd)
  if (result.statusCode === '4010') {
    let token = await sendToken(result)
  }
  res.send(200, {
    ...result
  })
});

module.exports = router;
