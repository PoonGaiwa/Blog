/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-02 17:02:57
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-06 20:45:39
 * @FilePath: \express\myBlog\modules\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Modal from './modalControl.js'
// import Http from './Http.js';
// new Http({
//   type: 'register',
//   data: {
//     username: 'dasdjk',
//     pwd: '1234567s8',
//   },
//   callback(data) {
//     console.log('回调:', data);
//   }
// })

let modal = new Modal({
  hbsTemp: Handlebars.templates['modal.hbs'],
  modalWrap: $('.blog-modal'),
  successCallback(data) {
    console.log(data);
  },
  closeCallback(data) {
    console.log('关闭页面', data);
  }
})
