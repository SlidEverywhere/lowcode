import http from './request/http'

const api = {
  // 获取用户信息
  register: ({username, password}:{username:string,password:string}) => http('post', '', '/auth/register',  {username, password}),
  login: ({username, password}:{username:string,password:string}) => http('post', '', '/auth/login', {username, password}),
  getUserInfo: (token:string) => http('post', '', '/auth/validate', token)


  // 模拟从接口获取用户信息
  // getUserInfo () {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log('got userInfo')
  //       resolve({
  //         data: {
  //           userId: '666',
  //           nickName: 'Neo',
  //           accessIdList: ['10000', '10001', '10002']
  //         },
  //         errorCode: 0,
  //       })
  //     }, 200)
  //   })
  // },
}

export default api