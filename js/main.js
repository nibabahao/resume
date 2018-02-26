//创建·模块，并且依赖模块ngRoute,ngAnimate

//图片预加载
window.onload=function(){
var picSrc=["./img/pcHome.jpg","./img/pcList.jpg","./img/pcSearch.jpg","./img/pcSubject.jpg","./img/main.jpg",
"./img/park.jpg","./img/doctor.jpg","./img/canvas.png","./img/appointment.jpg","./img/person.jpg","./img/new.jpg"]

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
	$scope.navBar=[{href:"#/",content:"祈福医院官网",class:""},{href:"#/mobile",content:"手机官网",class:""},{href:"#/h5",content:"小游戏",class:"long"},{href:"#/other",content:"医院公众号",class:"long"}];
	$scope.link=["http://www.clifford-hospital.org/","http://m.clifford-hospital.org/","https://nibabahao.github.io/heartFish/","公众号搜索广东祈福医院关注"];
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
	$scope.lists=[{"src":"./img/main.jpg","title":"主页简介"},{"src":"./img/new.jpg","title":"医院动态"},{"src":"./img/doctor.jpg","title":"医生页"}];
	$scope.activeIndex=0;
$scope.content0=[{"title":"整体布局","details":"用rem布局整体适应所有手机分辨率"},
	{"title":"轮播图效果","details":"利用css3位移动画自己封装的轮播图插件"},{"title":"公用部分",
"details":"头部和底部都为公用部分提取，头部都加入css3动画效果提高用户体验"}];
$scope.content1=[{"title":"导航栏","details":"导航栏是一个tab点击切换，利用isscroll插件内容切换时带有动画效果"},
	{"title":"内容详情","details":"列表页每次加载10条新闻，利用滚动加载每页内容"}];		
$scope.content2=[{"title":"医生加载","details":"根据不同科室加载所属科室的医生"},
	{"title":"医生排班","details":"根据后台信息显示医生的排班信息"}];		
$scope.data=[$scope.content0,$scope.content1,$scope.content2];	
});
myapp.controller("otherCtrl",function($scope){
	$scope.lists=[{"src":"./img/park.jpg","title":"停车缴费"},{"src":"./img/person.jpg","title":"个人中心"},{"src":"./img/appointment.jpg","title":"排班预约"}];
	$scope.activeIndex=0;
$scope.content0=[{"title":"车牌号码记录","details":"利用本地缓存localStroage记录最近一次付款的车牌号码"},
	{"title":"数据传输","details":"把车牌号传到支付页内调用微信支付接口"}];
$scope.content1=[{"title":"个人中心","details":"个人中心提供所有关于医院就诊的相关信息，在绑定就诊卡用扫一扫功能识别就诊卡号来绑定"}];		
$scope.content2=[{"title":"医生排班预约","details":"医生排班根据不同科室分类医生预约，用isscroll做滚动效果"}];		
$scope.data=[$scope.content0,$scope.content1,$scope.content2];	
	
});
