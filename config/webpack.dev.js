/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 14:33:08
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-09 23:26:07
 * @FilePath: \myBlog_client\config\webpack.dev.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  //开发环境的临时服务器设置，这样就不需要通过vscode的liveSever查看代码了
  devServer: {
    static: './public/',
    hot: true,                 //是否自动刷新
    host: 'localhost',
    port: 8080,
    open: true,                    //是否自动打开浏览器
  }
});