/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-05 00:44:27
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-05 23:44:12
 * @FilePath: \express\myBlog\modules\validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


export default class RegExpVerify {
  constructor(type, obj) {
    this.type = type
    this.obj = obj
    this.error = {}
    this.constraints = {
      username: {
        presence: { allowEmpty: false },
        length: {
          minimum: 5,
          maximum: 16
        },
        format: {
          pattern: /[a-zA-Z][a-zA-Z0-9_]+/,
          flag: 'g',
          message: '请输入正确的用户名 必须以字母开头,允许包含字母数字下划线,长度在5-16之间'
        }
      },
      pwd: {
        presence: { allowEmpty: false },
        length: {
          minimum: 8,
          maximum: 12
        },
        format: {
          pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.?[#?!@$%^&*-_])[a-zA-Z][a-zA-Z0-9_#?!@$%^&*-]+/,
          flag: 'g',
          message: '请输入正确的密码格式 必须包含大小写字母和数字的组合,可以使用特殊字符,长度在8-12之间'
        }
      }
    }
    this.regValidate()
  }
  regValidate() {
    let result = validate(this.obj, this.constraints, { fullMessages: false })
    // console.log(result);
    if (String(result) === 'undefined') {
      this.status = 1
      return 1
    }
    this.status = 0
    if (result?.username) {
      this.error.username = result.username[0]
    }
    if (result?.pwd)
      this.error.pwd = result.pwd[0]
  }
}