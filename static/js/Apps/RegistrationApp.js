app.controller('RegisterController', ['$scope', '$location', 'voutGlobal', function($scope, $location, voutGlobal){
    $scope.serviceRunning = false;
    $scope.regData= {};

    // DUMMY DATA! REMOVE!
    $scope.regData = {name: 'omar', email: 'om@om.om', password: 'omar', confPassword: 'omar', regAcceptTerms: true};

    $scope.registerUser = function(){
    	
        $scope.serviceRunning = true;
        
//        var user_data = {}
//        user_data["name"] = $scope.regData.name
//        user_data["email"] = $scope.regData.email
//        user_data["password"] = $scope.regData.password
        
        voutGlobal.serviceCall('createUser', [], $scope.regData)
        .then(function(confUser){
            //TODO: store user cookie with registered data
            setCookie('uid', confUser.id, 365);
            StoreIntoLocalStorage('userData', confUser)

            $location.path('/#');
        }, function(err){
            $scope.alert = {
                show: true,
                type: {
                    success: false,
                    info: false,
                    warning: false,
                    danger: true
                },
                msg: 'Something went wrong. Try again.'
            };
            console.log('--- failure registration ---');

            //TODO: should remove the following code when the service is active
            var userData = {id: 0, name: 'Omar El Khatib', email: 'omar.i.elkhatib@gmail.com', img: ''};
            setCookie('uid', userData.id, 365);
            StoreIntoLocalStorage('userData', userData);

            $scope.serviceRunning = false;

            //TODO: SHOULD REMOVE REDIRECT IN CASE OF FAILURE
            $location.path('/#');
        });
    };
}]);
