const TEMP_MAP = {
  'user': {
  },
  'modal': {

  }
}
export default class TempCompile {
  constructor({ wrap = "body", name, data = {} }) {
    this.wrap = $(wrap)
    this.name = name
    this.data = data
    this.init()
  }
  init() {
    this.tempHandle = Handlebars.templates[`${this.name}.hbs`]
    this.render()
  }
  render() {
    this.wrap.html(this.getHTML())
  }
  getHTML() {
    return this.tempHandle(this.data)
  }
  static render(tempName, data) {
    return Handlebars.templates[`${tempName}.hbs`](data)
  }
}