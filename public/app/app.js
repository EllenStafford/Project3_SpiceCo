angular.module("angularUser", [

    "angularRoutes", "userControllers", "mainController",
    "authServices", "orderServices", "inquiryControllers",
    "contactController", "managementController",
    "userServices", "chefordersCtrl", "spicesCtrl", "requestsController"]
)

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("AuthInterceptors");
    });
