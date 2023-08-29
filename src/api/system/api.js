import request from '@/utils/request'

const api_name = '/admin/system/sysApi' // 接口管理接口路径

export default {
  
  // 获取接口列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  // 获取单个接口
  getById(id) {
    return request({
      url: `${api_name}/getItem/${id}`,
      method: 'get'
    })
  },

  // 保存接口
  save(sysApi) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: sysApi
    })
  },

  // 更新接口
  updateById(sysApi) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: sysApi
    })
  },

  // 删除接口
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  // 调用接口
  invokeAddApi(requestParameters) {
    return request({
      url: `${api_name}/invoke`,
      method: 'post',
      data: requestParameters,
    });
  },

  // 调用更新接口
  invokeUpdateApi(requestParameters) {
    return request({
      url: `${api_name}/invoke`,
      method: 'put',
      data: requestParameters,
    });
  },

  // 调用删除接口
  invokeDeleteApi(requestParameters) {
    return request({
      url: `${api_name}/invoke`,
      method: 'delete',
      data: requestParameters,
    });
  },
    invokeGetApi(requestParameters) {
    return request({
      url: `${api_name}/invoke`,
      method: 'get',
      params: requestParameters,
    });
  },
}