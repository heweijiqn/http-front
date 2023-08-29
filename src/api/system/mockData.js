import request from '@/utils/request'

const api_name = '/admin/system/sysMock' // 模拟数据管理接口

export default {
  // 获取模拟数据列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  // 获取单个模拟数据
  getById(id) {
    return request({
      url: `${api_name}/getMock/${id}`,
      method: 'get'
    })
  },

  // 保存模拟数据
  save(sysMock) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: sysMock
    })
  },

  // 更新模拟数据
  updateById(sysMock) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: sysMock
    })
  },

  // 删除模拟数据
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  }
}
