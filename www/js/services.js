angular.module('sideMenuApp.services', [])
    // get user coordinates
    .factory('getCoords', function($resource, $cordovaGeolocation) {
        return {
            getUserCoord: function(){
                var options = {
                  timeout: 10000, 
                  enableHighAccuracy: false
                };
               // console.log($cordovaGeolocation);
                //console.log($cordovaGeolocation.getCurrentPosition(options));
              return  $cordovaGeolocation.getCurrentPosition(options);                
            }
        }
    })
    // add user to the local mongoose db
    .factory('addNewUser', function($resource) {
        return {
            addUser: function(userData){
                console.log(userData);
                var url = $resource('http://localhost:3000/api/createtest/:name/:img',{name: name, img: img});
            }
        }
    })

    // get user on login
    .factory('getUser', function($resource) {
        return {
            getUserData: function(userId){
                console.log(userId);
                var url = $resource('http://localhost:3000/api/user/:id',{id: userId});
                 return url.get();
            }
        }
    })
    // get matches associated with user from the db
    .factory('getMatches', function($resource) {
        var url = $resource('http://localhost:3000/api/matches');
      return url.query();
    })
    // get single match for associated user from the db
    .factory('getMatch', function($resource) {
        return{  getSingleMatch: function(matchId){
              console.log(matchId);
              var url = $resource('http://localhost:3000/api/match/:id',{id: matchId});
                 return url.get();
            }
        }
    })
    // add a new match for the associated user into the db
    .factory('addMatch', function($resource) {      
        var url = $resource('http://localhost:3000/api/add');
        return url.save();      
    })
    // helper function form finding matches
    .factory('matchService',['getMatches','getMatch', function(getMatches, getMatch) {
        var matches = getMatches;             
        return {
            findAll: function() {
                var deferred = getMatches;                
                return deferred;
            },
            findById: function(matchId) {
                console.log(matchId);                
                return getMatch.getSingleMatch(matchId);
            },
        }
    }]);
