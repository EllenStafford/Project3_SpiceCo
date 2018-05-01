angular.module("angularUser", ["angularRoutes", "userControllers", 
"mainController", "authServices", "managementCtrl", "contactController", "inquiryControllers"])

.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
})
