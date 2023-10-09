/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-07 19:44:24
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-09 16:59:42
 * @FilePath: \myBlog_client\app\templateControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import user from '../src/views/user.hbs'
import modal from '../src/views/modal.hbs'
import write from '../src/views/write.hbs'

const TEMP_MAP = {
  user, modal, write
}

export default class TempCompile {
  constructor({ wrap = "body", name, data = {} }) {
    this.wrap = $(wrap)
    this.name = name
    this.data = data
    this.init()
  }
  init() {
    this.tempHandle = TEMP_MAP[this.name]
    this.render()
  }
  render() {
    this.wrap.html(this.getHTML())
  }
  getHTML() {
    return this.tempHandle(this.data)
  }
  static render(tempName, data) {
    let html = ''
    if (tempName in TEMP_MAP) {
      html = TEMP_MAP[tempName](data)
    }
    return html
  }
}