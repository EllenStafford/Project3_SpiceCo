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


    app.search = function(searchKeyword, number) {

        if (searchKeyword) {

            if (searchKeyword.length > 0) {
                app.limit = 0; 
                $scope.searchFilter = searchKeyword; 
                app.limit = number; 
            } else {
                $scope.searchFilter = undefined; 
                app.limit = 0; 
            }
        } else {
            $scope.searchFilter = undefined; 
            app.limit = 0; 
        }
    };

    app.clear = function() {
        $scope.number = 'Clear'; 
        app.limit = 0; 
        $scope.searchKeyword = undefined; 
        $scope.searchFilter = undefined; 
        app.showMoreError = false; 
    };
});

