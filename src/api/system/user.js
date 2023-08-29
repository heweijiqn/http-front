
import request from '@/utils/request'

// 用户管理相关的API请求函数
const api_name = '/admin/system/sysUser'

export default {
  /**
   * 获取分页列表
   * @param {number} page - 页码
   * @param {number} limit - 每页数量
   * @param {Object} searchObj - 搜索条件对象
   * @returns {Promise} - 包含分页列表的Promise对象
   */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  /**
   * 根据ID获取用户信息
   * @param {string} id - 用户ID
   * @returns {Promise} - 包含用户信息的Promise对象
   */
  getById(id) {
    return request({
      url: `${api_name}/getUser/${id}`,
      method: 'get'
    })
  },

  /**
   * 保存角色
   * @param {Object} role - 角色对象
   * @returns {Promise} - 包含保存结果的Promise对象
   */
  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  },

  /**
   * 根据用户ID更新数据
   * @param {Object} role - 角色对象
   * @returns {Promise} - 包含更新结果的Promise对象
   */
  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  },

  /**
   * 根据ID删除数据
   * @param {string} id - 数据ID
   * @returns {Promise} - 包含删除结果的Promise对象
   */
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 更新用户状态
   * @param {string} id - 用户ID
   * @param {number} status - 用户状态
   * @returns {Promise} - 包含更新结果的Promise对象
   */
  updateStatus(id, status) {
    return request({
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: 'get'
    })
  }
}