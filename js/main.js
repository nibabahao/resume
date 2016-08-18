//创建·模块，并且依赖模块ngRoute,ngAnimate


var myapp=angular.module("myapp",["ngRoute","ngAnimate","ngTouch"]);

myapp.controller("myCtrl",function($scope){
	$scope.toggleCV=false;
	$scope.turnCV=function(){
		$scope.toggleCV=true;
	}
	$scope.turnView=function(){
		$scope.toggleCV=false;
	}
});

myapp.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl:"./route/pcDemo.html",
		controller:"indexCtrl"
	})
	.when("/mobile",{
		templateUrl:"./route/mobileDemo.html"
	})
	.when("/h5",{
		templateUrl:"./route/H5Demo.html"
	})
	.when("/other",{
		templateUrl:"./route/otherDemo.html"
	})	
});

myapp.controller("indexCtrl",function($scope){
	$scope.lists=["./img/home1.png","./img/list.png","./img/details.png","./img/login.png"];
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
})