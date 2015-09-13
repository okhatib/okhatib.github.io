app.directive('alertTag', function(){
    return {
        restrict: 'E',
        scope: {
            alert: '='
        },
        templateUrl: './js/directives/alertSection.html'
    };
});
