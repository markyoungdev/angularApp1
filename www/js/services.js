angular.module('sideMenuApp.services', [])

    .factory('getMatches', function($resource) {
        var url = $resource('http://localhost:3000/api/post');
      return url.query();
    })

    .factory('matchService',['getMatches', function(getMatches) {

        /*var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/avatar.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/avatar2.jpg', id: 2, distance: "14mi", messages: 2}
        ];*/
        var matches = getMatches;
        console.log(matches);
       
        return {
            findAll: function() {
                var deferred = getMatches;
                //deferred.resolve(Resource);
                //deferred.resolve(Promise);
                return deferred;
            },

            findById: function(matchId) {
                var deferred = getMatches.defer();
                var match = matches[matchId - 1];
                console.log(match);
                deferred.resolve(match);
                return deferred.promise;
            },
        }
    }]);

    

