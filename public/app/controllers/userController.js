angular.module("userControllers", [])

.controller("regCtrl", function($http, $location, $timeout){

    var app= this;
    this.regUser = function(regData){
        app.errorMsg = false;

        $http.post("/api/users", this.regData)
        .then(function(data){
            console.log(data);
            if (data.data.success){
                app.successMsg = data.data.message;
                $timeout(function(){
                    $location.path("/");
                }, 1500);

            } else{
                app.errorMsg = data.data.message;
            }
        });

    };
});
