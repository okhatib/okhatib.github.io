app.factory('voutGlobal', ['$http', function($http){
    var _serivceUrls = {
        createUser: {url: 'http://localhost:8080/Events/rest/users/new', method: 'POST'},
        getUser: {url: 'http://localhost:8080/Events/rest/users/{0}', method: 'GET'}, // 'userId'
        updateUser: {url: 'http://localhost:8080/Events/rest/users/{0}', method: 'PUT'}, // 'userId'
        deleteUser: {url: 'http://localhost:8080/Events/rest/users/{0}', method: 'DELETE'}, // 'userId'
        getUserEvents: {url: 'http://localhost:8080/Events/rest/users/{0}/events', method: 'GET'}, // 'userId'

        createEvent: {url: 'http://localhost:8080/Events/rest/events/new/{0}', method: 'POST'}, //['userId']
        getEvent: {url: 'http://localhost:8080/Events/rest/events/{0}', method: 'GET'}, //['eventId']
        updateEvent: {url: 'http://localhost:8080/Events/rest/events/{0}', method: 'PUT'}, //['eventId']
        deleteEvent: {url: 'http://localhost:8080/Events/rest/events/{0}', method: 'DELETE'}, //['eventId']

        setUserRsvp: {url: 'http://localhost:8080/Events/rest/events/{0}?userId={1}&rsvp={2}', method: 'POST'}, //['eventId', 'userId', 'userRsvp']

        setUserVote: {url: 'http://localhost:8080/Events/rest/events/{0}?userId={1}&vote={2}', method: 'POST'},

        createComment: {url: 'http://localhost:8080/Events/rest/comments/new/{0}', method: 'POST'}, //['eventId']
        getComments: {url: 'http://localhost:8080/Events/rest/comments/{0}', method: 'GET'}, //['eventId']

        createFeedback: {url: 'http://localhost:8080/Events/rest/feedback/new', method: 'POST'},

        userLogin: {url: 'http://localhost:8080/Events/rest/users/login', method: 'POST'},

        recoverPassword: {url: 'http://localhost:8080/Events/rest/users/recover?email={0}', method: 'POST'} //['param.email]
    };

    var _restrictedUrls = ['events', 'profile'];

    return {
        serviceCall: function(serviceName, serviceUrlParams, serviceData){
            var req = {
                method: _serivceUrls[serviceName].method,
                url: StringFormat(_serivceUrls[serviceName].url, serviceUrlParams),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (serviceData) req.data = serviceData;

            return $http(req);
        },
        getServiceUrl: function(which){
            return _serivceUrls[which].url;
        },
        getPageMode: function(href){
            var sub = href.substr(href.indexOf('#') + 2);
            return sub.substr(sub.lastIndexOf('/') + 1);
        },
        isPageEditMode: function(pageMode){
            return (pageMode != 'new' && pageMode != 'edit') ? false : true;
        },
        getUserIdFromCookie: function(){
            return getCookie('uid');
        },
        isRestrictedUrl: function(splitUrl){
            var checkUrl = splitUrl[0];
            if (_restrictedUrls.indexOf(checkUrl) != -1)
            {
                if (splitUrl[0] == 'events')
                {
                    var lastPart = splitUrl[splitUrl.length - 1];
                    if(lastPart == 'new' || lastPart == 'edit')
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                return true;
            }
            return false;
        }
    };
}]);

//Google Maps initializer service
app.factory('MapsInitializer', function($window, $q){

    //Google's url for async maps initialization accepting callback function
    var asyncUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=';
    var mapsDefer = $q.defer();

    //Callback function - resolving promise after maps successfully loaded
    $window.googleMapsInitialized = mapsDefer.resolve; // removed ()

    //Async loader
    var asyncLoad = function(asyncUrl, callbackName) {
        var script = document.createElement('script');
        //script.type = 'text/javascript';
        script.src = asyncUrl + callbackName;
        document.body.appendChild(script);
    };
    //Start loading google maps
    asyncLoad(asyncUrl, 'googleMapsInitialized');

    //Usage: Initializer.mapsInitialized.then(callback)
    return {
        mapsInitialized : mapsDefer.promise
    };
});
