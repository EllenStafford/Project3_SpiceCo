angular.module("angularUser", ["angularRoutes", "userControllers", 
"mainController", "authServices", "managementCtrl"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
})
