angular.module("inquiryControllers", [])

.controller("reqInq", function($http, $location, $timeout){

    var inq = this;

this.inqUser = function(inqData){
    inq.errorMessages = false;
    $http.post("/api/inquiry", this.inqData )
    .then(function(data){
        if(data.data.success){
            inq.successMessages = data.data.message;
            $timeout(function(){
                $location.path("/");
            }, 1500);
        }else{
            inq.errorMessages = data.data.message;
        }
    });
};
});