

const baseUrl = 'https://slideverywhere-api.xav1er.com'
const request = ({url='',data={},method,header={}}:UniApp.RequestOptions)=>{
	console.log(method)
	try {
		const token = uni.getStorageSync('token');
		if (token) {
			// console.log(token);
			header['Authorization']='bearer '+token
		}
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
	} catch (e) {
		// error
		console.log(e)
	}
	
	
}
export default request