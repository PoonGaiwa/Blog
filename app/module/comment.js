/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-19 22:10:33
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-20 12:48:29
 * @FilePath: \myBlog_client\app\comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Message from './message'

const PUBKEYNAME = 'ua_publicKey'
const TOKENNAME = 'ua_jot'
const URL = 'http://127.0.0.1:3000/upload/article'

const ERROR_MAP = {
  content: '内容不能为空'
}

export default class Comment {
  constructor({ eleListen, eleInput, eleSubmit, aid, uid }, callback) {
    this.eleListen = eleListen
    this.eleInput = eleInput
    this.eleSubmit = eleSubmit
    this.callback = callback
    this.aid = aid
    this.uid = uid
    this.init()
  }
  init() {
    this.listen()
  }
  listen() {
    $(this.eleListen).on('click', this.eleSubmit, (e) => {
      e.preventDefault()
      let data = {}
      let content = $(this.eleInput).html() || $(this.eleInput).val()
      data.content = content
      data.aid = this.aid
      data.uid = this.uid
      Object.entries(data).some(([key, value]) => {
        let isPass = !value || value.trim().length === 0
        if (isPass) {
          new Message(ERROR_MAP[key]).warning()
          data = null
        }
        return isPass
      })
      this.callback(data)
    })
  }
}