/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-02 17:02:57
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-07 22:54:11
 * @FilePath: \express\myBlog\modules\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Action from './actionControl.js'
import TempCompile from './templateControl.js'

new TempCompile({
  wrap: '.blog-head--login',
  name: 'user',
  data: { isLogin: true }
})
new Action()