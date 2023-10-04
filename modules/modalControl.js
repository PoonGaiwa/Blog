import modalMap from './modal.config.js'

export default class Modal {
  constructor({ hbsTemp, modalWrap, dataType, successCallback = (data) => {
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
    this.wrap.on('click', 'button', (e) => {
      e.preventDefault()
      let targetName = $(e.target).data('btn-target')
      console.log(targetName);
      this[targetName] && this[targetName]()
    })
    $('body').on('click', 'a', (e) => {
      e.preventDefault()
      let modalType = $(e.target).data('modal')
      if (!modalType || modalType.length === 0) {
        return false
      }
      this.dataType = modalType
      this.render()
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
    this.successCallback()
    this.reset()
  }
  // reset 重置
  reset() {
    this.wrap.hide()
    this.wrap.attr('hidden', true)
  }
}