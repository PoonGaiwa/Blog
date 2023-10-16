/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-08 15:05:18
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-16 14:56:14
 * @FilePath: \myBlog_client\app\routerControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Http from './http';
import TempCompile from './templateControl'
import Router from 'sme-router'
import Editor from 'wangeditor';
// import { createEditor, createToolbar } from '@wangeditor/editor';
const ROUTE_MAP = {
  'write': {
    wrap: '.blog-main-wrap',
    editor: '#editor-container',
    toolbar: '#toolbar-container'
  },
  'user': {
    wrap: '.blog-head--login'
  },
  'index': {
    wrap: '.blog-head--login'
  },
  'write/submit': {
    wrap: '.blog-main-wrap',
    tempName: 'article'
  }
}

function routeHandle(req) {
  let type = req.body.routerName
  if (ROUTE_MAP[type]?.['wrap']) {
    router['_mount'] = document.querySelector(ROUTE_MAP[type].wrap)
  }
  req.routerName = type
}

// 实例化参数 模板渲染内容的容器的id名称
const router = new Router('page')
let editor, html

router.use(routeHandle)
// 过滤无routerName 重定向到初始目录
router.route('/write', (req, res, next) => {
  let routerName = req.routerName ?? 'index'
  // 执行二级路由时，一级路由也会拦截
  if (routerName = 'write') {
    res.render(TempCompile.render(routerName, {}))
    editor = new Editor(ROUTE_MAP[routerName].editor)
    editor.config.height = 800
    editor.config.onblur = function (newHtml) {
      html = newHtml // 获取最新的 html 内容
    }
    editor.create()
  }
})

router.route('/write/:active', (req, res, next) => {
  let routerName = req.routerName
  if (editor) {
    res.render(TempCompile.render(ROUTE_MAP[routerName].tempName, { body: html }))
  }
})

router.route('/index', async (req, res, next) => {
  let routerName = 'user'
  // 根据token情况自动帮用户登录
  await new Http({ type: routerName, }).send().then(res => {
    router.go('/user', { routerName: 'user' })
  }).catch(err => {
    res.render(TempCompile.render(routerName, { isLogin: false }))
  })
})
router.route('/user', (req, res, next) => {
  let routerName = req.routerName
  res.render(TempCompile.render(routerName, { isLogin: true }))
})

router.route('*', (req, res, next) => {
  if (!req.routerName || req.routerName === 'undefined') {
    res.redirect('/')
  }
})


export default router