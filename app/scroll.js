import iScroll from 'iscroll'
document.addEventListener('touchmove', (e) => {
  e.preventDefault()
})
// 初始化IScroll
let scroll = new iScroll('.blog-main-wrap', {
  mouseWheel: true,
})
export default scroll