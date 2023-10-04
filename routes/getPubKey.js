/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 16:00:07
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-09-27 23:03:00
 * @FilePath: \express\myBlog\routes\getPubKey.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const { getPublicKey } = require('../core/rsaControl')
const router = express.Router();

/* GET getPubKey */
router.get('/', async function (req, res, next) {
  let pubKey = await getPublicKey()
  res.json(200, {
    statusCode: 200,
    errMsg: 'ok',
    data: {
      pubKey: pubKey
    }
  })
});

module.exports = router;
