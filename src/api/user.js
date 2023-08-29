import request from '@/utils/request'

// 用户登入
export function login(data) {
  return request({
    url: '/admin/system/index/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/system/index/info',
    method: 'get',
    params: { token }
  })
}

// 用户退出登录
export function logout() {
  return request({
    url: '/admin/system/index/logout',
    method: 'post'
  })
}

// 用户注册
export function register() {
  return request({
    url: '/admin/system/sysUser/save',
    method: 'post'
  })
}