var app = angular.module("angularRoutes", ["ngRoute"])
//appRoutes ... 

.config(function($routeProvider){

    $routeProvider
    
    .when("/",{
        templateUrl: "../../app/views/pages/home.html"
    })

    .when("/about",{
        templateUrl: "../../app/views/pages/about.html"
    })

    .when("/register",{
        templateUrl: "../../app/views/pages/users/register.html",
        controller: "regCtrl",
        controllerAs: "register",
        authenticated: true
    })

    .when("/login",{
        templateUrl: "../../app/views/pages/users/login.html",
        authenticate: false
    })

    .when("/logout",{
        templateUrl: "../../app/views/pages/users/logout.html",
        authenticated: true
    })

    .when("/profile",{
        templateUrl: "../../app/views/pages/users/profile.html",
        authenticated: true
    })

    .when("/spices",{
        templateUrl: "../../app/views/pages/users/spices.html",
        authenticate: false
    })
    .when("/inquiry",{
        templateUrl: "../../app/views/pages/users/inquiry.html",
        controller: "reqInq",
        controllerAs: "inquiry",
        authenticated: true
    })
    .when("/order",{
        templateUrl: "../../app/views/pages/users/order.html",
        authenticated: true
    })
    .when("/messages",{
        templateUrl: "../../app/views/pages/admin/messages.html",
        authenticated: true
    })

    .when("/contact",{
        templateUrl: "../../app/views/pages/users/contact.html",
        controller: "conCtrl",
        controllerAs: "contact",
        authenticated: false
    })
    .when("/management",{
        templateUrl: "../../app/views/pages/admin/management.html",
        controller: "managementCtrl",
        controllerAs: "management",
        authenticated: false,
        permission: ["admin"]
    })
    .otherwise({redirectTo: "/"});

});
//restricting routes
app.run(["$rootScope", "Auth", "$location", function($rootScope, Auth, $location){
    $rootScope.$on("$routeChangeStart", function(event, next, current){

        if(next.$$route.authenticated === true){
            if (!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path("/");
            } else if(next.$$route.permission){
                //this is where I left off ......  .....  ....
            }

        }else if (next.$$route.authenticated === false){
            if (Auth.isLoggedIn()){
                event.preventDefault();
                $location.path("/profile");
            }

        }
        
    });
}]);
