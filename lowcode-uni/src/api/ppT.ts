import request from './request'
export function list(data={}){
	return request({url:'/slide/list',method:'GET',data:data})
}