//创建·模块，并且依赖模块ngRoute,ngAnimate

//图片预加载
window.onload=function(){
var picSrc=["./img/pcHome.jpg","./img/pcList.png","./img/pcSearch.jpg","./img/pcSubject.jpg","./img/main.png",
"./img/shopping.png","./img/mine.png","./img/canvas.png","./img/nodejs.png","./img/php.png","./img/php2.png"]

function imgLoad(){
	var count=0;
	for(var i=0,len=picSrc.length;i<len;i++){
		var img=new Image();
		img.src=picSrc[i];
		img.onload=function(){
			count++;
			if(count==picSrc.length){
				console.log("已加载了"+count+"张图片");
			}
		}
	}
	console.log(count);
}
imgLoad();
}
/****创建angularJS应用****/
var myapp=angular.module("myapp",["ngRoute","ngAnimate","ngTouch"]);

/*****创建主控制器***/
myapp.controller("myCtrl",function($scope){
	$scope.toggleCV=true;//控制简历页的标记
	$scope.toggleView=false;//控制作品页的标记
	$scope.turnCV=function(){
		$scope.toggleCV=true;
		$scope.toggleView=false;
	}
	$scope.turnView=function(){
		$scope.toggleCV=false;
		$scope.toggleView=true;
	}
	$scope.print=function(){
		window.print();
	}
	$scope.email=function(){
		alert("我的邮箱:50671234@qq.com");
	}
	//更改地址
	$scope.linkIndex=0;
	$scope.navBar=[{href:"#/",content:"PC端项目",class:""},{href:"#/mobile",content:"移动端项目",class:""},{href:"#/h5",content:"网站后台系统",class:"long"},{href:"#/other",content:"angular项目",class:"long"}];
	$scope.link=["http://www.clifford-hospital.org/","https://nibabahao.github.io/lifeFamily/","https://nibabahao.github.io/heartFish/",""];
	$scope.address=function(index){
		$scope.linkIndex=index;
		console.log(index);
	}
});

/****配置路由将作品多页HTML生成单页****/

myapp.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl:"./route/pcDemo.html",
		controller:"indexCtrl"
	})
	.when("/mobile",{
		templateUrl:"./route/mobileDemo.html",
		controller:"mobileCtrl"
	})
	.when("/h5",{
		templateUrl:"./route/H5Demo.html"
	})
	.when("/other",{
		templateUrl:"./route/otherDemo.html",
		controller:"otherCtrl"
	})	
});
/***********自定义指令******************/
myapp.directive("carousel",function(){
	return {
		scope:false,
		restrict:"E",
		transclude:true,
		template:'<div id="inner" class="clearfix" ng-style="myObj">'
				  +'<div class="slide clearfix" ng-repeat="list in lists"  ng-swipe-left="next()" ng-swipe-right="last()">'
				  +'<img src="{{list.src}}">'
				  +'<dl>'
				  +'<dt>{{list.title}}</dt>'
				  +'<dd ng-repeat="con in data[activeIndex]">'
				  +'<h4>{{con.title}}</h4>'
				  +'<p>{{con.details}}</p>'
				  +'</dd>'								
			      +'</dl>'
				  +'</div>'
	              +'</div>'
	              +'<div class="pagination">'
		          +'<span ng-repeat="list in lists" ng-class="{active:$index==activeIndex}" ng-click="tab($index)"></span>'
	              +'</div>',          
		link:function(scope,elem,attr){
			scope.tab=function(index){
				scope.activeIndex=index;
				scope.move();
			}
			scope.next=function(){
				scope.activeIndex++;
				if(scope.activeIndex>scope.lists.length-1){
					scope.activeIndex=scope.lists.length-1;
				}
				scope.move();
			}
			scope.last=function(){
				scope.activeIndex--;
				if(scope.activeIndex<0){
					scope.activeIndex=0;
				}
				scope.move();
			}	
			scope.move=function(){
				scope.myObj = {
					left:-scope.activeIndex*100+'%'
		    	}	
			}
		}
	}
})



/******第一页控制器****/
myapp.controller("indexCtrl",function($scope){
	/****创建内容数据****/
	$scope.lists=[{"src":"./img/pcHome.jpg","title":"主页简介"},{"src":"./img/pcList.jpg","title":"列表页简介"},{"src":"./img/pcSearch.jpg","title":"医生搜索页"},{"src":"./img/pcSubject.jpg","title":"科室专题页"}];
	$scope.content0=[{"title":"页面布局","details":"采用固定像素分上中下静态布局，而顶部导航栏和底部友情链接都作为公共部分提取以供不同页面调用"},
	{"title":"轮播图效果","details":"利用isScroll插件实现图片切换时的淡入淡出效果并使分页器带动画效果"},{"title":"图标分类",
"details":"当鼠标移入下面三个大图标时会有视觉效果比较好的css3动画效果"}];
	$scope.content1=[
	{"title":"列表内容部分","details":"写好静态模版用PHP编写成动态模版"},{"title":"列表展开特效",
"details":"列表展开都带有伸缩动画加强体验"}];
	$scope.content2=[{"title":"医生搜索","details":"根据输入框输入内容用ajax传到后台后跳转到搜索页"},
	{"title":"科室医生分类","details":"用Tab切换加上淡入淡出动画显示各个科室"}];
	$scope.content3=[{"title":"轮播图","details":"用JQ写出淡入淡出效果外加css3使页面更生动"},
	{"title":"后台数据交互","details":"利用ajax调用后台验证账号密码接口，根据返回信息判断登录是否成功 "}];
	$scope.data=[$scope.content0,$scope.content1,$scope.content2,$scope.content3];
	$scope.activeIndex=0;//控制内容页面的标记位置
	
});
myapp.controller("mobileCtrl",function($scope){
	$scope.lists=[{"src":"./img/main.png","title":"主页简介"},{"src":"./img/shopping.png","title":"购物页简介"},{"src":"./img/mine.png","title":"我的页面简介"}];
	$scope.activeIndex=0;
$scope.content0=[{"title":"整体布局","details":"用百分比布局以便适应不同手机的分辨率"},
	{"title":"轮播图效果","details":"由于手机上性能问题，用原生和jq写出来动画效果会不流畅，所有可以用swiper.js减少性能消耗优化动画"},{"title":"公用部分",
"details":"，头部和底部都为公用部分提取，都采用固定定位定格在头和尾部"}];
$scope.content1=[{"title":"遮盖层","details":"开始以蒙层和弹窗的方式引导用户现在最新的优惠，触屏蒙层部分弹窗消失"},
	{"title":"内容详情","details":"内容分两部分，介绍商品用png压缩图片体积少不失真加文字内容展示，评价页用tab切换来显示不同部分，减少页面嵌套"},{"title":"商品限时",
"details":"采用计时器设定好限时时间来"}];		
$scope.content2=[{"title":"我的首页","details":"每个li按钮都对应不同页面以便用户修改个人信息"},
	{"title":"登录","details":"在跳到我的页面之前，会有一个登录注册页面"}];		
$scope.data=[$scope.content0,$scope.content1,$scope.content2];	
});
myapp.controller("otherCtrl",function($scope){
	$scope.lists=[{"src":"./img/nodejs.png","title":"nodejs搭建页面"},{"src":"./img/php.png","title":"php搭建列表页"},{"src":"./img/php2.png","title":"php搭建详细页"}];
	$scope.activeIndex=0;
$scope.content0=[{"title":"服务器搭建","details":"用nodeJS中的express快速搭建整个应用"},
	{"title":"jade模板","details":"设置jade模板用来接受接口的数据和逐一填充上去"},{"title":"调用接口",
"details":"利用request模块去接受网络上豆瓣的接口并保存豆瓣的数据"}];
$scope.content1=[{"title":"PHP解析接口","details":"用file_get_contents获取豆瓣的接口变解析成json对象后导入数据库"},
	{"title":"数据填充","details":"在模板页面上从数据库里填充数据完成列表页面"}];		
$scope.content2=[{"title":"详情页的填充","details":"根据列表页传输过来的ID再从数据库找到对应ID的数据填充到页面上"}];		
$scope.data=[$scope.content0,$scope.content1,$scope.content2];	
	
});
