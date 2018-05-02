angular.module("angularUser", ["angularRoutes", "userControllers", "mainController", "authServices", "inquiryControllers","contactController","managementController","userServices","spicesCtrl"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
});
