import Http from './export.js'
import Modal from './modalControl.js'

let modal = new Modal({
  hbsTemp: Handlebars.templates['modal.hbs'],
  modalWrap: $('.blog-modal'),
  successCallback(data) {
    console.log('提交成功', data);
  },
  closeCallback(data) {
    console.log('关闭页面', data);
  }
})
// modal.draw()
