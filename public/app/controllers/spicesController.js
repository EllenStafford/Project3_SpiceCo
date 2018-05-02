angular.module("spicesCtrl", [])

.controller("spicesCtrl", function($http, $location, $timeout){

    var app= this;
    console.log('in spice route')
    $http.get(`/api/spices`)
    .then(data=> {app.spiceData = data.data})
    // this.regUser = function(regData){
    //     app.errorMsg = false;

    //     $http.get("/api/spices", this.regData)
    //     .then(function(data){
    //         console.log(data);
    //         if (data.data.success){
    //             app.successMsg = data.data.message;
    //             $timeout(function(){
    //                 $location.path("/");
    //             }, 1500);

    //         } else{
    //             app.errorMsg = data.data.message;
    //         }
    //     });

    // };
});
