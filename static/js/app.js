//===========================
//INITIALIZING ANGULAR MODULE
//===========================
var app = angular.module('VoutApp', ['ngRoute', 'ngMaterial', 'socialLinks', 'ngMdIcons', 'angularMoment', 'angular-loading-bar', 'satellizer']);

/*
======================================================================================================================
========================================== LOADING BAR CONFIGURATION =================================================
======================================================================================================================
*/
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

    // time before the loading bar appears, meaning if the requests take more than this time the bar will appear.
    cfpLoadingBarProvider.latencyThreshold = 0;

    // include to hide the loading spinner
    cfpLoadingBarProvider.includeSpinner = false;

    // include to hide the laoding bar
    //cfpLoadingBarProvider.includeBar = false;
}]);

/*
======================================================================================================================
======================================== MATERIAL THEME CONFIGURATION ================================================
======================================================================================================================
*/

app.config(function($mdThemingProvider) {
    // Available palettes: red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
    // light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('red');

//    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
//        'contrastDefaultColor': 'light',
//        'contrastDarkColors': ['50'],
//        '50': 'ffffff'
//    });
//    $mdThemingProvider.definePalette('customBlue', customBlueMap);
//    $mdThemingProvider.theme('default')
//        .primaryPalette('customBlue', {
//        'default': '500',
//        'hue-1': '50'
//    })
//        .accentPalette('pink');
//
//    $mdThemingProvider.theme('input', 'default')
//        .primaryPalette('grey');
});

/*
======================================================================================================================
========================================= ROUTING CONFIGURATION=== ===================================================
======================================================================================================================
*/

app.config(function($routeProvider, $mdThemingProvider){

    // THE TEMPLATES TO LOAD DEPENDING ON THE URL
    $routeProvider
    .when('/', {
        templateUrl: './views/landingView.html'
    })
    .when('/register', {
        templateUrl: './views/registerView.html'
    })
    .when('/login', {
        templateUrl: './views/loginView.html'
    })
    .when('/recover', {
        templateUrl: './views/recoveryView.html'
    })
    .when('/events/:eventId', {
        templateUrl: './views/eventView.html'
    })
    .when('/events/:eventId/edit', {
        templateUrl: './views/eventView.html'
    })
    .when('/events/new', {
        templateUrl: './views/eventView.html'
    })
    .when('/feedback', {
        templateUrl: './views/feedbackView.html'
    })
    .when('/profile', {
        templateUrl: './views/profile.html'
    })
    .otherwise({ redirectTo: '/' });
});

/*
======================================================================================================================
========================================= SATELLIZER CONFIGURATION ===================================================
======================================================================================================================
*/

app.config(function($authProvider) {

    $authProvider.facebook({
        clientId: 'Facebook App ID'
    });

    $authProvider.google({
        clientId: '309764955454-2al99f8juce30aijqrm21ni4rdhgmokc.apps.googleusercontent.com',
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: 'http://127.0.0.1:23827', // window.location.origin || window.location.protocol + '//' + window.location.host,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 452, height: 633 }
    });

    // No additional setup required for Twitter
    $authProvider.twitter({
        url: '/auth/twitter'
    });

//    $authProvider.github({
//        clientId: 'GitHub Client ID'
//    });

//    $authProvider.linkedin({
//        clientId: 'LinkedIn Client ID'
//    });

//    $authProvider.yahoo({
//        clientId: 'Yahoo Client ID / Consumer Key'
//    });
//
//    $authProvider.live({
//        clientId: 'Microsoft Client ID'
//    });

//    $authProvider.oauth2({
//        name: 'foursquare',
//        url: '/auth/foursquare',
//        clientId: 'Foursquare Client ID',
//        redirectUri: window.location.origin,
//        authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
//    });

});

/*
======================================================================================================================
============================================== MAIN APP CONTROLLER ===================================================
======================================================================================================================
*/

app.controller('MainController', ['$scope', '$location', 'voutGlobal', function($scope, $location, voutGlobal){

    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {

        // SETTING OF GLOBAL VARIABLES
        $scope.isUserLoggedIn = isUserLoggedIn();
        $scope.eventPageMode = voutGlobal.getPageMode(absNewUrl);
        $scope.isEditMode = voutGlobal.isPageEditMode($scope.eventPageMode);
        $scope.isEventOwner = false;
        $scope.userIdCookie = voutGlobal.getUserIdFromCookie();

        // GETTING THE NEXT/PREV URLS TO STORE IN COOKIE
        var newHashIndex = absNewUrl.indexOf('#');
        var newRoute = absNewUrl.substr(newHashIndex + 2);

        if (!$scope.isUserLoggedIn)
        {
            var splitUrl = newRoute.split('/');
            if (voutGlobal.isRestrictedUrl(splitUrl))
            {
                setCookie("prevUrl", "#/" + newRoute, 365);
                $location.path('/login');
            }
        }
        else
        {
            var oldHashIndex = absOldUrl.indexOf('#');
            var oldRoute = absOldUrl.substr(oldHashIndex + 2);

            setCookie("prevUrl", "#/" + oldRoute, 365);
        }
    });
}]);

/*
======================================================================================================================
=================================== DIRECTIVE TO RUN AT THE END OF ngRepeat===========================================
======================================================================================================================
*/

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});
