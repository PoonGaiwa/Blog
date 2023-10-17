/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-06 16:02:57
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-17 14:29:24
 * @FilePath: \express\myBlog\modules\Http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios from 'axios'
import JSEncrypt from 'jsencrypt'
import store from 'store'
import Message from './message'

const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const PUBKEYNAME = 'ua_publicKey'
const TOKENNAME = 'ua_jot'

const REQUEST_MAP = {
  'register': {
    withToken: false,
    url: '/admin/register',
    method: 'POST',
    rsaKey: 'password'
  },
  'login': {
    withToken: false,
    url: '/admin/login',
    method: 'POST',
    rsaKey: 'password'
  },
  'pubKey': {
    withToken: false,
    url: '/key',
    method: 'GET'
  },
  'articles': {
    withToken: false,
    url: '/api/rest/articles',
    method: "GET"
  },
  'postArticle': {
    withToken: false,
    url: '/api/rest/articles',
    method: 'POST'
  }
  ,
  'columns': {
    withToken: false,
    url: '/api/rest/columns',
    method: "GET"
  },
  'getArticleById': {
    withToken: false,
    rest: true,
    url: '/api/rest/articles/:id',
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
    } catch (err) {
      return Promise.reject(err)
    }
  }
  interceptors() {
    let rsaKey = this.rsaKey
    // 请求拦截
    this.request.interceptors.request.use(async (config) => {
      let data = config?.data
      if (this.rest) {
        let restSymbol = this.url.match(/:(.*)$/)[1]
        config.url = config.url.replace(/:(.*)$/, config[restSymbol]);
        console.log(config.url);
      }
      if (data) {
        // 如果存在需要加密的data键
        if (rsaKey in data) {
          // 加密处理
          data[rsaKey] = await this.wordEcrypt(data[rsaKey])
        }
        data = JSON.stringify(data)
      }
      return config
    }, (err) => {
      return Promise.reject(err)
    })
    // 响应拦截
    this.request.interceptors.response.use((response) => {
      let result = response.data
      // 判断任务状态码是否为正常 正常为200 自定义的用户注册成功状态码为4010
      if (this.type === 'login' || this.type === 'register') {
        let token = result.data.token
        // 本地存储token
        store.set(TOKENNAME, token);
      }
      console.log(response);
      return response
    }, (err) => {
      // 响应status不是200 获取data.message展示给用户
      console.log(err);
      let message = err.response.data.message
      new Message(message).danger()
      return err.response
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
    let { method, url } = REQUEST_MAP['pubKey']
    try {
      let result = await axios[method.toLowerCase()](url)
      result = result.data
      key = result.data.pubKey
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      this.pubKey = key
      console.log(key);
      store.set(PUBKEYNAME, key)
    } catch (error) {
      let message = error.response.data.message
      new Message(message).danger()
    }
    return key
  }
}