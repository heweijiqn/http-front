<template>
  <div :class="{'has-logo':showLogo}">
    <!-- 显示Logo组件 -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 遍历路由生成侧边栏菜单项 -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

// 这段代码是一个Vue组件对象，用于渲染侧边栏。它包含了计算属性和引入的组件。
export default {
  components: { SidebarItem, Logo }, // 引入侧边栏子组件
  computed: {
    ...mapGetters([
      'sidebar' // 获取vuex中的sidebar状态
    ]),
    routes() {
      // 获取路由配置
      // return this.$router.options.routes
      return this.$router.options.routes.concat(global.antRouter)
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置了activeMenu，则侧边栏高亮显示设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo // 获取vuex中的sidebarLogo状态
    },
    variables() {
      return variables // 获取样式变量
    },
    isCollapse() {
      return !this.sidebar.opened // 判断侧边栏是否折叠
    }
  }
}
</script>