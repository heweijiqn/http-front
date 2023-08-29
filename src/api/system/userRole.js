import request from '@/utils/request'

// 用户角色分配相关的API请求函数
const api_name = '/admin/system/sysUserRole'

export default {
  /**
   * 根据用户ID查询用户已分配的角色
   * @param {string} userId - 用户ID
   * @returns {Promise} - 包含角色列表的Promise对象
   */
  getRolesByUserId(userId) {
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'get'
    })
  },

  /**
   * 分配角色
   * @param {Object} assginRoleVo - 角色分配信息对象
   * @returns {Promise} - 包含分配结果的Promise对象
   */
  assignRoles(assginRoleVo) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      data: assginRoleVo
    })
  }
}