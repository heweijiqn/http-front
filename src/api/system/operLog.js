import request from '@/utils/request'

// 定义操作日志管理接口路径
const api_name = '/admin/system/sysOperLog'

export default {
  
  /**
   * 获取操作日志列表
   * @param {number} page - 页码
   * @param {number} limit - 每页数量
   * @param {Object} sysOperLogQueryVo - 查询条件对象
   * @returns {Promise} - 包含操作日志列表的Promise对象
   */
  getLoginLogList(page, limit, sysOperLogQueryVo) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: sysOperLogQueryVo
    })
  },

  /**
   * 删除单个操作日志
   * @param {string} id - 操作日志ID
   * @returns {Promise} - 包含删除结果的Promise对象
   */
  deleteLoginLog(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 批量删除操作日志
   * @param {Array} idList - 操作日志ID列表
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
