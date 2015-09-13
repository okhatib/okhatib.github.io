app.controller('FeedbackController', ['$scope', 'voutGlobal', function($scope, voutGlobal){
    $scope.serviceRunning = false;
    $scope.feedback = {};

    // DUMMY DATA! REMOVE!
    $scope.feedback = {name: 'Omar', email: 'om@om.om', feedback: 'sdkjnfksjdlsdjflajfslkn'};

    $scope.sendFeedback = function(){

        $scope.serviceRunning = true;
        $scope.alert = { show: false };

        voutGlobal.serviceCall('createFeedback', [], $scope.feedback)
        .then(function(response){
            $scope.alert = {
                show: true,
                type: {
                    success: true,
                    info: false,
                    warning: false,
                    danger: false
                },
                msg: 'Thank you for your feedback! :)'
            };
            console.log("-- response --");
            console.log(response);

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
            console.log("-- failed feedback --");

            $scope.serviceRunning = false;
        });
    };
}]);
