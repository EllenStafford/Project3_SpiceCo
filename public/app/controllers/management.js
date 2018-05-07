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

          // Function: Perform a basic search function
    app.search = function(searchKeyword, number) {
        // Check if a search keyword was provided
        if (searchKeyword) {
            // Check if the search keyword actually exists
            if (searchKeyword.length > 0) {
                app.limit = 0; // Reset the limit number while processing
                $scope.searchFilter = searchKeyword; // Set the search filter to the word provided by the user
                app.limit = number; // Set the number displayed to the number entered by the user
            } else {
                $scope.searchFilter = undefined; // Remove any keywords from filter
                app.limit = 0; // Reset search limit
            }
        } else {
            $scope.searchFilter = undefined; // Reset search limit
            app.limit = 0; // Set search limit to zero
        }
    };

    // Function: Clear all fields
    app.clear = function() {
        $scope.number = 'Clear'; // Set the filter box to 'Clear'
        app.limit = 0; // Clear all results
        $scope.searchKeyword = undefined; // Clear the search word
        $scope.searchFilter = undefined; // Clear the search filter
        app.showMoreError = false; // Clear any errors
    };
});

