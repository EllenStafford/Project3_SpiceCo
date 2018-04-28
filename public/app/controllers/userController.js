angular.module("userControllers", [])

.controller("regControllers", function($http){

    this.regUser = function(regData){
        console.log ("form submitted");
        $http.post("/api/users", this.regData)
        .then(function(data){
            console.log(data);
        });
    };
});
