/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-06 16:02:57
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-07 16:46:59
 * @FilePath: \express\myBlog\modules\Http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */



/**
 * host + port
 * method 分类
 * 地址分类管理
 * 返回内容解构
 * 
 * 
 * 接口地址管理
 * host post
 *  http://127.0.0.1:3000
  * url
  *  register /user/register
  *  login    /user/login
  *  getRSA   /getPublicRsc
 * 接口参数管理
 *  ajax method 
 *    get post
 * 
 *  request接口参数管理
 *    register username pwd
 *    login username pwd
 * 
 *    register:{
 *      getSms:{
 *        url: '/register/getSms',
 *        data:{
 *          mobile: '手机号',
 *          uuid: 'Uuid'
 *        }
 *      }
 *    }
 * 
 */
const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const PUBKEYNAME = 'ua_publicKey'
const TOKENNAME = 'ua_jot'
const REQUEST_MAP = {
  'register': {
    withToken: false,
    url: '/register',
    method: 'POST',
    rsaKey: 'pwd'
  },
  'login': {
    withToken: false,
    url: '/login',
    method: 'POST',
    rsaKey: 'pwd'
  },
  'user': {
    withToken: true,
    url: '/',
    method: 'POST'
  },
  'pubKey': {
    withToken: false,
    url: '/getPublicKey',
    method: 'GET'
  }
}

export default class Http {
  constructor({ type = REQUEST_MAP.user['url'], data = {} } = {}) {
    this.type = type
    this.data = data
    this.default()
    this.init()
  }
  default() {
    axios.defaults.baseURL = BASEURL
    this.request = axios.create({ timeout: TIMEOUT })
  }
  init() {
    let type = this.type
    if (!(type in REQUEST_MAP)) {
      return false
    }
    Object.assign(this, REQUEST_MAP[type])
    if (this.withToken === true) {
      this.request.defaults.headers.common['Authorization'] = `Bearer ${store.get(TOKENNAME)}`
    }
    this.interceptors()
  }
  async send() {
    let { url, method, data } = this
    try {
      let result = await this.request[method?.toLowerCase()](url, data)
      return result
    } catch (error) {
      console.log(error);
      return error
    }
  }
  interceptors() {
    let rsaKey = this.rsaKey
    // 请求拦截
    this.request.interceptors.request.use(async (config) => {
      let data = config.data
      // 如果存在需要加密的data键
      if (rsaKey in data) {
        // 加密处理
        data[rsaKey] = await this.wordEcrypt(data[rsaKey])
      }
      data = JSON.stringify(data)
      return config
    }, (err) => {
      return Promise.reject(err)
    })
    // 响应拦截
    this.request.interceptors.response.use((response) => {
      let result = response.data
      // 判断任务状态码是否为正常 正常为200 自定义的用户注册成功状态码为4010
      if ((result.statusCode !== '4010') && (result.statusCode !== '4021')) {
        console.warn('请求错误', result.errMsg)
        return result
      }
      if (this.type === 'login' || this.type === 'register') {
        let token = result.data.token
        // 本地存储token
        store.set(TOKENNAME, token);
      }
      return result
    }, (err) => {
      return Promise.reject(err)
    })
  }
  async wordEcrypt(plain) {
    let key = store.get(PUBKEYNAME)
    if (!key || key === 'undefined') {
      key = await this.getPublicKey()
    }
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encrypt(plain)
  }
  async getPublicKey() {
    // 本地获取pubkey
    let key
    try {
      let result = await axios.get('/getPublicKey')
      result = result.data
      if (result.statusCode === 200) {
        key = result.data.pubKey
        key = key.replace(/\. +/g, '')
        key = key.replace(/[\r\n]/g, '')
        this.pubKey = key
        store.set(PUBKEYNAME, key)
      }
    } catch (error) {
      console.log(error);
    }
    return key
  }
}