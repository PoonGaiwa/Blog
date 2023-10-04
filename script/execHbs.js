/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-10-02 16:29:32
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-10-02 16:51:25
 * @FilePath: \express\myBlog\script\execHbs.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const templatePath = path.join(process.cwd(), './template')
const viewPath = path.join(process.cwd(), '/views')

fs.readdir(templatePath, 'utf-8', (err, datas) => {
  if (err) {
    console.log(err);
  }
  if (datas) {
    datas = datas.map(item => {
      let { name, base, ext } = path.parse(item)
      if (ext === '.hbs') {
        let orginal = path.join(templatePath, base)
        let output = path.join(viewPath, `${name}`)
        console.log(orginal, output);
        exec(`handlebars ${orginal} -f ${output}.template.js`)
        console.log(`${name}编译完成`);
      }
    })
  }
})