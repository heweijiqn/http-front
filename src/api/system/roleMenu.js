import request from '@/utils/request'

// 角色菜单分配相关的API请求函数
const api_name = '/admin/system/sysRoleMenuAllot'

export default {
  /**
   * 查看某个角色的权限列表
   * @param {string} roleId - 角色ID
   * @returns {Promise} - 包含权限列表的Promise对象
   */
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },

  /**
   * 给某个角色授权
   * @param {Object} assginMenuVo - 授权信息对象
   * @returns {Promise} - 包含授权结果的Promise对象
   */
  doAssign(assginMenuVo) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      data: assginMenuVo
    })
  }
}