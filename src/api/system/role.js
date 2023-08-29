import request from '@/utils/request'

// 角色管理相关的API请求函数
const api_name = '/admin/system/sysRole'

export default {
  /**
   * 获取角色分页列表（带搜索）
   * @param {number} page - 页码
   * @param {number} limit - 每页数量
   * @param {Object} searchObj - 搜索条件对象
   * @returns {Promise} - 包含角色分页列表的Promise对象
   */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  /**
   * 删除角色
   * @param {string} id - 角色ID
   * @returns {Promise} - 包含删除结果的Promise对象
   */
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 添加角色
   * @param {Object} role - 角色对象
   * @returns {Promise} - 包含添加结果的Promise对象
   */
  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  },

  /**
   * 根据ID获取角色
   * @param {string} id - 角色ID
   * @returns {Promise} - 包含角色信息的Promise对象
   */
  getById(id) {
    return request({
      url: `${api_name}/findRoleById/${id}`,
      method: 'post'
    })
  },

  /**
   * 更新角色
   * @param {Object} role - 角色对象
   * @returns {Promise} - 包含更新结果的Promise对象
   */
  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: role
    })
  },

  /**
   * 批量删除角色
   * @param {Array} idList - 角色ID列表
   * @returns {Promise} - 包含删除结果的Promise对象
   */
  batchRemove(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: `delete`,
      data: idList
    })
  }
}

