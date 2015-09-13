app.factory('comments', ['$http', function($http){
    //comments service call to get all comments for this event
    return $http.get('')
        .success(function(data){
            return data;
        })
        .error(function(err){
            return err;
        });
}]);

app.factory('events', ['$http', function($http){
    //events service call to get all events for this user
    return $http.get('http://localhost:8080/Events/rest/events/1')
        .success(function(data){
            return data;
        })
        .error(function(err){
            return err;
        });
}]);
