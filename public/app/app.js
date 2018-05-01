angular.module("angularUser", ["angularRoutes", "userControllers", 
"mainController", "authServices", "managementCtrl", "contactController"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
})
