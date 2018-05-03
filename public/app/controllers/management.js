angular.module("managementController", [])

.controller("managementCtrl", function(User){
    console.log("testing admin");
    User.getUsers().then(function(data){
        console.log(data);
    })
});

