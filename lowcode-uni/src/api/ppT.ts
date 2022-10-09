import request from './request'
export function list(data={}){
	return request({url:'/slide/list',method:'GET',data:data})
}
// /play/join/{id}
export function join(data:string){
	return request({url:`/play/join/${data}`,method:'POST'})
}
// /play/control
export function control(data={},Id:string){
	return request({url:`/play/control/${data}`,method:'POST',data:data})
}
// /play/stop/{id}
export function stop(data={},Id:string){
	return request({url:`/play/stop/${data}`,method:'POST',data:data})
}