/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-10-05 00:28:40
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-10-05 00:30:12
 * @FilePath: \express\myBlog\modules\validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default class RegExpVerify {
  constructor(type) {
    this.type = type
  }
  submitIntercept() {
    this.formMap = {
      resgister: {
        username: 'required|is_phone',
        pwd: 'required|is_pwd'
      }
    }
  }
}