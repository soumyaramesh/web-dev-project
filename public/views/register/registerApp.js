app.controller("RegisterCtrl", function ($scope, $http, $location, $rootScope,UserService) {
    $scope.register = function (user) {
        console.log(user);
        if (user.password == user.password2)
        {
            $http.post("/register", user)
            .success(function (response) {
                console.log(response);
                $rootScope.currentUser = response;
                UserService.login(response);
                $location.url("/profile");
            
            });
        }
    }
});