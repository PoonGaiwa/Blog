/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-08 15:05:18
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-17 21:02:24
 * @FilePath: \myBlog_client\app\routerControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-08 15:05:18
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-17 13:53:40
 * @FilePath: \myBlog_client\app\routerControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Http from './http';
import TempCompile from './templateControl'
import Router from 'sme-router'
import Editor from 'wangeditor';
import util from './util/util';
import iScroll from 'iscroll'

let scroll = new iScroll('.blog-main-wrap', {
  mouseWheel: true,
})
function isScroll() {
  event.stopPropagation();
  event.preventDefault()
}
let oCon = document.querySelector('.blog-main-wrap')
oCon.addEventListener('touchmove', isScroll)

const ROUTE_MAP = {
  'write': {
    wrap: '.blog-main-scroll',
    editor: '#editor-container',
    toolbar: '#toolbar-container'
  },
  'index': {
    wrap: '.blog-head--login',
    tempName: 'user'
  },
  'write/submit': {
    wrap: '.blog-main-scroll',
    tempName: 'article'
  },
  'article': {
    wrap: '.blog-main-scroll',
    tempName: 'article'
  },
  'articles': {
    wrap: '.blog-main-scroll',
  }
}

function routeHandle(routeName) {
  let type = routeName
  if (ROUTE_MAP[type]?.['wrap']) {
    router['_mount'] = document.querySelector(ROUTE_MAP[type].wrap)
  }
}

function renderHandle(routeName, data) {
  routeHandle(routeName)
  let { tempName } = ROUTE_MAP[routeName]
  if (!tempName) {
    tempName = routeName
  }
  return TempCompile.render(tempName, data)
}

// 实例化参数 模板渲染内容的容器的id名称
const router = new Router('page')
let editor, html


// 过滤无routeName 重定向到初始目录
router.route('/write', (req, res, next) => {
  let routeName = req.body.routeName ?? 'index'
  // 执行二级路由时，一级路由也会拦截
  if (routeName === 'write') {
    scroll.refresh()
    scroll.destroy()
    scroll = null
    oCon.removeEventListener('touchmove', isScroll)
    res.render(renderHandle(routeName, {}))
    console.log(scroll);
    editor = new Editor(ROUTE_MAP[routeName].editor)
    editor.config.onblur = function (newHtml) {
      html = newHtml // 获取最新的 html 内容
    }
    editor.create()
  }
})

router.route('/write/:active', async (req, res, next) => {
  let routeName = req.body.routeName
  if (editor) {
    let content = html
    let title = $(content).first().text()
    try {
      let result = await new Http({ type: 'postArticle', data: { title, content } }).send()
      result = result.data.data
      router.go('/article', { routeName: 'article', id: result.id })
    } catch (err) {
      console.log(err);
    }
  }
})

router.route('/index', async (req, res, next) => {
  let routeName = req.body.routeName
  scroll = new iScroll('.blog-main-wrap', {
    mouseWheel: true,
  })
  let result = await new Http({ type: routeName }).send()
  if (result.status == '200') {
    res.render(renderHandle(routeName, { isLogin: true }))
    scroll.refresh()
  } else {
    res.render(renderHandle(routeName, { isLogin: false }))
    scroll.refresh()
  }
  try {
    routeName = 'articles'
    let result = await new Http({ type: routeName }).send()
    result = result.data.data
    result.list = result.list.map(item => {
      item.date = util.formatDate(new Date(item.date), 'yyyy年mm月dd日')
      item.content = `${$(item.content).text().slice(0, 120)}...`
      return item
    })
    res.render(renderHandle(routeName, result))
    // 刷新scroll重新根据当前滚动内容适配滚动
    scroll.refresh()
  } catch (error) {
    console.log(error);
  }
})

router.route('/article', async (req, res, next) => {
  let routeName = 'article'
  // 获取需要渲染的文章
  try {
    let id = req.body.id;
    let result = await new Http({ type: 'getArticleById', data: { id } }).send()
    result = result.data.data
    result.date = util.formatDate(new Date(result.date), 'yyyy年mm月dd日')
    res.render(renderHandle(routeName, result))
    scroll.refresh()
  } catch (err) {
    console.log(err);
  }
})

router.route('/', (req, res, next) => {

})

router.route('*', (req, res, next) => {
  if (!req.routeName || req.routeName === 'undefined') {
    router.go('/index', { routeName: 'index' })
  }
})


export default router