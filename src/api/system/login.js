import request from '@/utils/request'

// 定义登录日志管理接口路径
const api_name = '/admin/system/sysLoginLog'

export default {
  /**
   * 获取登录日志列表
   * @param {number} page - 页码
   * @param {number} limit - 每页数量
   * @param {Object} sysLoginLogQueryVo - 查询条件对象
   * @returns {Promise} - 包含登录日志列表的Promise对象
   */
  getLoginLogList(page, limit, sysLoginLogQueryVo) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: sysLoginLogQueryVo
    })
  },
  
  /**
   * 删除单个登录日志
   * @param {string} id - 登录日志ID
   * @returns {Promise} - 包含删除结果的Promise对象
   */
  deleteLoginLog(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 批量删除登录日志
   * @param {Array} idList - 登录日志ID列表
   * @returns {Promise} - 包含删除结果的Promise对象
   */
  batchDeleteLoginLogs(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idList
    })
  }
}
