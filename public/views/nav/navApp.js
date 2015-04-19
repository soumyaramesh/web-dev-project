var app = angular.module('navApp', [])

app.controller("NavCtrl", function ($scope, $http, $location, $rootScope,UserService) {
    $scope.logout = function () {
        $http.post("/logout")
        .success(function () {
            $rootScope.currentUser = null;
            UserService.logout();
            $location.url("/home");
        });
    }
});