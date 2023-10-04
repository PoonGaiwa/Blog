export default class RegExpVerify {
  constructor(type) {
    this.type = type
  }
  submitIntercept() {
    this.formMap = {
      resgister: {
        username: 'required|is_phone',
        pwd: 'required|is_pwd'
      }
    }
  }
}