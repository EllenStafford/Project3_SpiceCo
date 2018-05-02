angular.module("angularUser", ["angularRoutes", "userControllers", "mainController", "authServices", "inquiryControllers","contactController","managementController","userServices"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
});
