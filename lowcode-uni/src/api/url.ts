export function getUrlParam(key:string) {
	const url = location.href
	  // 获取 hash 值，不包含 '#' 号
	  const hash = url.substring(url.indexOf("#") + 1)
	  // 查找 '?' 号所在的索引
	  const searchIndex = hash.indexOf("?")
	  // '?' 号后面接的是索引参数，如果找到则+1，去除'?' 号
	  const search = searchIndex !== -1 ? hash.substring(searchIndex + 1) : ""
	  // 把搜索参数字符串提过URLSearchParams转成对象形式
	  const usp = new URLSearchParams(search)
	  // 通过URLSearchParams自带的get方法，查询键所对应的值
	  return usp.get(key)
}