angular.module("messageController", [])

.controller("messageCtrl", function(Inquiry){

    var app = this;

        Inquiry.getRequests().then(function(data){
            if(data.data.success){
               app.messages = data.data.messages
            }
            console.log(data)
        });   
});
