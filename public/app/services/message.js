angular.module("messageServices", [])

.factory("Inquiry", function($http) {
    var messageFactory = {}; 

    messageFactory.getRequests = function() {
        return $http.get('/api/message');
    };

    return messageFactory;
});