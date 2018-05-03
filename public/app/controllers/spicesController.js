angular.module("spicesCtrl", [])

.controller("spicesCtrl", function($http, $location, $timeout){

    var app= this;
    console.log('in spice route')
    $http.get(`/api/spices`)
    .then(data=> {app.spiceData = data.data})
});
