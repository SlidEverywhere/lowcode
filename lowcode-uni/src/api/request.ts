

const baseUrl = 'https://slideverywhere-api.xav1er.com'
const request = ({url='',data={},method,header={}}:UniApp.RequestOptions)=>{
	console.log(method)
	return new Promise<any>((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			method:method,
			data:data,
			header:{...header},
			success:(res:any)=>{
				// if(res.code===2000){
					
				// 	resolve(res.data)
				// 	return
				// }
				resolve(res)
				
				
			}
		})
	})
}
export default request