/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-03 15:59:02
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-08 20:17:41
 * @FilePath: \express\myBlog\modules\modalControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import modalMap from './modal.config.js'
import RegExpVerify from './validate.js'
import Http from '../modules/Http.js'
import TempCompile from './templateControl.js'
import router from '../modules/routerControl.js'

/**
 * 初始化
 *  根据temp渲染 生成
 * 行为调用
 *  展示 关闭
 */

const RES_HANDLE = {
  register() {
    this.user()
  },
  login() {
    this.user()
  },
  user() {
    router.go('/user')
  }
}

export default class Modal {
  constructor({ hbsTemp, modalWrap = $('.blog-modal'), modalType }) {
    // 渲染hbs方法
    this.hbsTemp = hbsTemp
    this.wrap = modalWrap
    this.modalType = modalType
    this.html = ''
  }
  // 初始化
  render() {
    let data = modalMap[this.modalType]
    this.html = TempCompile.render('modal', data)
    this.draw()
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
    this.reset()
  }
  // 提交
  confirm() {
    this.cleanErrMsg()
    let form = this.wrap.find('form')
    let submitData = form.serializeArray().reduce((acc, curr, idx) => {
      acc[curr.name] = curr.value
      return acc
    }, {})
    this.verifyForm(submitData)
    this.cleanInput()
  }
  // reset 重置
  reset() {
    this.wrap.hide()
    this.wrap.attr('hidden', true)
  }
  cleanInput() {
    let inputEle = $('.blog-modal--content').children()
    $.each(inputEle, (idx, ele) => {
      ele.value = ''
    })
  }
  verifyForm(submitData) {
    let result = new RegExpVerify(this.modalType, submitData)
    // 如果验证通过，将数据发送给后端验证
    if (result.status !== 0) {
      this.userAction(submitData)
    } else {
      this.errorFocus(result)
      this.setErrMsg()
    }
  }
  errorFocus(result) {
    this.msg = result.error
    let msg = Object.keys(this.msg)
    if (msg.length) {
      $(`#${msg[0]}`).focus()
    }
  }
  async userAction(formData) {
    try {
      let result = await new Http({ type: this.modalType, data: formData, }).send()
      // 登录成功4020 或 注册成功4010
      if (result.statusCode === '4021' || result.statusCode === '4010') {
        this.msg = '成功'
        RES_HANDLE[this.modalType]()
        this.reset()
      }
    } catch (error) {
      console.log(error);
    }
  }
  setErrMsg() {
    let verifyEle = $('.blog-modal--content').children('div')
    $.each(verifyEle, (idx, ele) => {
      let inputType = $(ele).data('type')
      let errorMsg = String(this.msg?.[`${inputType}`])
      if (errorMsg !== 'undefined') {
        ele.dataset['msg'] = errorMsg
      }
    })
  }
  cleanErrMsg() {
    let cleanEle = $('.blog-modal--content').children('div')
    $.each(cleanEle, (idx, ele) => {
      ele.dataset['msg'] = ''
    })
  }
}
