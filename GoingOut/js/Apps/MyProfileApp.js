app.controller('ProfileController', ['$scope', '$location', '$mdToast', 'voutGlobal', 'MapsInitializer', function($scope, $location, $mdToast, voutGlobal, MapsInitializer){
    $scope.user = GetFromLocalStorage('userData', true);

    var optionsMenuIndex;
    $scope.openMenu = function($mdOpenMenu, ev, index) {
        optionsMenuIndex = index;
        $mdOpenMenu(ev);
    };

    $scope.optionsMenu = [{label: 'Edit', icon: 'edit'}, {label: 'Delete', icon: 'delete'}];
    $scope.menuItemClick = function(index, itmLbl){
        if (itmLbl.toLowerCase() == 'edit')
        {
            $location.path('/events/' + optionsMenuIndex + '/edit')
        }
        else if (itmLbl.toLowerCase() == 'delete')
        {
            $($('.userEvents')[optionsMenuIndex]).hide();

            var toast = $mdToast.simple()
                .content('Event Deleted!')
                .action('UNDO')
                .highlightAction(false)
                .position('bottom left');

            $mdToast.show(toast)
            .then(function(response) {
                console.log('--- toast response ---');
                console.log(response);
                if ( response == 'ok' )
                {
                    $($('.userEvents')[optionsMenuIndex]).show();
                }
                else
                {
                    voutGlobal.serviceCall('deleteEvent', [$scope.userEvents[optionsMenuIndex].id], null)
                        .then(function(confDelete){
                        console.log('--- event deleted ---');
                        $($('.userEvents')[optionsMenuIndex]).remove();
                    }, function(err){
                        console.log('--- event deleted ---');
                        $($('.userEvents')[optionsMenuIndex]).remove();
                    });
                }
            });
        }
    };

    $scope.goToEvent = function(index){
        console.log('--- card index ---');
        console.log(index);
        $location.path('/events/' + index);
    };

    var testData = [{
        id: 0,
        name: '3eed melad 7amada',
        date: new Date('2015-01-01T13:00:00.000Z'),
        details: 'Event Description will go here Event Description will go here Event Description will go here Event Description will go here Event Description will go here',
        voteDeadline: new Date('2015-09-06T13:00:00.000Z'),
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

    var initGMap = function(mapsClassId){
        MapsInitializer.mapsInitialized.then(function(){
            var gMaps = document.getElementsByClassName(mapsClassId);
            for (var i=0 ; i< gMaps.length ; i++)
            {
                var myLatLng = {
                    lat: $scope.userEvents[i].location.lat,
                    lng: $scope.userEvents[i].location.lng
                };

                var mapOptions = {
                    zoom: 15,
                    center: myLatLng,
                    draggable: false,
                    streetViewControl: false,
                    scrollwheel: false,
                    zoomControl: false,
                    scaleControl: false,
                    mapTypeControl: false
                };

                var gMap = new google.maps.Map(gMaps[i], mapOptions);

                var mapMarker = new google.maps.Marker({
                    position: myLatLng,
                    map: gMap,
                    draggable: false
                });
            }
        });
    };

    voutGlobal.serviceCall('getUserEvents', [$scope.userIdCookie], null)
        .then(function(userData){
        $scope.userEvents = userData;
        $('#profileLoadBar').hide();
    },
              function(err){
        $scope.userEvents = testData;
        $('#profileLoadBar').hide();
    });

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        initGMap('gMaps');
    });
}]);
