export default class http {
  constructor({ host = 'http://127.0.0.1:3000' } = {}) {
    this.hostUrl = host
  }
  show() {
    return this.hostUrl
  }
}