var project = angular.module('project', ['ngRoute']);

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

project.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}
// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://52.41.60.7:3000';

  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
