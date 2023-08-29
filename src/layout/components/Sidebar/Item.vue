<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // 如果icon包含'el-icon'
      if (icon.includes('el-icon')) {
        // 将<i class={[icon, 'sub-el-icon']} />添加到vnodes数组中
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 将<svg-icon icon-class={icon}/>添加到vnodes数组中
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      // 将<span slot='title'>{(title)}</span>添加到vnodes数组中
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    // 返回vnodes数组
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
