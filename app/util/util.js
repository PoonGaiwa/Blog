function toDouble(num) {
  return String(num)[1] && String(num) || '0' + num
}

function formatDate(date = new Date(), format = 'yyyy-mm-dd') {
  let regMap = {
    'y': date.getFullYear(),
    'm': toDouble(date.getMonth() + 1),
    'd': toDouble(date.getDate())
  }
  return Object.entries(regMap).reduce((acc, [reg, value]) => {
    return acc.replace(new RegExp(`${reg}+`, 'gi'), value)
  }, format)
}

export default { formatDate }