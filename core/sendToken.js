const express = require('express');
const jwt = require('jsonwebtoken')
const { getPrivateKey } = require('../core/rsaControl')

module.exports = {
  async sendToken(result) {
    let { userId, username } = result?.data
    let token = jwt.sign({
      user_name: username,
      user_id: userId,
      exp: ~~((Date.now() / 1000) + 24 * 3600 * 3)
    }, await getPrivateKey(), { algorithm: 'RS256' })
    return token
  }
}