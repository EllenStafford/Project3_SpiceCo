angular.module("requestsController", [])

.controller("reqCtrl", function(Contact){

    var app = this;

        Contact.getRequests().then(function(data){
            if(data.data.success){
               app.contacts = data.data.contacts
            }
            console.log(data)
        });   
});
