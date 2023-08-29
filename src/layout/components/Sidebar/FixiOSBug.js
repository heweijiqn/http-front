export default {
  computed: {
    /**
     * 获取设备类型
     * @returns {string} - 设备类型
     */
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    // 修复iOS设备上点击菜单会触发mouseleave事件的bug
    this.fixBugIniOS()
  },
  methods: {
    /**
     * 修复iOS设备上的bug
     */
    fixBugIniOS() {
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}
