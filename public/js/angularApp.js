var app = angular.module("MainApp", ["ngRoute","loginApp","navApp","newpostApp","profileApp","postinfoApp","taginfoApp"]);

(app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/home', {
          templateUrl: 'views/home/home.html'
      })
      .when('/profile', {
          templateUrl: 'views/profile/profile.html',
          resolve: {
              loggedin: checkLoggedin
          },
          controller:'ProfileCtrl'
      })
      .when('/login', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl'
      })
      .when('/register', {
          templateUrl: 'views/register/register.html',
          controller: 'RegisterCtrl'
      })
      .when('/newpost', {
          templateUrl: 'views/new_post/newpost.html',
          controller: 'NewpostCtrl'
      })
        .when('/rest/user/:id', {
            templateUrl: 'views/userinfo/userinfo.html',
            controller:'UserCtrl'
        })
        .when('/rest/postinfo/:id', {
            templateUrl: 'views/postinfo/postinfo.html',
            controller: 'PostInfoCtrl'
        })
        .when('/rest/postinfo/tag/:id', {
            templateUrl: 'views/taginfo/taginfo.html',
            controller: 'TagInfoCtrl'
        })
        .when('/rest/post/:postid/comment', {
            controller:'PostInfoCtrl'
        })
      .otherwise({
          redirectTo: '/home'
      });
})
);


var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
            // User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to login';
            alert($rootScope.errorMessage);
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};

app.controller("MainCtrl", function ($scope, $http, $location,$rootScope) {
    
   
    $http.get("/rest/users")
                    .success(function (response) {
                        $scope.users = response;
                    });

    $scope.getUserById = function (id) {
        $http.get('/rest/user/' + id)
        .success(function (response) {
            $scope.user = response;
        });
    };


    $scope.getAllPosts = function () {
        $http.get('/rest/posts')
           .success(function (response) {
               $scope.posts = response;
           });
    }

    var getAllTags = function () {
        $http.get('/rest/tags')
        .success(function (response) {
            $scope.tags = response;
        })
    };

    

    $scope.isUrl = function (s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
    }


    




    $scope.getCommentsByContent = function (content) {
        $http.get('/rest/' + content + '/comments')
        .success(function (response) {
            $scope.comments = response;
        });
    }

    
        


    $http.get('/rest/tags')
        .success(function (response) {
            $scope.tags = response;
        });

    $scope.getTagById = function (id) {
        $http.get('/rest/tag/' + id)
            .success(function (response) {
                $scope.tag = response;
            });
    };

    


    $scope.incrementUpvotes = function (post) {
        $http.put('/rest/posts/' + post._id + '/uvote')
        .success(function (response) {
            $scope.post = response;
            post.upvotes += 1;
            
        }).
        error(function(data, status, headers, config) {
            if(status == 401)
            {
                alert('Please login');
            }
           
        });
        
    }

    $scope.decrementUpvotes = function (post) {
        $http.put('/rest/posts/' + post._id + '/dvote')
        .success(function (response) {
            $scope.post = response;
            post.upvotes -= 1;
        }).
        error(function (data, status, headers, config) {
            if (status == 401) {
                alert('Please login');
            }

        });
    }

   


});






