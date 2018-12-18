angular.module("orderServices", [])

    .factory("Cart", function cartFactory() {

        const cartService = {

            spices: {},

            total: 0.00,
            prettyTotal: "0.00"

        };

        cartService.add = function (item) {

            console.log("Item was added to cart: " + JSON.stringify(item));

            if (cartService.spices[item.productName] == null) {

                item.quantity = 1;
                item.currentAmount = item.basePrice;

            } else {

                item.quantity = cartService.spices[item.productName].quantity + 1;
                item.currentAmount = (item.currentAmount += item.basePrice);

            }

            item.prettyCurrentAmount = item.currentAmount.toFixed(2);

            cartService.total += item.basePrice;
            cartService.prettyTotal = cartService.total.toFixed(2);

            cartService.spices[item.productName] = item;

        };

        cartService.count = function() {
            return cartService.spices.length
        };

        cartService.find = function (index) {
            return cartService.spices[index]
        };

        cartService.findAll = function () {
            return cartService.spices
        };

        cartService.remove = function (spice) {

            if (spice.quantity < 1)
                return;

            cartService.spices[spice.productName].quantity--;
            cartService.spices[spice.productName].currentAmount -= spice.basePrice;
            cartService.spices[spice.productName].prettyCurrentAmount = spice.currentAmount.toFixed(2);

            cartService.total -= spice.basePrice;
            cartService.prettyTotal = cartService.total.toFixed(2);

        };

        return cartService

    });