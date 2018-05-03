angular.module("userServices", [])

.factory("User", function($http) {
    var userFactory = {}; 

    userFactory.getPermission = function() {
        return $http.get('/api/permission');
    };

    //getFactory for users
    userFactory.getUsers = function() {
        return $http.get('/api/management');
    };

    return userFactory;
});