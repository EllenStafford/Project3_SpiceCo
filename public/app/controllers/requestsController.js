angular.module("requestsController", [])

.controller("reqCtrl", function(Contact){

    var app = this;
    app.accessDeny = true;
    app.erroMg = false;

    function getRequests(){
        Contact.getRequests().then(function(data){

            if(data.data.success){
                if (data.data.permission === "admin"){
                    app.contacts = data.data.contacts
       
                    app.accessDeny = false;
                }else{
                    app.erroMg = "Access Denied"
                }
            }
            console.log(data)
        });

    }

    getRequests();
    
});
