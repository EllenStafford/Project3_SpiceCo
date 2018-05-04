angular.module("spicesCtrl", ["authServices"])

.controller("spicesCtrl", function(Auth, $scope, $http, $location, $timeout){
    var app= this;
    $scope.fetchSpices = query=> {
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const range = (query || 'A-Z').split('-')
        const left = range[0].toUpperCase()
        const right = alphabet[range[1] === 'Z' ? alphabet.indexOf('Z') : alphabet.indexOf(range[1].toUpperCase()) + 1]
        $http.get(`/api/spices?paginate=${query}`)
        .then(data=> {
            app.spiceData = data.data.map(spice=> { 
                const item = {
                    productName: spice.productName, 
                    productSize: spice.productSize, 
                    weightType: spice.weightType
                } 
                
                if(Auth.isLoggedIn())
                    item.basePrice = spice.basePrice

                return item
            })
        })
    }

   
    
    // this.regUser = function(regData){
    //     app.errorMsg = false;

    //     $http.get("/api/spices", this.regData)
    //     .then(function(data){
    //         console.log(data);
    //         if (data.data.success){
    //             app.successMsg = data.data.message;
    //             $timeout(function(){
    //                 $location.path("/");
    //             }, 1500);

    //         } else{
    //             app.errorMsg = data.data.message;
    //         }
    //     });

    // };
});
