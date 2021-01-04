// promise封装wxwx.request()
module.exports = (url, type, data) => { // url 请求地址 type请求方式 data传输的数据
	let p = new Promise((resolve, reject) => {
		wx.request({
			url: url, // url 请求地址
			method: type, // type请求方式
			data: Object.assign({}, data), // data传输的数据
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}, // 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json	
			success(res) { // 接口调用成功的回调函数
				resolve(res)
			},
			fail(err) { // 接口调用失败的回调函数
				reject(err)
			}
		})
	})
	return p
}
