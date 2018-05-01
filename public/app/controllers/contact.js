angular.module("contactController", [])

.controller("conCtrl",function($http, $location, $timeout){
    var app = this;

    this.regContact = function(regCon){
        app.errorMessage = false;
        $http.post("api/contacts", this.regCon)
        .then(function(data){
            if (data.data.success){
                app.successMessage = data.data.message;
                $timeout(function(){
                    $location.path("/profile");
                }, 2000);    
            }else{
                app.errorMessage = data.data.message;
            }
        })
    };
});