import request from '@/utils/request'

const api_name = '/admin/system/sysItemApi'

export default {
    getApiByItemId(itemId) {
        return request({
            url: `${api_name}/toAssign/${itemId}`,
            method: 'get'
        })
    },

    // 分配接口
    assginApi(assginApiVo) {
        return request({
            url: `${api_name}/doAssign`,
            method: 'post',
            data: assginApiVo
        })
    },
      //展示接口所属的项目
    getItemsByApiId(apiId) {
        return request({
            url: `${api_name}/getItemsByApiId/${apiId}`,
            method: 'get'
        })
    },
}

