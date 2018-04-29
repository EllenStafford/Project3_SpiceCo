angular.module("angularRoutes", ["ngRoute"])
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
        controllerAs: "register"
    })

    .when("/login",{
        templateUrl: "../../app/views/pages/users/login.html"
    })

    .when("/logout",{
        templateUrl: "../../app/views/pages/users/logout.html"
    })

    .when("/profile",{
        templateUrl: "../../app/views/pages/users/profile.html"
    })

    .when("/spices",{
        templateUrl: "../../app/views/pages/users/spices.html"
    })

    .when("/order",{
        templateUrl: "../../app/views/pages/users/order.html"
    })

    .when("/contact",{
        templateUrl: "../../app/views/pages/users/contact.html"
    })
    .otherwise({redirectTo: "/"});


    // having issues with <base> had to use !
    // $locationProvider
    
    // .htlm5Mode({
    //     enabled: true,
    //     requirements: false
    // });

});