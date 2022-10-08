

const baseUrl = ''
const request = ({url='',data={},method,header={}}:UniApp.RequestOptions)=>{
	console.log(method)
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			method:method,
			data:data
		})
	})
}
export default request