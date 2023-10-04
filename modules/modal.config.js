/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-10-03 22:42:24
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-10-03 22:42:56
 * @FilePath: \express\myBlog\modules\modal.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  "login": {
    title: '测试Model',
    formData: [
      {
        label: '用户名',
        query: 'username',
        type: 'text',
        placeholder: '6-8位 字母数字'
      },
      {
        label: '密码',
        query: 'password',
        type: 'password',
        placeholder: '8-12位 至少一个数字或字母'
      }
    ],
    btns: [
      {
        targetName: 'confirm',
        name: '提交'
      }
    ]
  }
}