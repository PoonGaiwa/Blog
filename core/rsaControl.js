/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:39:55
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-09-28 17:51:10
 * @FilePath: \express\myBlog\core\rsaControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fsSync = require('fs')
const fs = require('fs').promises
const { pubKeyPath, priKeyPath } = require('../config')
const { generateKeys } = require('../util/util')

module.exports = {
  getPublicKeySync() {
    let key
    try {
      key = fsSync.readFileSync(pubKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = fsSync.readFileSync(pubKeyPath, 'utf8')
    }
    return key
  },
  async getPublicKey() {
    let key
    try {
      key = await fs.readFile(pubKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = await fs.readFile(pubKeyPath, 'utf8')
    }
    return key
  },
  async getPrivateKey() {
    let key
    try {
      key = await fs.readFile(priKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = await fs.readFile(priKeyPath, 'utf8')
    }
    return key
  }
}