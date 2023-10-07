/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-06 15:58:20
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-08 00:13:47
 * @FilePath: \express\myBlog\modules\actionControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 管理页面所有发生的行为
 * 调用功能模块
 * 
 * modal行为
 *  modal唤起渲染
 *  modal上按钮触发
 * 
 * form行为
 *  blur 清除错误提示
 *  confirm 提交 校验
 */

import Modal from './modalControl.js'
import TempCompile from './templateControl.js'
const { createEditor, createToolbar } = window.wangEditor
const editorConfig = {
  placeholder: 'Type here...',
  onChange(editor) {
    const html = editor.getHtml()
    // console.log('editor content', html)
    // 也可以同步到 <textarea>
  }
}
export default class Action {
  constructor(params) {
    this.modalAgency()
    this.formAgency()
    this.routerAgency()
  }
  // modal
  modalAgency() {
    // 监听所有[data-modal] 元素的click事件 渲染唤起对应的modal
    $(document).on('click', ['data-modal'], (e) => {
      let $target = $(e.target)
      let modalType = $target.data('modal')
      // 防止模板渲染 data-modal属性值缺失
      if (!modalType) {
        return false
      }
      this.modal = new Modal({
        hbsTemp: Handlebars.templates['modal.hbs'],
        modalType,
      })
      this.modal.render()
    })
    // 监听modal上的button
    // 由于插件之间冲突，无法监听表单的submit事件，因此也写在button的点击事件中
    $(document).on('click', 'button[data-modal-btn]', (e) => {
      let $target = $(e.target)
      let btnType = $target.data('modal-btn')
      if (this.modal) {
        this.modal[btnType]()
      }
    })
  }
  // form
  formAgency() {
    // form input 开始输入时 清除错误提示
    $(document).on('keyup', 'input[data-modal-input]', (e) => {
      let $target = $(e.target)
      let inputEle = $target.parent().parent().children()
      $.each(inputEle, (idx, ele) => {
        ele.dataset['msg'] = ''
      })
    })
  }
  // router
  routerAgency() {
    $(document).on('click', '[data-router]', (e) => {
      let $target = $(e.target)
      let routerName = $target.data('router')
      new TempCompile({
        wrap: '.blog-main-wrap',
        name: 'write'
      })
      // TODO富文本编辑器初始化
      let editor = createEditor({
        selector: '#editor-container',
        // html: '<p><br></p>',
        config: editorConfig,
        mode: 'default', // or 'simple'
      })
      const toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        // config: toolbarConfig,
        mode: 'default', // or 'simple'
      })
    })
  }
}
