angular.module("mainController", ["authServices"])


.controller("mainCtrl", function(Auth, $location, $timeout, $rootScope, User){

    var app= this;

// anytime a new route is invoked it is going to check who is logged in
    $rootScope.$on("$routeChangeStart", function (){
        if (Auth.isLoggedIn()){
            console.log("User is logged in");
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                console.log(data.data.username);
                app.business = data.data.business;
                app.username = data.data.username;
                app.phone = data.data.phone;
                app.address = data.data.address;
                app.email = data.data.email;
                app.password = data.data.password;
                app.usercity = data.data.usercity;
                app.userstate = data.data.userstate;
                app.userzip = data.data.userzip
                User.getPermission().then(function(data){
                    if(data.data.permission === "admin"){
                        app.authorized = true;
                        app.loadme = true;
                    }else{
                        app.loadme =true;
                    }
                });
                
            });
        }else{
            console.log("User is not logged in");
            //hidden btns
            app.isLoggedIn = false;
            app.username = '';
        }
    
    });

    this.doLogin = function(loginData){
        app.errorMsg = false;
    Auth.login(app.loginData).then(function(data){
        if (data.data.success){
            app.successMsg = data.data.message;
            $timeout(function(){
                $location.path("/profile");
                app.loginData = {};
                app.successMsg = false;
            }, 1500);

        } else{
            app.errorMsg = data.data.message;
        }
    })

    };

    this.logout = function(){
        Auth.logout();
        $location.path("/logout");
    }
});