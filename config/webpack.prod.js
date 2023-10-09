/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 14:33:14
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-09 14:52:07
 * @FilePath: \myBlog\config\webpack.prod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[hash:7].js'
  },
  plugins: [
    new UglifyjsWebpackPlugin()
  ]
})
