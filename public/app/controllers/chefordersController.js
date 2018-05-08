angular.module("chefordersCtrl", ["orderServices"])

    .controller("chefordersCtrl", function (Cart, $scope) {

        // Reference the application context
        const chefordersCtrl = this;

        chefordersCtrl.cart = Cart.findAll();

        chefordersCtrl.total = Cart.prettyTotal;

        $scope.decrementQuantity = function quantityIncrementer(spice) {
            Cart.remove(spice);
            chefordersCtrl.total = Cart.prettyTotal;
        };

        $scope.incrementQuantity = function quantityIncrementer(spice) {
            Cart.add(spice);
            chefordersCtrl.total = Cart.prettyTotal;
        };

        $scope.submitOrder = function orderSubmit() {

            toastr.success("You've been spice, Thank you for your order");
    
        };

    });

