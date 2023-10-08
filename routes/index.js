/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-09-27 15:28:24
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-08 20:06:30
 * @FilePath: \myBlog\routes\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const createError = require('http-errors')
const expressJwt = require('express-jwt');
const router = express.Router();
const { getPublicKeySync } = require('../core/rsaControl')
const { getUserStatusMsg } = require('../core/statusControl')
const userControl = require('../core/userControl');
const publicKey = getPublicKeySync()

/* GET home page. */
router.post('/', expressJwt({
  secret: publicKey,
  algorithms: ["RS256"],  //6.0.0 以上版本必须设置
  isRevoked: function (req, payload, next) {
    // token解析完成后 回调token内容 即payload
    let { user_name, user_id } = payload    // iax是unix时间戳，单位是秒
    req.username = user_name
    req.userID = user_id

    userControl.verifyTokenInfo(req.username, req.userID).then(result => {
      console.log(result);
      if (result.statusCode === getUserStatusMsg('USER_FOND').statusCode) {
        next()
        return
      } else {
        next(createError(401))
      }
    })
  }
}), async function (req, res, next) {
  res.send(200, {
    ...getUserStatusMsg('USER_LOGIN'),
  })
});

module.exports = router;
