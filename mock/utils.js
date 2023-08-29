/**
 * 将URL参数字符串转换为对象
 * @param {string} url - URL参数字符串
 * @returns {Object} - 转换后的对象
 */
function param2Obj(url) {
  // 解码URL参数字符串
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

module.exports = {
  param2Obj
}