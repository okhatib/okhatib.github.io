app.controller('CommentController', ['$scope', '$q', 'voutGlobal', '$routeParams', function($scope, $q, voutGlobal, $routeParams){

    $scope.serviceRunning = false;

    if ($scope.eventPageMode == 'new' || $scope.eventPageMode == 'edit') return;

    var testComments = [
        {
            user: {name: 'Returning User 2', photo: 'img/user2.svg'},
            comment: 'ana mesh hayenfa3 3aya el ma3ad da....momken ne5aly fe wa2t tany?',
            originalPoster: false,
            date: new Date('2015-08-10T23:00:00.000Z')
        },
        {
            user: {name: 'Returning User 1', photo: 'img/user1.svg'},
            comment: 'howa enta kol mara keda! mesh 3ayzinak teegy asln :@',
            originalPoster: true,
            date: new Date('2015-05-12T10:00:00.000Z')
        },
        {
            user: {name: 'Returning User 3', photo: 'img/user2.svg'},
            comment: 'ana bardo baktare7 ne3\'ayar el ma3ad',
            originalPoster: false,
            date: new Date('2015-07-05T01:00:00.000Z')
        }
    ];

    $scope.comments = [];

    voutGlobal.serviceCall('getComments', [$routeParams.eventId], null)
    .then(function(commentDetails){
        //console.log(commentDetails.data);
        $scope.comments = commentDetails.data;
        //console.log('Comments: ');
        //console.log($scope.comments);
        $('#commentLoadBar').remove();
    }, function(error){
        $scope.comments = testComments;
        $('#commentLoadBar').remove();
    });

    $scope.newCommDetails = {};
    $scope.submitComment = function(){

        $scope.serviceRunning = true;
        //$scope.newComment = newComment.newComm($routeParams.eventId, $scope.newCommDetails);

        var param = {
            eventId: $routeParams.eventId,
            comment: {
                user: {
                    //TODO: get user id from cookie
                    id: $scope.userIdCookie
                },
                text: $scope.newCommDetails.comment
            }
        };

        //newComment.newComm(param)
        voutGlobal.serviceCall('createComment', [$routeParams.eventId], param)
        .then(function(commConf){
            $scope.newCommDetails['user'] = {};
            $scope.newCommDetails['user']['name'] = commConf.data.user.name;
            $scope.newCommDetails['user']['photo'] = commConf.data.user.photo;

            if ($scope.comments.length > 0)
            {
                $scope.comments.splice(0, 0, $scope.newCommDetails);
            }
            else
            {
                $scope.comments = [];
                $scope.comments.push($scope.newCommDetails);
            }

            $scope.newCommDetails = {};

            $scope.serviceRunning = false;
        }, function(err){
            $scope.newCommDetails['user'] = {};
            $scope.newCommDetails['user']['name'] = 'Omar';
            $scope.newCommDetails['user']['photo'] = 'img/user1.svg';
            $scope.newCommDetails['date'] = new Date();

            if ($scope.comments.length > 0)
            {
                $scope.comments.splice(0, 0, $scope.newCommDetails);
            }
            else
            {
                $scope.comments = [];
                $scope.comments.push($scope.newCommDetails);
            }

            $scope.newCommDetails = {};

            $scope.serviceRunning = false;
        });
    };
}]);

app.directive('singleComment', function(){
    return {
        restrict: 'E',
        scope: {
            comm: '='
        },
        templateUrl: './js/directives/singleCommentSection.html'
    };
});
