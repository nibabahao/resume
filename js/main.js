//创建·模块，并且依赖模块ngRoute,ngAnimate

//图片预加载
window.onload=function(){
var picSrc=["./img/home1.png","./img/list.png","./img/details.png","./img/login.png","./img/main.png",
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

var myapp=angular.module("myapp",["ngRoute","ngAnimate","ngTouch"]);

myapp.controller("myCtrl",function($scope){
	$scope.toggleCV=true;
	$scope.toggleView=false;
	$scope.turnCV=function(){
		$scope.toggleCV=true;
		$scope.toggleView=false;
	}
	$scope.turnView=function(){
		$scope.toggleCV=false;
		$scope.toggleView=true;
	}
});

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

myapp.controller("indexCtrl",function($scope){
	$scope.lists=[{"src":"./img/home1.png","title":"主页简介"},{"src":"./img/list.png","title":"列表页简介"},{"src":"./img/details.png","title":"详情页简介"},{"src":"./img/login.png","title":"登陆页简介"}];
	$scope.activeIndex=0;
	$scope.tab=function(index){
		$scope.activeIndex=index;
	}
	$scope.next=function(){
		$scope.activeIndex++;
		if($scope.activeIndex>$scope.lists.length-1){
			$scope.activeIndex=$scope.lists.length-1;
		}
	}
	$scope.last=function(){
		$scope.activeIndex--;
		if($scope.activeIndex<0){
			$scope.activeIndex=0;
		}
	}	
});
myapp.controller("mobileCtrl",function($scope){
	$scope.lists=[{"src":"./img/main.png","title":"主页简介"},{"src":"./img/shopping.png","title":"购物页简介"},{"src":"./img/mine.png","title":"我的页面简介"}];
	$scope.activeIndex=0;
	$scope.tab=function(index){
		$scope.activeIndex=index;
	}
	$scope.next=function(){
		$scope.activeIndex++;
		if($scope.activeIndex>$scope.lists.length-1){
			$scope.activeIndex=$scope.lists.length-1;
		}
	}
	$scope.last=function(){
		$scope.activeIndex--;
		if($scope.activeIndex<0){
			$scope.activeIndex=0;
		}
	}	
});
myapp.controller("otherCtrl",function($scope){
	$scope.lists=[{"src":"./img/nodejs.png","title":"nodejs搭建页面"},{"src":"./img/php.png","title":"php搭建列表页"},{"src":"./img/php2.png","title":"php2搭建详细页"}];
	$scope.activeIndex=0;
	$scope.tab=function(index){
		$scope.activeIndex=index;
	}
	$scope.next=function(){
		$scope.activeIndex++;
		if($scope.activeIndex>$scope.lists.length-1){
			$scope.activeIndex=$scope.lists.length-1;
		}
	}
	$scope.last=function(){
		$scope.activeIndex--;
		if($scope.activeIndex<0){
			$scope.activeIndex=0;
		}
	}	
});
