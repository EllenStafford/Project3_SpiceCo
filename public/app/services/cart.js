angular.module("orderServices", [])

    // Returns a cart service that allows for the CRUD operations against a shopper's cart.
    .factory("Cart", function cartFactory() {

        const cartService = {

            // The spices that a shopper has added to their cart.
            spices: {},

            // The total of the cart
            total: 0.00,
            prettyTotal: "0.00"

        };

        /**
         * Provides the capability to add an item to a shopper's cart.
         *
         * @param item The item to persist
         */
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

        /**
         * Returns the number of items in the cart.
         *
         * @returns {number} The number of items in the cart
         */
        cartService.count = function() {
            return cartService.spices.length
        };

        /**
         * Provided an index retrieves the item at the array.
         *
         * @param index The index of item to retrieve
         * @returns {*} The index of the item or null if one does not exist.
         */
        cartService.find = function (index) {
            return cartService.spices[index]
        };

        /**
         * Returns the entire embedded array.
         *
         * @returns {Array} The service's internal array.
         */
        cartService.findAll = function () {
            return cartService.spices
        };

        /**
         * Provided an index removes the item in the array.
         *
         * @param spice The item to remove
         */
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