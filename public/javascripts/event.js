var project = angular.module('project', ['ngRoute']);
var resData = "";


/*$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true
    })
});*/
project.controller('outcomeFormController', function($element, $scope, $window) {

    //test
    $scope.bodyparts = ['鼻子' ,'眼睛' ,'肩膀' ,'屁股' ,'大腿'];
    $scope.searchBody;

    $scope.symptoms = ['濕疹' ,'水泡' ,'過敏' ,'毛囊炎' ,'青春痘'];
    $scope.searchBody;

    $scope.hideFilter = true;
    $scope.toggle = function() {
        $scope.hideFilter = !$scope.hideFilter;
    }

    // select2 test
    //$(".body-select").select2();


});

project.controller("HttpPostController", function ($scope, $http) {
    var bd = [];
    var bd_index = 0;
    var sym = [];
    var sym_index = 0;

    //user input
    $scope.detail = null;
    $scope.answers = [];

    //init data array & index
    $scope.Clear = function () {
        bd = [];
        sym = [];
        bd_index = 0;
        sym_index = 0;
        $scope.currentPage = 0;
    };


    //pagination
    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.answers.length/$scope.pageSize);
    }

    //post to server
    $scope.SendData = function () {
        $http({
           method: 'POST',
           url: 'http://four.ddns.net:3000',
           data: {'data':$scope.detail},
           headers: {'Content-Type': 'application/json'}
       })
       .then(function(data) {
	    console.log("posted successfully");
            $(function(){
                $scope.answers = data.data.files;
                if (data != null) {
                    $(".loader-box").css("display", "none");
                    $(".output-container").addClass("animated fadeInRight");
                    $(".output-container").css("display", "block");
                }
                //find out body part & symptom
                for (i = 0; i < data.data.bd_tag.length; i++)
                {
                    if (data.data.bd_tag[i].charAt(0) == "B")
                    {
                        bd[bd_index] = data.data.raw[i];
                        bd_index++;
                    }
                    if (data.data.sym_tag[i].charAt(0) == "B")
                    {
                        sym[sym_index] = data.data.raw[i];
                        sym_index++;
                    }
                }
                console.log(bd);
                console.log(sym);
            });

		},function(data) {
			console.error("error in posting");
		});
    };
    $scope.getResult = function(id){
        $http({
           method: 'GET',
           url: 'http://four.ddns.net:3000/doc/'+id,
           headers: {'Content-Type': 'application/json'}
       })
       .then(function(data) {
            console.log("get successfully");
            $scope.result = data.data;
            $(".result-container").addClass("animated fadeInRight");
            $(".result-container").css("display", "block");
            $(".output-container").css("display", "none");
        })
    }
    $scope.goBack = function() {
        $(".output-container").addClass("animated fadeInRight");
        $(".output-container").css("display", "block");
        $(".result-container").css("display", "none");
    }
});

//control the pagination
project.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
