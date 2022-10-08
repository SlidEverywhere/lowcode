import request from './request'

export function login(data={}){
	return request({url:'/auth/login',method:'POST',data:data})
}