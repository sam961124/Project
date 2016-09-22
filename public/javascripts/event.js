var project = angular.module('project', ['ngRoute']);
var resData = "";

project.controller('outcomeFormController', function($element, $scope, $window) {
<<<<<<< HEAD
=======
    $scope.answers = [{
        title: "我的鼻子超級癢！！！",
        link: "https://google.com"
    }, {
        title: "鼻子上長了奇怪的東西",
        link: "https://google.com"
    }, {
        title: "在鼻子上發現紅疹",
        link: "https://google.com"
    }, {
        title: "癢癢又紅紅又怪怪又硬硬的",
        link: "https://google.com"
    }, {
        title: "我覺得鼻子靠腰癢",
        link: "https://google.com"
    }, {
        title: "鼻子超他媽的靠腰痛",
        link: "https://google.com"
    }, {
        title: "為什麼都只有鼻子有問題",
        link: "https://google.com"
    }, {
        title: "我也不知道為什麼你自己問的",
        link: "https://google.com"
    }, {
        title: "鼻子好癢好痛好煩啊啊啊啊",
        link: "https://google.com"
    }];
>>>>>>> Brian
    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.data = [];
    $scope.numberOfPages = function() {
        return Math.ceil($scope.answers.length / $scope.pageSize);
    }

    //test
    $scope.bodyparts = ['鼻子', '眼睛', '肩膀', '屁股', '大腿'];
    $scope.searchBody;

    $scope.symptoms = ['濕疹', '水泡', '過敏', '毛囊炎', '青春痘'];
    $scope.searchBody;

    $scope.hideFilter = true;
    $scope.toggle = function() {
        $scope.hideFilter = !$scope.hideFilter;
    }
});

project.controller("HttpPostController", function($scope, $http) {
    /*var bd = [];
    var bd_index = 0;
    var sym = [];
    var sym_index = 0;*/
    //user input
    $scope.detail = null;
    $scope.answers = [];

    //init data array & index
    $scope.Clear = function() {
        bd = [];
        sym = [];
        bd_index = 0;
        sym_index = 0;
    };

    //post to server

    $scope.SendData = function() {
        console.log($scope.detail);
        $http({
                method: 'POST',
                url: 'http://four.ddns.net:3000',
                data: {
                    'data': $scope.detail
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(data) {
                    console.log("posted successfully");
                    console.log(data.data);
                    $('textarea').highlightTextarea('destroy');
                    var bd = [];
                    var bd_index = 0;
                    var sym = [];
                    var sym_index = 0;
                    $(function() {
                        if (data != null) {
                            $(".loader-box").css("display", "none");
                            $(".output-container").addClass("animated fadeInRight");
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
