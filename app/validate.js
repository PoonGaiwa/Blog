/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-05 00:44:27
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-16 19:47:45
 * @FilePath: \express\myBlog\modules\validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import validate from "validate.js"

export default class RegExpVerify {
  constructor(type, obj) {
    this.type = type
    this.obj = obj
    this.error = {}
    this.constraints = {
      'register': {
        username: {
          presence: {
            allowEmpty: false,
            message: '用户名不能为空'
          },
          length: {
            minimum: 5,
            tooShort: '至少需要%{count}个字符',
            maximum: 16,
            tooLong: '最多只能%{count}个字符'
          },
          format: {
            pattern: /[a-zA-Z][a-zA-Z0-9_]+/,
            flag: 'g',
            message: '请输入正确的用户名 必须以字母开头,允许包含字母数字下划线,长度在5-16之间'
          }
        },
        email: {
          presence: {
            allowEmpty: false,
            message: '邮箱不能为空'
          },
          format: {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            flag: 'g',
            message: '请输入正确的用户名 必须以字母开头,允许包含字母数字下划线,长度在5-16之间'
          }
        },
        password: {
          presence: {
            allowEmpty: false,
            message: '密码不能为空'
          },
          length: {
            minimum: 8,
            tooShort: '至少需要%{count}个字符',
            maximum: 16,
            tooLong: '最多只能%{count}个字符'
          },
          format: {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-_])[a-zA-Z0-9_#?!@$%^&*-]+$/,
            flag: 'g',
            message: '请输入正确的密码格式 必须包含大小写字母、数字和特殊字符的组合,长度在8-12之间'
          }
        }
      },
      'login': {
        username: {
          presence: {
            allowEmpty: false,
            message: '用户名不能为空'
          }
        },
        password: {
          presence: {
            allowEmpty: false,
            message: '密码不能为空'
          }
        }
      }
    }
    this.regValidate()
  }
  regValidate() {
    let result = validate(this.obj, this.constraints[this.type], { fullMessages: false })
    if (String(result) === 'undefined') {
      this.status = 1
      return 1
    }
    this.status = 0
    if (result?.username) {
      this.error.username = result.username[0]
    }
    if (result?.email) {
      this.error.email = result.email[0]
    }
    if (result?.password)
      this.error.password = result.password[0]
  }
}