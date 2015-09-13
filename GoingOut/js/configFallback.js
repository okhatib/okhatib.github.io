//===========================
//INITIALIZING FALLBACK.JS
//===========================
fallback.load({
    //libraries
    // Include your stylesheets, this can be an array of stylesheets or a string!
    /*page_css: 'index.css',
    global_css: ['public.css', 'members.css'],*/
    page_css: ['./css/style.css'],

    //Checking for Bootstrap.css
    '.col-md-6': [
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css',
        './css/bootstrap.min.css'
    ],

    //checking for materialize.css
    '.input-field': [
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css',
        './css/materialize.min.css'
    ],


    //checking for angular-material.css
    /*'': [
        'https://ajax.googleapis.com/ajax/libs/angular_material/0.10.0/angular-material.min.css',
        './css/angular-material.min.css'
    ],*/

    //Checking for jQuery.js
    'jQuery': [
        'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
        'https://code.jquery.com/jquery-1.11.3.min.js',
        /*'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js',*/
        './js/base/jquery-1.11.3.min.js'
    ],

    //Checking for Bootstrap.js
    '$.fn.modal': [
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js',
        './js/base/bootstrap.min.js'
    ],

    //checking for materialize.js
    'jQuery.easing.jswing': [
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/js/materialize.min.js',
        './js/base/materialize.min.js'
    ],

    //Checking for angular.js
    'angular': [
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js',
        './js/base/angular.min.js'
    ],

    //Checking for angular-route.js
    'angular.module("ngRoute")': [
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-route.min.js',
        './js/base/angular-route.min.js'
    ],

    //checking for angular-material.js
    /*'angular.module("ngMaterial")': [
        'https://ajax.googleapis.com/ajax/libs/angular_material/0.10.0/angular-material.min.js',
        './js/base/angular-material.min.js'
    ],*/

    /*'angular.module("ngTouch")': [
        '//ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-touch.min.js'
    ],*/

    /*'angular.module("ui.bootstrap")': [
        '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.6.0/ui-bootstrap-tpls.min.js'
    ],*/

    //underscore.js library
    /*'_': [
        '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js',
        '//cdn.jsdelivr.net/underscorejs/1.5.2/underscore-min.js'
    ],*/
    
    //refering to a local file
    'app': [
        './js/app.js'
    ],
    
    'services': [
        './js/services/services.js'
    ],
    
    'indexController': [
        './js/controllers/IndexController.js'
    ],

    'eventController': [
        './js/controllers/EventController.js'
    ],

    'eventDirective': [
        './js/directives/eventCard.js'
    ],

    'commentDirective': [
        './js/directives/singleComment.js'
    ]
}, {
    //dependancies
    shim: {
        'jQuery.easing.jswing': ['jQuery'],
        'bootstrap': ['jQuery'],
        'angular': ['jQuery'],
        'angular.module("ngRoute")': ['angular'],
        'app': ['angular'],
        'services': ['app'],
        'indexController': ['app'],
        'eventController': ['app'],
        'eventDirective': ['app'],
        'commentDirective': ['app']
        /*'angular.module("ngTouch")': ['angular'],
        'angular.module("ui.bootstrap")': ['angular']*/
    }
});

//Execute something if needed when fallback is ready.
/*fallback.ready(function() {
	// Execute my code here!
});*/
