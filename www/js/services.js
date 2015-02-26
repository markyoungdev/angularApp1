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
    .factory('addNewUser', function($resource, $rootScope) {
        return {
            addUser: function(userData){
                //console.log(userData);
                var name = userData.name;
                var username = userData.username;
                var coords = userData.loc;
                var distance = userData.distance;
                var hidden = userData.hidden;
                var lat = coords.lat;
                var lng = coords.lng
                var img = userData.img;
                var url = $resource('http://localhost:3000/api/createtest/:name/:img/:username/:lat/:lng/:distance/:hidden',{name: name, img: img, username: username, lat: lat, lng: lng, distance: distance, hidden: hidden});
                return url.save();
                $rootScope.$broadcast('addNewUser:userAdded');
                $scope.$apply();
            }
        }
    })

    // get user on login
    .factory('getUser', function($resource) {
        return {
            getUserData: function(userId){
                //console.log(userId);
                var url = $resource('http://localhost:3000/api/user/:id',{id: userId});
                return url.get();                
            }
        }
    })
     // get user on login
    .factory('updateUser', function($resource) {
        return {
            update: function(userData){
                var id = userData.id;
                var coords = userData.loc;
                var lat = coords.lat;
                var lng = coords.lng                
                var url = $resource('http://localhost:3000/api/user/update/:id/:lat/:lng',{id: id, lat: lat, lng: lng});
                //console.log(url.save());
                return url.save();                
            }
        }
    })
      // get user on login
    .factory('updateUserSettings', function($resource) {
        return {
            update: function(userData){               
                console.log(userData);
                var id = userData.userID;
                var visibility = userData.profileHidden;
                var searchRange = userData.rangeValue;
                var url = $resource('http://localhost:3000/api/user/settings/:id/:visibility/:searchRange',{id: id, visibility: visibility, searchRange: searchRange});
                //console.log(url.save());
                return url.save();                
            }
        }
    })

    // get settings associated with user from the db
    .factory('getUserSettings', function($resource) {
        return{
            get: function(userId){
                var url = $resource('http://localhost:3000/api/user/settings/:id',{id: userId});
                return url.get();
            }
        }       
    })

    .factory('getUserImages', function($resource, $http, $q) {
        return {
            get: function(userId) {
                deferred = $q.defer();
               // console.log(userId);
                var url = $http.get('http://localhost:3000/api/user/image/'+userId,{                
                    method: "GET"
                })
               // console.log(url)
                return url.data;
               
                /*var url = $resource('http://localhost:3000/api/user/image/:id',{id: userId});
                console.log(url.query());*/
                //return url;
            }
        }
    })
    // get matches associated with user from the db
    .factory('getMatches', function($resource) {
        return { 
            getMatched: function(userId){
                var url = $resource('http://localhost:3000/api/matches/:id',{id: userId});
                return url.query();
            }
        }
    })
    // get single match for associated user from the db
    .factory('getMatch', function($resource) {
        return{  getSingleMatch: function(matchId){
             // console.log(matchId);
              var url = $resource('http://localhost:3000/api/match/:id',{id: matchId});
                 return url.get();
            }
        }
    })
    // get new matches for associated user from the db
    .factory('getNewMatches', function($resource,$http) {
        return{  get: function(matchId){     

              //var url = $resource('http://localhost:3000/api/newmatches/:id',{id: matchId},{method: 'GET',isArray: true});
              /* var url = $http.get('http://localhost:3000/api/newmatches/',{                
                    method: "GET",
                    params: {id: matchId}
                });*/
                var url = $http.get('http://localhost:3000/api/newmatches/'+matchId)
               console.log(url);
               return url;              
            }
        }
    })
    // add a new match for the associated user into the db
    .factory('addMatch', function($resource) {  
        return{  add: function(userData){ 
            var requestor = userData.requestor;  
            var requestee = userData.requestee;    
            var url = $resource('http://localhost:3000/api/match/add/:requestor/:requestee', {requestor: requestor, requestee: requestee});
            return url.save();
            }
        }  
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
