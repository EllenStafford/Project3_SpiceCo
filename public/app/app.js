angular.module("angularUser", ["angularRoutes", "userControllers", "mainController", "authServices", "inquiryControllers","contactController","managementController","userServices","spicesCtrl","requestsController"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
});
