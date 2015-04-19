var app = angular.module('newpostApp', [])


app.controller("NewpostCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.tagList = [];

        $http({
            method: 'GET',
            url: '/rest/tags'
            
        }).success(function (result) {
            $scope.tagList = result;
        });
        


    

    $scope.submitPost = function (newpost) {
            $http.post("/rest/post", newpost)
            .success(function (response) {
                $rootScope.posts = response;
                $location.url('/home');
        
            });
        }
});