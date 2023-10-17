import Editor from 'wangeditor';
import store from 'store'
import Http from './http';

const PUBKEYNAME = 'ua_publicKey'
const TOKENNAME = 'ua_jot'
const URL = 'http://127.0.0.1:3000/upload/article'


export default class Edite {
  constructor(ele) {
    this.ele = ele
    this.editor = null
    this.init()
  }
  init() {
    this.editor = new Editor(this.ele)
    this.editor.config.onblur = (newHtml) => {
      this.html = newHtml // 获取最新的 html 内容
    }
    this.upload()
    this.create()
  }
  upload() {
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxsize = 5 * 1024 * 1024
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 1
    this.editor.config.uploadImgHeaders = {
      "Authorization": `Bearer ${store.get(TOKENNAME)}`
    }
    this.editor.config.uploadFileName = 'file'
    // TO DO 多图片上传
    // this.editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
    //   let formData = new FormData()
    //   formData.append('files', resultFiles)
    //   try {
    //     let result = await new Http({ type: 'uploadArticle' }, formData).send()
    //     console.log(result);
    //   } catch (err) {

    //   }
    // }
  }
  create() {
    this.editor.create()
  }
}