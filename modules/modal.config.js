/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-10-03 22:42:24
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-06 20:51:54
 * @FilePath: \express\myBlog\modules\modal.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  "login": {
    title: '登录',
    formType: 'login',
    formData: [
      {
        label: '用户名',
        query: 'username',
        type: 'text',
        placeholder: '请输入用户名'
      },
      {
        label: '密码',
        query: 'pwd',
        type: 'password',
        placeholder: '请输入密码'
      }
    ],
    btns: [
      {
        targetName: 'confirm',
        name: '提交'
      }
    ]
  },
  "register": {
    title: '注册',
    formType: 'register',
    formData: [
      {
        label: '用户名',
        query: 'username',
        type: 'text',
        placeholder: '请输入5-16位用户名 以字母为开头的字母、数字或下划线的组合'
      },
      {
        label: '密码',
        query: 'pwd',
        type: 'password',
        placeholder: '请输入8-12位密码 最少包含一位（数字/大小写字母和特殊字符）'
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