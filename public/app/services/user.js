angular.module("userServices", [])

.factory("User", function($http) {
    var userFactory = {}; 

    userFactory.getPermission = function() {
        return $http.get('/api/permission');
    };

    return userFactory;
});