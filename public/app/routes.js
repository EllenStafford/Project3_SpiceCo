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
        controller: "regControllers",
        controllerAs: "register"
    })
    .otherwise({redirectTo: "/"});


    // having issues with <base> had to use !
    // $locationProvider
    
    // .htlm5Mode({
    //     enabled: true,
    //     requirements: false
    // });

});