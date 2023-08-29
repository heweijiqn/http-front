import request from '@/utils/request'

// 菜单管理相关的API请求函数
const api_name = '/admin/system/sysMenu'

export default {
  /**
   * 获取权限(菜单/功能)列表
   * @returns {Promise} - 包含权限列表的Promise对象
   */
  findNodes() {
    return request({
      url: `${api_name}/findNodes`,
      method: 'get'
    })
  },
  
  /**
   * 根据ID删除菜单
   * @param {string} id - 菜单ID
   * @returns {Promise} - 包含删除结果的Promise对象
   */
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 保存菜单
   * @param {Object} sysMenu - 菜单对象
   * @returns {Promise} - 包含保存结果的Promise对象
   */
  save(sysMenu) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: sysMenu
    })
  },

  /**
   * 更新菜单
   * @param {Object} sysMenu - 菜单对象
   * @returns {Promise} - 包含更新结果的Promise对象
   */
  updateById(sysMenu) {
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: sysMenu
    })
  },

  /**
   * 更新菜单状态
   * @param {string} id - 菜单ID
   * @param {number} status - 菜单状态
   * @returns {Promise} - 包含更新结果的Promise对象
   */
  updateStatus(id, status) {
    return request({
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: 'post'
    })
  }
}