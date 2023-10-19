import template from '../control/templateControl'
import 'animate.css'
export default class Message {
  constructor(msg = '未知错误') {
    this.msg = msg
    this.wrap = $('.blog-message')
  }
  success() {
    this.html('success')
  }
  info() {
    this.html('info')
  }
  warning() {
    this.html('warning')
  }
  danger() {
    this.html('danger')
  }
  html(type) {
    this.render(template.render('message', { type, msg: this.msg }))
  }
  render(ele) {
    let wrap = this.wrap
    wrap.append($(ele)).children().addClass('animate__animated animate__fadeInUp').delay(1500).queue(function (next) {
      $(this).addClass('animate__animated animate__fadeOutUp')
      next()
    }).delay(1000).queue(function (next) {
      $(this).remove()
      next()
    })
  }
}

