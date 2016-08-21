var project = angular.module('project', ['ngRoute']);
var resData = "";

project.controller('outcomeFormController', function($element, $scope, $window) {
     $scope.answers = [
         {title:"我的鼻子超級癢！！！", link:"https://google.com"},
         {title:"鼻子上長了奇怪的東西", link:"https://google.com"},
         {title:"在鼻子上發現紅疹", link:"https://google.com"},
         {title:"癢癢又紅紅又怪怪又硬硬的", link:"https://google.com"},
         {title:"我覺得鼻子靠腰癢", link:"https://google.com"},
         {title:"鼻子超他媽的靠腰痛", link:"https://google.com"},
         {title:"為什麼都只有鼻子有問題", link:"https://google.com"},
         {title:"我也不知道為什麼你自己問的", link:"https://google.com"},
         {title:"鼻子好癢好痛好煩啊啊啊啊", link:"https://google.com"}
    ];
    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.answers.length/$scope.pageSize);
    }
});

project.controller("HttpPostController", function ($scope, $http) {
    $scope.detail = null;
    $scope.SendData = function () {
        console.log($scope.detail);
        $http({
           method: 'POST',
           url: 'http://52.41.60.7:3000',
           data: {'data':$scope.detail},
           headers: {'Content-Type': 'application/json'}
       })
       .then(function(data) {
	    console.log("posted successfully");
            console.log(data);
            $(function(){
                if (data != null) {
                    $(".loader-box").css("display", "none");
                    $(".output-container").addClass("animated fadeInRight");
                    $(".output-container").css("display", "block");
                }
            });

		},function(data) {
			console.error("error in posting");
		});
    };

});
project.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
