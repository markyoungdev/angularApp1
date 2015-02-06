angular.module('sideMenuApp.services', [])

    .factory('getMatches', function($resource) {
        var url = $resource('http://localhost:3000/api/post');
      return url.query();
    })

    .factory('matchService',['getMatches', function(getMatches) {

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
                console.log(matchId);
                getMatches.then(function(value){
                    console.log(value);
                });
                var deferred = matches[matchId - 1];

                return deferred;
            },
        }
    }]);

    

