import request from '@/utils/request'

const api_name = '/admin/system/sysUserItem'

export default {
  // 根据项目id查询项目已分配的成员
  getUserByItemId(itemId) {
    return request({
      url: `${api_name}/toAssign/${itemId}`,
      method: 'get'
    })
  },

  // 分配成员
  assginUsers(assginUserVo) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      data: assginUserVo
    })
  }
}