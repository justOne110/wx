//  请求的url地址
module.exports = {
	"registor": "/user/wxapp/register/complex", //注册
	"login": "/user/wxapp/login", //登陆
	"userDetail": "/user/detail" ,//用户详细信息
	
	banner: "/banner/list", // 轮播
	tip: "/notice/list", // 通告
	grid: "/shop/goods/category/all", // 十宫格
	good: "/shop/goods/list",
	affdetail: "/notice/detail", // 公告详情
	cartleft: "/shop/goods/category/all ", // 分类左侧
	cartright: "/shop/goods/list", // 分类右侧
	homedetail: "/shop/goods/detail",// 主页进详情
	joinCar:"/shopping-cart/add",// 加入购物车
	removeCar:"/shopping-cart/remove", // 删除购物车
	readCar:"/shopping-cart/info",// 读取购物车
	tokenTimeliness:"/user/check-token",// 检测token时效
	carNum:"/shopping-cart/modifyNumber",// 购物车数量
}
