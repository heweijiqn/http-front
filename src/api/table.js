import request from '@/utils/request'

/**
 * 获取列表数据
 * @param {Object} params - 查询参数对象
 * @returns {Promise} - 包含列表数据的Promise对象
 */
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}