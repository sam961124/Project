var project = angular.module('project', ['ngRoute', 'ngCookies', 'isteven-multi-select', 'angular.filter']);
var resData = "";


/*$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true
    })
});*/

project.controller("HttpPostController", function($scope, $http, $cookies) {
    var bd = [];
    var bd_index = 0;
    var sym = [];
    var sym_index = 0;
    //user input
    $scope.bodySelectSetting = {
        selectAll       : "選擇全部",
        selectNone      : "全部不選",
        reset           : "重新設定",
        search          : "請輸入搜尋",
        nothingSelected : "請選擇部位..."         //default-label is deprecated and replaced with this.
    };

    $scope.symptomSelectSetting = {
        selectAll       : "選擇全部",
        selectNone      : "全部不選",
        reset           : "重新設定",
        search          : "請輸入搜尋",
        nothingSelected : "請選擇症狀..."         //default-label is deprecated and replaced with this.
    };
 
    $scope.detail = null;
    $scope.answers = [];
    $scope.bodyparts = [];
    $scope.bodyOutput = [];
    $scope.symptoms = [];
    $scope.symptomOutput = [];

    //pagination
    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.data = [];
    $scope.numberOfPages = function(){
        return Math.ceil($scope.answers.length/$scope.pageSize);
    };
    
    //function to add to scope detail on click
    $scope.AddDetail = function(event) {
        $scope.detail = $(event.target).text();
    };


    //init data array & index
    $scope.Clear = function() {
        bd = [];
        sym = [];
        bd_index = 0;
        sym_index = 0;
        $scope.currentPage = 0;
    };
    //print selected output to console when bottom search button clicked
    $scope.PrintOutput = function() {
        for(i = 0; i < $scope.bodyOutput.length; i++){
            console.log($scope.bodyOutput[i]);
        }
        for(i = 0; i < $scope.symptomOutput.length; i++){
            console.log($scope.symptomOutput[i]);
        }
    };
    //function to reset detail via the filter
    $scope.ResetDetail = function() {
        $scope.detail = "";
        for(i = 0; i < $scope.bodyOutput.length; i++){
            $scope.detail += $scope.bodyOutput[i].bodypartName;
            //console.log($scope.detail);
        }
        for(i = 0; i < $scope.symptomOutput.length; i++){
            $scope.detail += $scope.symptomOutput[i].symptomName;
            //console.log($scope.detail);
        }
    };

    $scope.ClearInputText = function() {
        $('textarea').val('');
    };

    $scope.ConsoleLog = function() {
        console.log($scope.bodyparts);
        console.log($scope.symptoms);
        
    }

    //post to server

    $scope.SendData = function() {
        console.log($scope.detail);
        $http({
                method: 'POST',
                url: 'http://four.ddns.net:3000',
                data: {
                    '_id': $cookies.get('_id'),
                    'data': $scope.detail
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(data) {
                    console.log("posted successfully");
                    $('textarea').highlightTextarea('destroy');
                    $(function() {
                        if (data != null) {
                            $scope.answers = data.data.files;
                            $(".loader-box").css("display", "none");
                            $(".output-container").addClass("animated fadeInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                $(this).removeClass('animated fadeInRight')
                            });
                            $(".output-container").css("display", "block");
                        }
                        //find out body part & symptom
                        for (i = 0; i < data.data.bd_tag.length; i++) {
                            if (data.data.bd_tag[i].charAt(0) == "B") {
                                bd[bd_index] = data.data.raw[i];
                                bd_index++;
                            }
                            if (data.data.sym_tag[i].charAt(0) == "B") {
                                sym[sym_index] = data.data.raw[i];
                                sym_index++;
                            }
                        }
                        // add bd to bodyparts
                        for (i = 0; i < bd.length; i++) {
                            $scope.bodyparts[i] = {};
                            $scope.bodyOutput[i] = {};
                            $scope.bodyparts[i].bodypartName = bd[i];
                            //console.log($scope.bodyOutput);
                        }
                        for (i = 0; i < sym.length; i++) {
                            $scope.symptoms[i] = {};
                            $scope.symptomOutput[i] = {};
                            $scope.symptoms[i].symptomName = sym[i];
                            //console.log($scope.symptomOutput);
                        }

                        //$scope.bodyparts = bd;
                        //$scope.symptoms = sym;
                        console.log(bd);
                        console.log(sym);
                        if (bd.length == 0 && sym.length != 0) {
                            $('textarea').highlightTextarea({
                                color: '#f3836c',
                                words: sym
                            });
                        } else if (sym.length == 0 && bd.length != 0) {
                            $('textarea').highlightTextarea({
                                color: '#1acff5',
                                words: bd
                            });
                        } else if (sym.length != 0 && bd.length != 0) {
                            $('textarea').highlightTextarea({
                                words: [{
                                    color: '#1acff5',
                                    words: bd,
                                }, {
                                    color: '#f3836c',
                                    words: sym,
                                }],
                                id:'HighlightTextarea'
                            });
                        }
                    });
                },
                function(data) {
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
            $(".result-container").addClass("animated fadeInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated fadeInRight')
            });
            $(".result-container").css("display", "block");
            $(".output-container").css("display", "none");
        })
    }
    $scope.goBack = function() {
        $(".output-container").addClass("animated fadeInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeInRight')
        });
        $(".output-container").css("display", "block");
        $(".result-container").css("display", "none");
    }
    $scope.hideFilter = true;
    $scope.toggle = function() {
        $scope.hideFilter = !$scope.hideFilter;
    }

    //history
    $scope.hisrecords = [{title: "鼻子上長一粒一粒的紅疹，會有點癢但是不會痛", time: "22:10", date: "1/7/2016", date_n: "Jul 1", init: true},
    {title: "腳上大拇指頂端紅腫脫皮，不知道是不是鞋子的關係，有時候又很癢，是香港腳嗎？", time: "21:12", date: "20/8/2016", date_n: "Aug 20", init: false},
    {title: "臉常常乾燥脫皮，但鼻子卻又很油", time: "19:16", date: "8/9/2016", date_n: "Sep 8", init: false},
    {title: "運動完後發現大腿後面有一處紅腫，會很癢但是不會痛，是蕁麻疹嗎？", time: "09:33", date: "25/9/2016", date_n: "Sep 25", init: false},
    {title: "前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢", time: "22:10", date: "5/10/2016", date_n: "Oct 5", init: false},
    {title: "前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢", time: "23:30", date: "5/10/2016", date_n: "Oct 5", init: false},
    {title: "前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢前幾天發燒之後，全身起紅疹，不會癢", time: "23:45", date: "5/10/2016", date_n: "Oct 5", init: false}
    ];
});

//control the pagination
project.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
