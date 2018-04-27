angular.module("userCrtl", [])

.controller("reg", function($http){
    this.reg = function(data){
        console.log ("form submitted");
        $http.post("/api/users", this.data)
        .then(function(data){
            console.log(data);
        });
    };
});
