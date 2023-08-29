import request from '@/utils/request'

const api_name = '/admin/system/sysItem' // 项目管理接口路径

export default {

  // 获取项目列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  // 获取单个项目
  getById(id) {
    return request({
      url: `${api_name}/getItem/${id}`,
      method: 'get'
    })
  },

  // 保存项目
  save(sysItem) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: sysItem
    })
  },

  // 更新项目
  updateById(sysItem) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: sysItem
    })
  },

  // 删除项目
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  // swagger信息传给后端
  postSwaggerInfo(info, sysApi) {
    return request({
      url: `${api_name}/import`,
      contentType: 'application/json;charset=UTF-8',
      method: 'post',
      data: { info, sysApi}
    })
  }
}
