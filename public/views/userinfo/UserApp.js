app.controller('UserCtrl', function ($scope, $http, $location, $rootScope,$routeParams,UserService) {
    var unpopulatedUser;
    $scope.initial = function () {
        getUserById($routeParams.id);
        getUserPosts($routeParams.id);
        $scope.currentUser = UserService.getCurrentUser();
     
        if ($scope.currentUser != null) {
            console.log($scope.currentUser._id);
            getUnpopulatedUser($scope.currentUser._id);
            isFollowingUser($routeParams.id);
            isSameUser($routeParams.id);
        }

       
    }

    var getUserById = function (id) {
        $http.get('/rest/user/' + id)
        .success(function (response) {
            $scope.user = response;
            if ($scope.user.following.length > 0)
                $scope.hasfollowing = true;
            else $scope.hasfollowing = false;
        });
    };

    var getUnpopulatedUser = function (id) {
        $http.get('/user/unpopulated/' + id)
        .success(function (response) {
            unpopulatedUser = response;
            
        });
    };

    

    var getUserPosts = function (id) {
        $http.get('/rest/' + id + '/posts')
        .success(function (response) {
            $scope.userposts= response;

        });
    }

    var isSameUser = function (otheruserid) {
        
        if ($scope.currentUser._id == otheruserid) {
            $scope.sameUser=true;
        }
        else {
            $scope.sameUser = false;
        }
        //console.log($scope.sameUser)
    }

    var isFollowingUser = function () {

        var currentUserFollowing = $scope.currentUser.following;
        var otheruserid = $routeParams.id;
        console.log($scope.currentUser.following);
        console.log(currentUserFollowing.indexOf(otheruserid));
        if ((currentUserFollowing.indexOf(otheruserid))>=0) {
            $scope.following= true;
        }
        else {
            $scope.following= false;
        }
        console.log($scope.following);
    }

    $scope.followThisUser = function () {
        unpopulatedUser.following.push($routeParams.id);
        $scope.currentUser.following.push($routeParams.id);
        $http.put('/user',unpopulatedUser)
        .success(function (nested_response) {
            $scope.currentUser = nested_response;
            $scope.initial();
            //$scope.following = false;
            //getUserById($scope.currentUser._id);
            //getUserPosts($scope.currentUser._id);
            //getUnpopulatedUser(unpopulatedUser._id);
            
                     
        });
       
    };     


    $scope.unfollowThisUser = function () {
       
        var ind = unpopulatedUser.following.indexOf($routeParams.id);
        console.log(ind);
        if (ind >= 0) {
            unpopulatedUser.following.splice(ind, 1);
            $scope.currentUser.following.splice(ind, 1);
            console.log(unpopulatedUser);
            $http.put('/user', unpopulatedUser)
            .success(function (nested_response) {
                $scope.currentUser = nested_response;
                $scope.initial();
                //$scope.following = false;
                //getUserById($scope.currentUser._id);
                //getUserPosts($scope.currentUser._id);
                //getUnpopulatedUser(unpopulatedUser._id);
                
        });
        }
        
        
    }





   
    

   
})

