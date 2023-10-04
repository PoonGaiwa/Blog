/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:28:24
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-09-28 17:53:48
 * @FilePath: \express\myBlog\routes\register.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')

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
  // console.log(result);
  res.send(200, {
    ...result
  })
});

module.exports = router;
