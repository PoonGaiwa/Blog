/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-17 23:02:50
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-18 11:15:40
 * @FilePath: \myBlog_client\app\editor.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Editor from 'wangeditor';
import store from 'store'
import Http from './http';

const PUBKEYNAME = 'ua_publicKey'
const TOKENNAME = 'ua_jot'
const URL = 'http://127.0.0.1:3000/upload/article'


export default class Edite {
  constructor(ele) {
    this.ele = ele
    this.editor = null
    this.init()
  }
  init() {
    this.editor = new Editor(this.ele)
    this.editor.config.onblur = (newHtml) => {
      this.html = newHtml // 获取最新的 html 内容
    }
    this.upload()
    this.create()
  }
  upload() {
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxsize = 5 * 1024 * 1024
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 5
    this.editor.config.uploadFileName = 'file'
    this.editor.config.uploadImgHeaders = {
      "Authorization": `Bearer ${store.get(TOKENNAME)}`
    }
  }
  create() {
    this.editor.create()
  }
}