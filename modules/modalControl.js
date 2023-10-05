/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-03 15:59:02
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-06 00:55:54
 * @FilePath: \express\myBlog\modules\modalControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import modalMap from './modal.config.js'
import RegExpVerify from './validate.js'

export default class Modal {
  constructor({ hbsTemp, modalWrap, successCallback = (data) => {
    console.log('提交成功', data);
  }, closeCallback = (data) => {
    console.log('关闭页面', data);
  } }) {
    // 渲染hbs方法
    this.hbsTemp = hbsTemp
    this.wrap = modalWrap
    this.html = ''
    this.successCallback = successCallback
    this.closeCallback = closeCallback
    this.eventAgent()
  }
  // 初始化
  render() {
    let data = modalMap[this.dataType]
    this.html = this.hbsTemp(data)
    this.draw()
  }
  // event代理
  eventAgent() {
    this.wrap.on('click', 'button:not(#confirm)', (e) => {
      e.preventDefault()
      let targetName = $(e.target).data('btn-target')
      this[targetName] && this[targetName]()
    }),
      $('body').on('click', 'a', (e) => {
        e.preventDefault()
        let modalType = $(e.target).data('modal')
        if (!modalType || modalType.length === 0) {
          return false
        }
        this.dataType = modalType
        this.render()
      }),
      this.wrap.on('click', '#confirm', (e) => {
        e.preventDefault()
        this.confirm()
      })
  }
  // 渲染
  draw() {
    this.clean()
    this.wrap.html(this.html).show()
    this.wrap.removeAttr('hidden')
    this.wrap.css('display', 'grid')
  }
  // 清空
  clean() {
    this.wrap.html('')
  }
  // 关闭
  close() {
    this.closeCallback()
    this.reset()
  }
  // 提交
  confirm() {
    let formEle = $(`#${this.dataType}`)
    let submitData = formEle.serializeArray().reduce((acc, curr, idx) => {
      acc[curr.name] = curr.value
      return acc
    }, {})
    let result = new RegExpVerify(this.dataType, submitData)
    if (result.status !== 0) {
      this.msg = 'OK'
    } else {
      this.msg = result.error
      let verifyEle = $('.blog-modal--content').children('div')
      $.each(verifyEle, (idx, ele) => {
        let type = $(ele).data('type')
        let errorMsg = this.msg[`${type}`]
        if (String(errorMsg) !== 'undefined') {
          ele.dataset['msg'] = errorMsg
        }
      })
    }
    this.successCallback(this.msg)
  }
  // reset 重置
  reset() {
    this.wrap.hide()
    this.wrap.attr('hidden', true)
  }
}