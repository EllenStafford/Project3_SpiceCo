angular.module("angularUser", ["angularRoutes", "userControllers", 
"mainController", "authServices", "managementCtrl", "spicesCtrl"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
})
