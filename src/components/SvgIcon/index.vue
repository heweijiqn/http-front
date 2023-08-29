<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// 导入验证工具函数
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon', // 组件名称
  props: {
    iconClass: { // 图标类名
      type: String,
      required: true
    },
    className: { // 自定义类名
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * 判断是否为外部图标
     * @returns {boolean} - 是否为外部图标的布尔值
     */
    isExternal() {
      return isExternal(this.iconClass)
    },
    
    /**
     * 获取图标名称
     * @returns {string} - 图标名称
     */
    iconName() {
      return `#icon-${this.iconClass}`
    },
    
    /**
     * 获取SVG图标的类名
     * @returns {string} - SVG图标的类名
     */
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    /**
     * 获取外部图标的样式
     * @returns {Object} - 外部图标的样式对象
     */
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
