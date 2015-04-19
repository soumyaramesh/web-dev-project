var app = angular.module('profileApp', [])

app.controller("ProfileCtrl", function ($scope, $http, $location, $rootScope, UserService) {
   
    

    $scope.intial = function () {
        $scope.user = UserService.getCurrentUser();
        getUserById($scope.user._id);
        getUserPosts($scope.user._id);
    }

    var getUserPosts = function (userid) {
        $http.get('/rest/' + userid + '/posts')
        .success(function (response) {
            $scope.userposts = response;


        });
    }

    var getUserById = function (id) {
        $http.get('/rest/user/' + id)
        .success(function (response) {
            $scope.populatedUser = response;
            if ($scope.populatedUser.following.length>0)
                $scope.hasfollowing = true;
            else $scope.hasfollowing = false;
        });
    };
    

})