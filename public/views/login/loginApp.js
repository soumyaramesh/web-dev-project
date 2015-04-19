var app = angular.module('loginApp',[])

app.controller("LoginCtrl", function ($scope, $http, $location, $rootScope,UserService) {
    $scope.login = function (user) {
        
        
        $http.post("/login", user)
        .success(function (response) {
            
            //console.log(response);
            $rootScope.currentUser = response;
            
                UserService.login(response);
                //console.log($rootScope.currentUser);
                $location.url("/profile");
            
        }).
        error(function (data, status, headers, config) {
            if (status == 401) {
                alert('Invalid credentials');
            }

        });
        
    }
});