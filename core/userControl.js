/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 16:05:20
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-07 16:12:13
 * @FilePath: \express\myBlog\core\userControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 16:05:20
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-09-28 16:56:44
 * @FilePath: \express\myBlog\core\userControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs').promises
const { userPath } = require('../config')
const { getUserStatusMsg } = require('./statusControl')
const { encrypt, decrypt } = require('../util/util')

module.exports = {
  async addUser(username, pwd) {
    // TODO pwd 公钥加密  前端传输过程中加密一次 存入数据库时加密一次
    let password = await encrypt(pwd)
    // 查看数据库是否存在同名用户
    let user = await this.getUserInfo(username)
    // 如果用户不存在,将注册用户信息存入数据库
    if (user?.statusCode === getUserStatusMsg('USER_NOF').statusCode) {
      let userId = await getUsersNum()
      userId = ('000000' + userId).substr(-6)
      await appendUsers({ user_id: userId, user_name: username, password: password })
      return {
        ...getUserStatusMsg('USER_ADD'),
        data: {
          user_id: userId, user_name: username
        }
      }
    }
    // 如果用户存在
    if (user?.statusCode === getUserStatusMsg('USER_FOND').statusCode) {
      return {
        ...getUserStatusMsg('USER_DR')
      }
    }
    return user
  },
  // 验证token信息
  async verifyTokenInfo(username, userId) {
    console.log(username, userId);
    try {
      let users = await getUsers()
      let userInfo = users.find(item => item['user_id'].trim() === userId.trim())
      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }
      if (userInfo.user_name === username) {
        return {
          ...getUserStatusMsg('USER_FOND'),
        }
      }
    } catch (error) {
      return {
        ...getUserStatusMsg('USER_FERR')
      }
    }
  },
  async getUserInfo(username) {
    try {
      let users = await getUsers()
      let userInfo = users.find(item => item['user_name'].trim() === username.trim())
      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }
      return {
        ...getUserStatusMsg('USER_FOND'),
        data: {
          ...userInfo
        }
      }
    } catch (error) {
      return {
        ...getUserStatusMsg('USER_FERR')
      }
    }
  },
  async verifyUser(username, pwd) {
    let users = await this.getUserInfo(username)
    // 如果查询不成功
    if (users?.statusCode !== getUserStatusMsg('USER_FOND').statusCode) {
      return users
    }
    let { user_id, password } = users.data
    let inputPwd = await decrypt(pwd.trim())
    let dataBasePwd = await decrypt(await decrypt(password.trim()))
    // 验证密码 数据库中存储二次加密 和传输 一次加密
    let isVerify = await decrypt(await decrypt(password.trim())) === await decrypt(pwd.trim())
    console.log(inputPwd, dataBasePwd);
    if (isVerify) {
      return {
        ...getUserStatusMsg('USER_INN'),
        data: {
          username: username,
          userId: user_id,
        }
      }
    }
    return {
      ...getUserStatusMsg('USER_FERR')
    }
  }
}

async function getUsers() {
  let users = await fs.readFile(userPath, 'utf8')
  users = JSON.parse(users)
  return users
}

async function setUsers(users) {
  try {
    await fs.writeFile(userPath, JSON.stringify(users), 'utf8')
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

async function appendUsers({ user_id = false, user_name = false, password = false }) {
  let user = await getUsers()
  user.push({
    user_id, user_name, password
  })
  await setUsers(user)
  return true
}

async function getUsersNum() {
  let users = await getUsers()
  return users?.length
}