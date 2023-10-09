/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-08 15:05:18
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-09 19:43:50
 * @FilePath: \myBlog_client\app\routerControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Http from './http';
import TempCompile from './templateControl'
import Router from 'sme-router'
import { createEditor, createToolbar } from '@wangeditor/editor';

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
  }
}

function routeHandle(req) {
  let type = req.body.routerName
  if (ROUTE_MAP[type]['wrap']) {
    router['_mount'] = document.querySelector(ROUTE_MAP[type].wrap)
  }
  req.routerName = type
}

// 实例化参数 模板渲染内容的容器的id名称
const router = new Router('page')

router.use(routeHandle)
// 过滤无routerName 重定向到初始目录
router.route('/write', (req, res, next) => {
  let routerName = req.routerName ?? 'index'
  res.render(TempCompile.render(routerName, {}))
  // TODO富文本编辑器初始化
  const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      // console.log('editor content', html)
      // 也可以同步到 <textarea>
    }
  }
  let editor = createEditor({
    selector: ROUTE_MAP[req.routerName].editor,
    // html: '<p><br></p>',
    config: editorConfig,
    mode: 'default',
  })
  const toolbar = createToolbar({
    editor,
    selector: ROUTE_MAP[req.routerName].toolbar,
    // config: toolbarConfig,
    mode: 'default',
  })
})

router.route('/index', async (req, res, next) => {
  let routerName = 'user'
  // 根据token情况自动帮用户登录
  await new Http({ type: routerName, }).send().then(res => {
    router.go('/user', { routerName: 'user' })
  }).catch(err => {
    // console.error(err);
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