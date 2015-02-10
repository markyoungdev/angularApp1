angular.module('sideMenuApp.services', [])

    .factory('getMatches', function($resource) {
        var url = $resource('http://localhost:3000/api/post');
      return url.query();
    })

    .factory('getMatch', function($resource) {
        return{  getSingleMatch: function(matchId){
              console.log(matchId);
              var url = $resource('http://localhost:3000/api/match/:id',{id: matchId});
                 return url.get();
            }
        }
    })

    .factory('addMatch', function($resource) {
      
        var url = $resource('http://localhost:3000/api/add');
        return url.save();
      
    })

    .factory('matchService',['getMatches','getMatch', function(getMatches, getMatch) {

        var matches = getMatches;
        

        //console.log(match);
       
        return {
            findAll: function() {
                var deferred = getMatches;
                //deferred.resolve(Resource);
                //deferred.resolve(Promise);
                return deferred;
            },

            findById: function(matchId) {
                console.log(matchId);
                //var deferred =   var url = $resource('http://localhost:3000/api/match/'+match);            
                
                return getMatch.getSingleMatch(matchId);
            },
        }
    }]);

    

