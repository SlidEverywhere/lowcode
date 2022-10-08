import request from './request'

export function login(data={}){
	return request({url:'/a',method:'GET',data:data})
}