/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 14:33:14
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-09 21:15:55
 * @FilePath: \myBlog\config\webpack.prod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[hash:7].js'
  },
  plugins: [
  ],
  // 提取多入口模块中的第三方库 单独整合打包
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
})

