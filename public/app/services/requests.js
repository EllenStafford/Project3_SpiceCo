angular.module("requestServices", [])

.factory("Contact", function($http) {
    var contactFactory = {}; 

    contactFactory.getRequests = function() {
        return $http.get('/api/requests');
    };

    return contactFactory;
});