angular.module("inquiryControllers", [])

.controller("reqInq", function($http, $location, $timeout){

    var inq = this;

this.inqUser = function(inqData){
    inq.errorMessages = false;
    console.log("form submitted");
    $http.post("/api/inquiry", this.inqData )
    .then(function(data){
        console.log(data.data.success);
        console.log(data.data.message);
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