angular.module("spicesCtrl", ["authServices", "orderServices"])

.controller("spicesCtrl", function (Auth, Cart, $scope, $http) {
    const spicesCtrl = this;
    var app = this;

    // search

app.searched = function(searchSpice) {
    if (searchSpice) {
        if (searchSpice.length > 0) {
            $scope.searchFilter = searchSpice; 
        } 
    } 
};

app.clear = function() {
    $scope.searchSpice = undefined; 
    $scope.searchFilter = undefined; 
};




    $scope.fetchSpices = query => {
        $http.get(`/api/spices?paginate=${query}`).then(paginatedSpices => {
            spicesCtrl.spiceData = paginatedSpices.data.map(spice => {
            const item = {
                productName: spice.productName,
                productSize: spice.productSize,
                weightType: spice.weightType
            };
            if (Auth.isLoggedIn()) {
                if (isNaN(item.basePrice))
                    item.basePrice = Number.parseFloat(spice.basePrice.replace("$", ""));
                else
                    item.basePrice = spice.basePrice;
                item.prettyBasePrice = item.basePrice.toFixed(2);
            }
                        return item;
            });
        });
    };

    $scope.addToCart = item => {

        toastr.success(`Added item '${item.productName}' to your cart`);
        Cart.add(item);

    };

});