<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  // 使用ResizeMixin混入
  mixins: [ResizeMixin],
  computed: {
    // 获取侧边栏的状态
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 获取设备类型
    device() {
      return this.$store.state.app.device
    },
    // 获取是否固定头部的状态
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 返回一个包含class的对象
    classObj() {
      return {
        // 如果侧边栏未打开，则添加hideSidebar类
        hideSidebar: !this.sidebar.opened,
        // 如果侧边栏已打开，则添加openSidebar类
        openSidebar: this.sidebar.opened,
        // 如果侧边栏关闭时不使用动画，则添加withoutAnimation类
        withoutAnimation: this.sidebar.withoutAnimation,
        // 如果设备类型为移动设备，则添加mobile类
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    // 点击外部区域的处理函数
    handleClickOutside() {
      // 调用app模块的closeSideBar方法，关闭侧边栏
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
