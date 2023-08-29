import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      // 移动设备且侧边栏为打开状态
      if (this.device === 'mobile' && this.sidebar.opened) {
        // 调用app模块的closeSideBar方法，关闭侧边栏
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    // 监听窗口大小变化，调用$_resizeHandler方法
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    // 移除窗口大小变化的监听事件
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    // 判断是否为移动设备
    const isMobile = this.$_isMobile()
    if (isMobile) {
      // 调用app模块的toggleDevice方法，设置设备为'mobile'
      store.dispatch('app/toggleDevice', 'mobile')
      // 调用app模块的closeSideBar方法，关闭侧边栏
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // 使用$_作为混入属性的前缀
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 判断是否为移动设备
    $_isMobile() {
      // 获取body的边界矩形
      const rect = body.getBoundingClientRect()
      // 判断边界矩形的宽度是否小于阈值WIDTH
      return rect.width - 1 < WIDTH
    },
    // 窗口大小变化的处理函数
    $_resizeHandler() {
      // 如果文档不是隐藏状态
      if (!document.hidden) {
        // 判断是否为移动设备
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
