angular.module("angularUser", ["angularRoutes", "userControllers", 
"mainController", "authServices"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
})
