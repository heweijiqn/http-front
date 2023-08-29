import defaultSettings from '@/settings'

// 获取设置中的标题，如果没有设置则使用默认标题'Vue Admin Template'
const title = defaultSettings.title || 'Vue Admin Template'

// 定义一个函数getPageTitle，接收参数pageTitle
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}