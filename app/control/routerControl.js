/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-08 15:05:18
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-19 23:57:08
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
import Http from '../module/http';
import TempCompile from './templateControl'
import Router from 'sme-router'
import util from '../util/util';
import Edite from '../module/editor';
import Comment from '../module/comment'
import store from 'store'
import Message from '../module/message';
import Packery from 'packery';
import QS from 'qs'

const ROUTE_MAP = {
  'write': {
    wrap: '.blog-main--container',
    editor: '#editor-container',
    toolbar: '#toolbar-container'
  },
  'index': {
    wrap: '.blog-head--login',
    tempName: 'user'
  },
  'write/submit': {
    wrap: '.blog-main--container',
    tempName: 'article'
  },
  'article': {
    wrap: '.blog-main--container',
    tempName: 'article'
  },
  'articles': {
    wrap: '.blog-main--container',
  },
  'columns': {
    wrap: '.blog-main--container',
    tempName: 'columns'
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
let editor, title = ''

router.route('/index', async (req, res, next) => {
  let routeName = 'index'
  let result = await Http({ type: routeName })
  // 根据token自动登录渲染对应页面
  if (result?.message === 'ok') {
    res.render(renderHandle(routeName, { isLogin: true }))
  } else {
    res.render(renderHandle(routeName, { isLogin: false }))
  }
  // 获取文章列表并渲染
  try {
    let columnId = req.body.columnId
    let result
    if (columnId) {
      result = await Http({ type: 'articles', data: { query: QS.stringify({ column: columnId }) } })
    } else {
      result = await Http({ type: 'articles' })
    }
    result = result.data
    result.list = result.list.map(item => {
      item.date = util.formatDate(new Date(item.date), 'yyyy年mm月dd日')
      item.content = `${$(item.content).text().slice(0, 120)}...`
      return item
    })
    result.columnId = columnId
    res.render(renderHandle('articles', result))
  } catch (err) {
    console.log(err);
  }
})

router.route('/columns', async (req, res, next) => {
  let routeName = 'columns'
  // 根据token自动登录渲染对应页面
  let token = store.get('ua_jot')
  if (token) {
    res.render(renderHandle('index', { isLogin: true }))
  } else {
    res.render(renderHandle('index', { isLogin: false }))
  }
  try {
    let result = await Http({ type: 'columns' })
    result = result.data
    result.list = result.list.map(item => {
      let len = item.aid.length
      item.col = (len + 1) * 2
      item.row = (len + 1) * 2
      return item
    })
    res.render(renderHandle('columns', { list: result.list }))
    new Packery('.blog-columns', {})
  } catch (err) {
    console.log(err);
  }
})


router.route('/article', async (req, res, next) => {
  // 根据token自动登录渲染对应页面
  let token = store.get('ua_jot')
  if (token) {
    res.render(renderHandle('index', { isLogin: true }))
  } else {
    res.render(renderHandle('index', { isLogin: false }))
  }
  let routeName = 'article'
  // 获取需要渲染的文章
  try {
    let articleId = req.body.id;
    let result = await Http({ type: 'getArticleById', data: { id: articleId } })
    result = result.data
    result.date = util.formatDate(new Date(result.date), 'yyyy年mm月dd日')
    result.comments.map(item => {
      item.date = util.formatDate(new Date(item.date), 'yyyy年mm月dd日')
      return item
    })
    console.log(result);
    res.render(renderHandle(routeName, result))
    // comment控制
    new Comment({
      eleInput: '.blog-comment--input',
      eleSubmit: '.blog-comment--submit',
      aid: articleId,
      uid: store.get('uid')
    }, async (data) => {
      if (!data) {
        return false
      }
      let result = await Http({ type: 'postComment', data })
      router.go('/index', { routeName: 'index' })
      router.go('/article', { routeName: 'article', id: articleId })
    })
  } catch (err) {
    console.log(err);
  }
})



// 过滤无routeName 重定向到初始目录
router.route('/write', async (req, res, next) => {
  let routeName = 'write'
  // 能进入编辑页面说明已经登录，直接渲染
  res.render(renderHandle('index', { isLogin: true }))
  try {
    let result = await Http({ type: 'columns' })
    result = result.data.list
    let selectedIdx = result.reduce((acc, curr, idx) => {
      if (curr._id === req.body.columnId) {
        return idx
      }
      return acc
    }, 0)
    console.log(result);
    result = result.map((item, idx) => {
      item.selected = idx === selectedIdx
      return item
    })
    res.render(renderHandle(routeName, { list: result }))
  } catch (err) {
    console.log(err);
  }
  // 初始化编辑器
  editor = new Edite(ROUTE_MAP[routeName].editor)
  let oInput = document.querySelector('.blog-input--write')
  oInput.addEventListener('keyup', function (e) {
    title = $(e.target).val()
  })
})


router.route('/write/:active', async (req, res, next) => {
  let routeName = req.body.routeName
  if (editor) {
    let column = $('li[data-column].selected')?.data('column')
    let cover = editor?.cover
    let content = editor.html
    try {
      let result = await Http({ type: 'postArticle', data: { title, content, column, cover, author: store.get('uid') } })
      console.log(result);
      result = result.data
      console.log(result);
      title = ''
      router.go('/article', { routeName: 'article', id: result.id })
    } catch (err) {
      router.go('/write', { routeName: 'write' })
      console.log(err);
    }
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