app.factory('UserService', function () {
    var currentUser = null;
    var login = function (user) {
        currentUser = user;
        console.log("from userservice")
        //console.log(currentUser);
    }

    var getCurrentUser = function () {
       
        return currentUser;
    }
    var logout = function () {
        currentUser = null;
    }
    return {
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout
    };

})