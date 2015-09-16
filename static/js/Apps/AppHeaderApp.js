app.controller('HeaderController', function($scope, $rootScope, $location, $mdSidenav, $mdBottomSheet, $mdComponentRegistry){

    // WATCHING FOR CHANGES IN THE URL AND CHANGES THE PAGE TITLE ACCORDINGLY
    $scope.$watch(function(){
        return $location.path();
    }, function(value){
//        console.log(value);
        $scope.pageTitle = GetPageTitle(value);
    });

    // MTHOD TO TOGGLE SIDENAV
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    // This sets up a trigger event when the sidenav closes
    $scope.sideNavIsOpen = function() {
        return false;
    };

    $mdComponentRegistry.when('left').then(function(sideNav) {
        $scope.sideNavIsOpen = angular.bind(sideNav, sideNav.isOpen);
    });

    // WATCHING THE SIDENAV FUNCTION TO ENABLE/DISABLE SCROLLING IN THE BODY
    $scope.$watch('sideNavIsOpen()', function() {

        (!$scope.sideNavIsOpen()) ? $('body').removeClass('not-scrollable') : $('body').addClass('not-scrollable');

    });

    // FUNCITON TO OPEN BOTTOMSHEET
    $scope.OpenBottomSheet = function(){
        $mdBottomSheet.show({
            templateUrl: './js/directives/bottomSheet.html',
            controller: 'GridBottomSheetCtrl'
        });
    };
});

app.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet, $mdToast) {

    // FUNCTION TO HIDE THE BOTTOMSHEET WHEN AN ITEM IS CLICKED
    $scope.listItemClick = function(src){

        switch(src) {
            case 'copy':
                var success = CopyToClipboard(window.location.href);
                $mdToast.show(
                    $mdToast.simple()
                    .content(success)
                    .position('bottom left')
                    .hideDelay(3000)
                );
                break;
        }

        $mdBottomSheet.hide();
    };
});

app.directive('appHeader', function(){
    return {
        restrict: 'E',
        templateUrl: './js/directives/appHeader.html'
    };
});
