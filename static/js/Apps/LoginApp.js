app.controller('LoginController', ['$scope', '$location', '$window', '$auth', 'voutGlobal', function($scope, $location, $window, $auth, voutGlobal){
    $scope.serviceRunning = false;
    $scope.login = {};

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
    };

    // DUMMY DATA! REMOVE!
    $scope.login = {email: 'om@om.om', password: 'bdkjsf'};

    $scope.loginUser = function(){

        $scope.serviceRunning = true;
        $scope.alert = { show: false };

        voutGlobal.serviceCall('userLogin', [], $scope.login)
        .then(function(confUser){
	        //TODO: store user cookie with registered data
            setCookie('uid', confUser.id, 365);
            StoreIntoLocalStorage('userData', confUser)

            var prevUrl = getCookie('prevUrl');
            if (prevUrl == '' || prevUrl == undefined || prevUrl == null) $window.location.href = "#/";
            else $window.location.href = prevUrl;
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
            console.log('--- failed login ---');

            //TODO: should remove the following code when the service is active
            setCookie('uid', 0, 365);
            StoreIntoLocalStorage('userData', {id: 0, name: 'Omar El Khatib', email: 'omar.i.elkhatib@gmail.com', img: ''});

            $scope.serviceRunning = false;

            //TODO: SHOULD REMOVE REDIRECT IN CASE OF FAILURE
            var prevUrl = getCookie('prevUrl');
            if (prevUrl == '' || prevUrl == undefined || prevUrl == null) $window.location.href = "#/";
            else $window.location.href = prevUrl;
        });
    };
}]);
