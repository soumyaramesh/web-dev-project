var app = angular.module('postinfoApp', []);

app.controller('PostInfoCtrl', function ($scope, $http, $routeParams, $location, UserService) {
    var unpopulatedPost;
    $scope.initial = function () {
        console.log($routeParams.id);
        getPostById($routeParams.id);
        getUnpopulatedPost($routeParams.id);
        
       
        
    }
    var getPostById = function (id) {
        {
            $http.get('/post/' + id)
                .success(function (response) {
                    console.log(response);
                    $scope.post = response;

                });
        }
    };

    var getUnpopulatedPost = function (id) {
        $http.get('/post/unpopulated/' + id)
        .success(function (response) {
            unpopulatedPost = response;
        });
    }

    $scope.incrementCommentUpvotes = function (comment) {
        if (UserService.getCurrentUser() == null) {
            alert('Please login');
        }
        else {
            $http.put('/comment/' + comment._id + '/uvote')
            .success(function (response) {
                comment.upvotes += 1
            });
        }
    }

    $scope.decrementCommentUpvotes = function (comment) {
        if (UserService.getCurrentUser() == null) {
            alert('Please login');
        }
        else {
            $http.put('/comment/' + comment._id + '/dvote')
            .success(function (response) {
                comment.upvotes -= 1
            });
        }
    }

    $scope.addComment = function (comment) {
        if (UserService.getCurrentUser() == null) {
            $location.url('/login');
        }
        else {
            comment.author = UserService.getCurrentUser()._id;
            $http.post('/rest/post/' + $scope.post._id+ '/comment', comment)
            .success(function (response) {
                unpopulatedPost.comments.push(response._id);
                $http.put('/post', unpopulatedPost)
                .success(function (nested_response) {
                     unpopulatedPost = nested_response;
                     getUnpopulatedPost(unpopulatedPost._id);
                     $scope.comment.commentbody = '';
                     getPostById(unpopulatedPost._id);
                     
                    });
                });     
            }
        };
        
    

    
})

