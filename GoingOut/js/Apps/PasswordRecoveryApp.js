app.controller('PasswordRecoveryController', ['$scope', 'voutGlobal', function($scope, voutGlobal){
    $scope.serviceRunning = false;
    $scope.recover = {};

    // DUMMY DATA! REMOVE!
    $scope.recover = {email: 'om@om.om'};

    $scope.recoverPw = function(){

        $scope.serviceRunning = true;

        voutGlobal.serviceCall('recoverPassword', [$scope.recover], null)
        .then(function(confRecovery){
            $scope.alert = {
                show: true,
                type: {
                    success: true,
                    info: false,
                    warning: false,
                    danger: false
                },
                msg: 'Password reset. Check your email and follow the instructions.'
            };
            console.log('--- success recovery ---');

            $scope.serviceRunning = false;
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
            console.log('--- failure recovery ---');

            $scope.serviceRunning = false;
        });
    };
}]);
