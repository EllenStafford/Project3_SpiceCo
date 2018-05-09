angular.module("requestsController", [])

.controller("reqCtrl", function(Contact){

    var app = this;
    app.accessDeny = true;
    app.erroMg = false;

    Contact.getRequests().then(function(data){
        if(data.data.success){

        }else{
            app.erroMg = data.data.message;
        }
        console.log(data)
    });
    
});
