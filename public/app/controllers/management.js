angular.module("managementController", [])

.controller("managementCtrl", function(User, $scope){
    var app = this;
    app.accessDenied = true;
    app.errorMsg =false;
    app.deleteAccess = false;

    function getUsers(){
        User.getUsers().then(function(data){
            console.log(data);
            if (data.data.success){       
                if (data.data.permission === "admin"){
                    app.users = data.data.users;
                    app.accessDenied = false;
                    app.deleteAccess = true;
                } else{
                    app.errorMsg = "Access Denied!"
                }
            }
        })
    }

    getUsers();


    app.deleteUser = function(username){
    User.deleteUser(username).then(function(data){
    if(data.data.success){
    getUsers();
    }else{
        app.errorMsg = data.data.message;
    }
    })
    }

    app.search = function(searchClient) {
        if (searchClient) {
            if (searchClient.length > 0) {
                $scope.searchFilter = searchClient; 
            } 
        } 
    };

    app.clear = function() {
        $scope.searchClient = undefined; 
        $scope.searchFilter = undefined; 
    };
});

