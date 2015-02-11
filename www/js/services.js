angular.module('sideMenuApp.services', [])

    .factory('getCoords', function($resource, $cordovaGeolocation) {
        return {
            getUserCoord: function(){
                console.log($cordovaGeolocation);
                $cordovaGeolocation.getCurrentPosition().then(function(value){
                console.log(value);
                $scope.test = value.coords;
                return value.coords;
                })
            }
        }
    })

    .factory('getMatches', function($resource) {
        var url = $resource('http://localhost:3000/api/matches');
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

    

