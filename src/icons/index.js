// 导入Vue模块
import Vue from 'vue'
// 导入SvgIcon组件
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon)

// 使用require.context方法获取指定目录下以.svg结尾的文件
const req = require.context('./svg', false, /\.svg$/)
// 定义一个函数requireAll，将获取到的文件作为参数传入并返回
const requireAll = requireContext => requireContext.keys().map(requireContext)
// 调用requireAll函数，将获取到的文件传入
requireAll(req)