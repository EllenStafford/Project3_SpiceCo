angular.module("managementController", [])

.controller("managementCtrl", function(User){
    var app = this;
    app.accessDenied = true;
    app.errorMsg =false;
    app.editAccess = false;
    app.deleteAccess = false;

    User.getUsers().then(function(data){
        console.log(data);
        if (data.data.success){       
            if (data.data.permission === "admin"){
                app.users = data.data.users;
                app.accessDenied = false;
                app.editAccess = true;
                app.deleteAccess = true;
            } else{
                app.errorMsg = "Access Denied!"
            }
        }
    })
});

