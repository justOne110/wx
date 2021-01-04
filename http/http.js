const env = require('../env/index.js') // 导入多环境
const api = require('./api.js') // 导入api请求地址
const fetch = require('./fetch.js') // 导入封装的wx.wx.request()

// 确认开发环境
let baseUrl = env.devBaseUrl
// 获取token  token鉴权时使用
// let token = wx.getStorageSync(存储token的名字)

// 封装请求函数
function banner() {
	return fetch(baseUrl + api.banner, "get", {
		type: 'index'
	}) // 传入请求参数 1.请求地址 基础地址+请求url地址 2.请求地址 3.传递的参数
}

// 消息推送
function tip() {
	return fetch(baseUrl + api.tip, "get", {})
}
// 十宫格
function grid() {
	return fetch(baseUrl + api.grid, "get", {})
}
// 爆款
function good() {
	return fetch(baseUrl + api.good, "get", {})
}
// 公告详情
function affdetail(id) {
	return fetch(baseUrl + api.affdetail, "get", {
		id: id
	})
}
// 分类左侧
function cartleft() {
	return fetch(baseUrl + api.cartleft, "get", {})
}
// 分类右侧
function cartright(id) {
	return fetch(baseUrl + api.cartright, "get", {
		categoryId: id,
		page: 1,
		pageSize: 10000
	})
}
// 主页进详情
function homedetail(id) {
	return fetch(baseUrl + api.homedetail, "get", {
		id: id
	})
}

// 加入购物车
function joinCar(token,id){
	return fetch(baseUrl + api.joinCar,"post",{token:token,goodsId:id,number:1})
}

// 删除购物车
function removeCar(token,key){
	return fetch(baseUrl + api.removeCar,"post",{token:token,key:key})
}


// 读取购物车
function readCar(token){
	return fetch(baseUrl + api.readCar,"get",{token:token})
}

// 检测token是否有效
function tokenTimeliness(token){
	return fetch(baseUrl + api.tokenTimeliness,"get",{token:token})
}

// 购物车数量
function carNum(key,token,num){
	return fetch(baseUrl + api.carNum,"post",{key:key,token:token,number:num})
}







//注册
function registor(data = {}) {
	return fetch(baseUrl + api.registor, 'post', data)
}

//登陆
function login(data) {
	return fetch(baseUrl + api.login, 'post', data)
}
//用户详细信息
function userDetail(data) {
	return fetch(baseUrl + api.userDetail, 'get', data)
}
// 把请求函数导出
module.exports = {
	banner,
	tip,
	grid,
	good,
	affdetail,
	cartleft,
	cartright,
	homedetail,
	registor,
	login,
	userDetail,
	joinCar,
	removeCar,
	readCar,
	tokenTimeliness,
	carNum
	
	

}
