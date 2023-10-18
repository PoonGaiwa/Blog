/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-06 16:02:57
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-18 19:57:03
 * @FilePath: \express\myBlog\modules\Http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios from 'axios'
import JSEncrypt from 'jsencrypt'
import store from 'store'
import Message from './message'

const BASEURL = 'http://127.0.0.1:3000'
const PUBKEYNAME = 'ua_publicKey'
const TOKENNAME = 'ua_jot'

const REQUEST_MAP = {
  'index': {
    url: '/index',
    method: 'GET',
    noMessage: true,
  },
  'register': {
    url: '/admin/register',
    method: 'POST',
    rsaKey: 'password',
    setToken: true
  },
  'login': {
    url: '/admin/login',
    method: 'POST',
    rsaKey: 'password',
    setToken: true
  },
  'pubKey': {
    url: '/key',
    method: 'GET'
  },
  'articles': {
    url: '/api/rest/articles',
    method: "GET"
  },
  'postArticle': {
    url: '/api/rest/articles',
    method: 'POST'
  },
  'columns': {
    url: '/api/rest/columns',
    method: "GET"
  },
  'getArticleById': {
    rest: true,
    url: '/api/rest/articles/:id',
    method: 'GET'
  },
  'uploadArticle': {
    url: '/upload/article',
    method: 'POST'
  }
}

// 加密函数
async function encrypt(data) {
  let key = store.get(PUBKEYNAME)
  try {
    if (!key || key === 'undefined') {
      // 本地获取pubkey
      let result = await instance.get('/key')
      key = result.data.pubKey
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      store.set(PUBKEYNAME, key)
    }
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encrypt(data)
  } catch (err) {
    let message = err.response.data.message
    new Message(message).danger()
  }
}

export default async function Http({ type, data }) {
  if (!(type in REQUEST_MAP)) {
    throw new Error('API请求错误')
  }
  let { url, method, noMessage = false, rsaKey = false, setToken = false, rest = false } = REQUEST_MAP[type]
  try {
    method = method.toLowerCase()
    if (rest) {
      let restSymbol = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restSymbol]);
    }
    if (rsaKey && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    data = method === 'get' ? { params: data } : data
    let result = await instance[method](url, data)
    if (setToken) {
      let token = result.data.token
      let uid = result.data.userId
      // 本地存储token
      store.set(TOKENNAME, token);
      store.set('uid', uid)
    }
    return result
  } catch (err) {
    if (err.response) {
      let message = err.response.data.message
      if (!noMessage) {
        new Message(message).danger()
      }
    }
  }
}


let instance = axios.create()
instance.defaults.baseURL = BASEURL
// 请求拦截
instance.interceptors.request.use(async (config) => {
  let token = store.get(TOKENNAME)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截
instance.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  return Promise.reject(err)
})