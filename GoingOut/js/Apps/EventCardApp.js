app.controller('EventController', ['$scope', '$window', '$location', '$q', '$timeout', '$routeParams', 'voutGlobal', 'MapsInitializer', function($scope, $window, $location, $q, $timeout, $routeParams, voutGlobal, MapsInitializer){

    $scope.serviceRunning = false;
    $scope.voteServiceRunning = false;

    // INSTANTIATING THE TAGS TO BE SHOWN IN THE CHIPS.. DO NOT REMOVE!!!!!
    $scope.eventDetails = {};
    $scope.eventDetails.tags = [];

    // TEST DATA TO SIMULATE RETURNED DATA FROM GETEVENT SERVICE
    var testEvent = [{
        id: 0,
        name: '3eed melad 7amada',
        date: new Date('2015-01-01T13:00:00.000Z'),
        details: 'Event Description will go here Event Description will go here Event Description will go here Event Description will go here Event Description will go here',
        voteDeadline: new Date('2015-09-08T13:00:00.000Z'),
        isPastDeadline: false,
        owner: {
            id: 0,
            name: 'Returning User 1',
            photo: 'img/user1.svg'
        },
        location: {
            name: 'Beit 7amada',
            address: '216 st',
            lat: 29.965130495436707,
            lng: 31.248764991760254,
        },
        tags: ['Outdoors', 'Food', 'Drink'],
        //rsvp: [{id: 1, label: 'Yes', count: 2}, {id: 2, label: 'Maybe', count: 4}, {id: 3, label: 'No', count: 10}],
        vote: [{id: 1, label: 'YES', count: 3, icon: 'done'}, {id: 2, label: 'NO', count: 8, icon: 'clear'}],
        //userStatus: 'Yes'
        userVote: 'YES'
    },
    {
        id: 1,
        name: 'project planning',
        date: new Date('2015-02-05T12:00:00.000Z'),
        details: 'we just need to plan what is next',
        voteDeadline: new Date('2015-09-04T13:00:00.000Z'),
        isPastDeadline: false,
        owner: {
            id: 0,
            name: 'Returning User 2',
            photo: 'img/user2.svg'
        },
        location: {
            name: 'Costa el mall',
            address: 'grand mall, new maadi',
            lat: 29.965399170214475,
            lng: 31.27005100250244
        },
        tags: ['Drink'],
        //rsvp: [{id: 1, label: 'Yes', count: 5}, {id: 2, label: 'Maybe', count: 1}, {id: 3, label: 'No', count: 3}],
        vote: [{id: 1, label: 'YES', count: 5, icon: 'done'}, {id: 2, label: 'NO', count: 2, icon: 'clear'}],
        //userStatus: 'No'
        userVote: 'NO'
    }];

    $scope.setFillColor = function(uVote, lbl){
        var userVoteYes;

        (uVote && uVote.toLowerCase() == 'yes') ? userVoteYes = true : userVoteYes = false;

        if (userVoteYes && uVote == lbl) return 'green';
        else if (!userVoteYes && uVote == lbl) return 'red';
    };

    $scope.SetVote = function(vote){

        $scope.voteServiceRunning = true;
        var param = {eventId: 0, userId: 0, userVote: vote};

        if (vote == 'yes')
        {
            $scope.userVoteYes = "green";
            $scope.userVoteNo = "";
        }
        else if (vote == 'no')
        {
            $scope.userVoteYes = "";
            $scope.userVoteNo = "red";
        }

        voutGlobal.serviceCall('setUserVote', [$routeParams.eventId, $scope.userIdCookie, param.userVote], param)
        .then(function(rsvpConf){
            $scope.voteServiceRunning = false;
        }, function(err){
            console.log('--- Failed to set user vote ---');
            $scope.eventDetails.userVote = param.userVote;
            $scope.voteServiceRunning = false;
        });;
    };

    // BUTTON CLICK FUNCTION TO SET THE PAGE URL TO THE EDIT URL
    $scope.SetEditMode = function(){
        $window.location.href = $window.location.href + '/edit';//$location.path('/events/' + $routeParams.eventId + '/edit');
    };

    // BUTTON CLICK FUNCTION TO SAVE THE UPDATED/NEW EVENT DATA AND RETURN TO THE NORMAL EVENT VIEW
    $scope.SaveEvent = function(){

        $scope.serviceRunning = true;
//        console.log('--- eventData ---');
//        console.log($scope.eventDetails);

        if ($scope.eventPageMode == 'new')
        {
            voutGlobal.serviceCall('createEvent', [$scope.userIdCookie], $scope.eventDetails)
            .then(function(eventId){
                $location.path('/events/' + eventId);
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

                $location.path('/events/0');
            });
        }
        else if ($scope.eventPageMode == 'edit')
        {
            voutGlobal.serviceCall('updateEvent', [$scope.eventDetails], $scope.eventDetails)
            .then(function(eventConf){
                $location.path('/events/' + eventConf.id);
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

                $location.path('/events/0');
            });
        }
    };

    // FUNCITON TO INITIALIZE GMAP USING A SERVICE TO HANDLE PAGE LOADING
    var initGMap = function(mapDivId, isInteractive){
        MapsInitializer.mapsInitialized.then(function(){
            var myLatLng = {};
            if (!$scope.eventDetails || !$scope.eventDetails.location
                || !$scope.eventDetails.location.lat || !$scope.eventDetails.location.lng)
            {
                myLatLng = {lat: 30.0447003, lng: 31.2360282};
            }
            else
            {
                myLatLng = {
                    lat: $scope.eventDetails.location.lat,
                    lng: $scope.eventDetails.location.lng
                };
            }

            var mapOptions = {
                zoom: 15,
                center: myLatLng,
                draggable: isInteractive,
                streetViewControl: false,
                scrollwheel: false,
                zoomControl: isInteractive,
                scaleControl: false,
                mapTypeControl: false
            };
            var gMap = new google.maps.Map(document.getElementById(mapDivId), mapOptions);

            var mapMarker = new google.maps.Marker({
                position: myLatLng,
                map: gMap,
                draggable: isInteractive
            });

            if ($scope.eventPageMode == 'new')
            {
                gMap.addListener('click', function(e) {
                    mapMarker.setPosition(e.latLng);
                    gMap.panTo(e.latLng);

                    if (!$scope.eventData) $scope.eventData = {};
                    if (!$scope.eventData.location) $scope.eventData.location = {};
                    $scope.eventData.location.lat = e.latLng.lat();
                    $scope.eventData.location.lng = e.latLng.lng();
                });

                mapMarker.addListener('dragend', function(e){
                    gMap.panTo(e.latLng);

                    if (!$scope.eventData) $scope.eventData = {};
                    if (!$scope.eventData.location) $scope.eventData.location = {};
                    $scope.eventData.location.lat = e.latLng.lat();
                    $scope.eventData.location.lng = e.latLng.lng();
                });
            }
        });
    };

    if (!$scope.isEditMode || $scope.eventPageMode == 'edit')
    {
        // CALLING THE GETEVENT SERVICE TO GET EVENT DETAILS
        voutGlobal.serviceCall('getEvent', [$routeParams.eventId], null)
        .then(function(eventDetails){
            $scope.eventDetails = eventDetails.data;
            $scope.eventDetails['url'] = window.location.href;
            $scope.eventDetails.isPastDeadline = (new Date() > $scope.eventDetails.voteDeadline);
            if ($scope.eventDetails.isPastDeadline)
            {
                $scope.deadlineAlert = {
                    show: true,
                    type: {
                        success: false,
                        info: false,
                        warning: false,
                        danger: true
                    },
                    msg: 'Voting has closed for this event.'
                };
            }

            if ($scope.eventDetails.owner.id == $scope.userIdCookie) $scope.isEventOwner = true;

            var gmapDivID = ($scope.eventPageMode != 'new' && $scope.eventPageMode != 'edit') ? 'gMap' : 'gMapEdit';
            initGMap(gmapDivID, $scope.isEditMode);
            $('#eventLoadBar').hide();
        }, function(err){
            $scope.eventDetails = testEvent[$routeParams.eventId];
            $scope.eventDetails['url'] = window.location.href;
            $scope.eventDetails.isPastDeadline = (new Date() > $scope.eventDetails.voteDeadline);
            if ($scope.eventDetails.isPastDeadline)
            {
                $scope.deadlineAlert = {
                    show: true,
                    type: {
                        success: false,
                        info: false,
                        warning: false,
                        danger: true
                    },
                    msg: 'Voting has closed for this event.'
                };
            }

            if ($scope.eventDetails.owner.id == $scope.userIdCookie) $scope.isEventOwner = true;

            var gmapDivID = ($scope.eventPageMode != 'new' && $scope.eventPageMode != 'edit') ? 'gMap' : 'gMapEdit';
            initGMap(gmapDivID, $scope.isEditMode);
            $('#eventLoadBar').hide();
        });
    }
    else if ($scope.eventPageMode == 'new')
    {
        // Giving time for the page to reload so that the map can render correctly in case of coming from another page with a map in it
        $timeout(function(){
            $scope.eventDetails.rsvp = [{id: 1, label: 'Yes', count: 0}, {id: 2, label: 'Maybe', count: 0}, {id: 3, label: 'No', count: 0}];
//            $scope.eventDetails.tags = ['Outdoors', 'Food', 'Drink'];

            initGMap('gMapEdit', $scope.isEditMode);
            $('#eventLoadBar').hide();
        }, 100);
    }
}]);

app.directive('eventCard', function(){
    return {
        restrict: 'E',
        scope: {
            event: '='
        },
        templateUrl: './js/directives/eventCard.html'
    };
});
