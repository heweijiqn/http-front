import request from '@/utils/request'

const api_name = '/admin/system/format' // 格式转换接口

export default{
  /**
   * 进行格式转换
   * @param {Object} FormatObj - 要进行格式转换的对象
   * @returns {Promise} - 包含格式转换结果的Promise对象
   */
  jXY(FormatObj) {
    return request({
      url: `${api_name}/toFormat`,
      method: 'get', 
      params: FormatObj
    })
  }
}