/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 14:33:01
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-09 21:02:09
 * @FilePath: \myBlog_client\config\webpack.common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  entry: {       // 指定入口
    main: './app/main.js',
  },
  //指定出口
  output: {
    filename: '[name].build.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "html plugn page",        // 设置生成html的title
      template: './index.html'         // 已现有的html文件作为模板基础，将其他元素插入该模板
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,       // 匹配所有css文件
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.styl$/i,
        use: [
          'style-loader',     // 先使用style-loader解析
          {
            loader: 'css-loader',        // 再使用css-loader解析
          },
          {
            loader: 'stylus-loader',     // 前面都无法解析stylus-loader解析
          },
        ]
      },
      {
        test: /\.hbs$/,       // 匹配所有hbs文件
        use: [
          'handlebars-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,       // 匹配所有hbs文件
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,       // 匹配所有图片文件
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,       // 匹配所有字体文件
        use: [
          'file-loader',
        ]
      },
    ]
  }
}