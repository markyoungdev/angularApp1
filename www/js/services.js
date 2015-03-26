angular.module('sideMenuApp.services', [])
    //error handling
    .factory('$exceptionHandler', function ($injector) {
        return function (exception, cause) {
            var $rootScope = $injector.get('$rootScope');
            $rootScope.errors = $rootScope.errors || [];
            $rootScope.errors.push(exception.message);
            console.log($rootScope.errors);
        }
    })
     // load user
    .factory('loadUser', function($resource, user, $q) {  
        return {
            get: function() {  
                 var deferred = $q.defer();
                 user.getCurrent().then(function (currentUser) {  
                    //console.log(currentUser.user_id);          
                    deferred.resolve( currentUser.user_id );
                });        
                return deferred.promise;
            }
        }
          
    })
    // load DB user
    .factory('loadDbUser', function($resource, loadUser, getUser, $q) { 
    console.log(loadUser.get()) 
        return {
            get: function() {  
                //console.log(loadUser.get());
                var deferred = $q.defer();
                //console.log(loadUser);
                var test = loadUser.get().then(function(data){
                    //console.log(data);
                    var userdata = getUser.getUserData(data).then(function(user){
                        console.log(user);
                        return user;
                    });
                    //console.log(userdata);
                    //return  $q.when(getUser.getUserData(data));
                  return userdata;
                });
                deferred.resolve(test);
                //console.log(deferred.promise);
                return  deferred.promise;

               
            }

        }
          
    })
    // getUserInit
    .factory('getUserDataInit', function($resource, loadDbUser, $q) {  
       
        return { 
            get: function() {  
                var deferred = $q.defer(); 
                loadDbUser.get().then(function(data){
                    deferred.resolve(data);
                   
                })   
                return deferred.promise;
            }          
        }
          
    })
    // get user coordinates
    .factory('getUserCoords', function($resource, $cordovaGeolocation) {
        return{
            get:  function() {
                var options = {
                  timeout: 10000, 
                  enableHighAccuracy: false
                };
              return  $cordovaGeolocation.getCurrentPosition(options);                
            }
        }
    })
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
    // get user coordinates
    .factory('getNewMatchesInit', function($resource, getUserDataInit, getNewMatches, addNewUser, loadUser, getUserCoords, $q) {
        console.log(getUserDataInit.get());
        return {
            get: function() {
                var deferred = $q.defer();
               
                var matches = getUserDataInit.get().then(function(data){
                        console.log(data);
                        if(!data._id){
                            //var userID = 0; 
                            var username = loadUser.user_id;
                            var name = loadUser.first_name;
                            var lat = parseFloat(getUserCoords.coords.latitude).toFixed(4);
                            var lng = parseFloat(getUserCoords.coords.longitude).toFixed(4);
                            var geoJSON = {'lat': lat, 'lng': lng};              
                            var userData = {};
                            userData.username = username;
                            userData.name =  name;
                            userData.img = 'img3';
                            userData.loc = geoJSON;
                            userData.distance = 10;
                            userData.hidden = false; 
                            var newUser = addNewUser.addUser(userData);   
                            var userData = newUser.$promise.then(function(data){                     
                              return JSON.parse(angular.toJson(data));
                            }); 
                            var userID = userData._id;

                        } else {              
                            var userID = data._id;
                            ////console.log(userID);
                        }
                        console.log(userID);
                        console.log(getNewMatches.get(userID));
                        return getNewMatches.get(userID); 

                    })
               return matches;
                  //console.log(userID);          
               
            }  
        }
    })
     // get user Init
    .factory('getUserInit', function($resource, loadDbUser, loadUser, getUserCoords, addNewUser) {
        return{
        add: function() {
            console.log(loadDbUser);
            var test = loadDbUser
                .$promise
                .then(function(response){                  
                  var data = JSON.parse(angular.toJson(response));                   
                  if(!data._id) {       
                    //console.log(loadUser);        
                    var username = loadUser.user_id;
                    var name = loadUser.first_name;
                    var lat = parseFloat(getUserCoords.coords.latitude).toFixed(4);
                    var lng = parseFloat(getUserCoords.coords.longitude).toFixed(4);
                    var geoJSON = {'lat': lat, 'lng': lng};              
                    var userData = {};
                    userData.username = username;
                    userData.name =  name;
                    userData.img = 'img3';
                    userData.loc = geoJSON;
                    userData.distance = 10;
                    userData.hidden = false; 
                    var newUser = addNewUser.addUser(userData);   
                    var userData = newUser.$promise.then(function(data){                     
                      return JSON.parse(angular.toJson(data));
                    });                    
                    return userData;                    
                  } else { 
                    return data;
                  }
                });                
            return test;    
            }
        }
    })
    // add user to the local mongoose db
    .factory('addNewUser', function($resource, $rootScope, user) {
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
    .factory('getUser', function($resource, user, $q) {
        return {           
            getUserData: function(){
                var userID = user.current.user_id;   
                //console.log(userID);            
                var url = $resource('http://localhost:3000/api/user/:id',{id: userID});
                 var query = url.get().$promise.then(function(data){
                    return data;
                 }); 
                 return query;    
                   
                     
            }
        }
    })
     // get user on login
    .factory('updateUser', function($resource, getCoords, user) {
        return {
            update: function(userData){
                var coordsObj = getCoords.getUserCoord();
                
                var coords = coordsObj.then(function(data){                    
                    var lat = parseFloat(data.coords.latitude).toFixed(4);
                    var lng = parseFloat(data.coords.longitude).toFixed(4);
                    //console.log(lat);
                    var userID = user.current.user_id;
                    // var id = userData.id;
                    var coords = userData.loc;
                    //var lat = coords.lat;
                    var lng = coords.lng                
                    var url = $resource('http://localhost:3000/api/user/update/:id/:lat/:lng',{id: userID, lat: lat, lng: lng});
                    //console.log(url.save());
                    return url.save(); 
                })
                console.log(coords);
                return coords;
                //console.log(url.save());
                             
            }
        }
    })
      // get user on login
    .factory('updateUserSettings', function($resource) {
        return {
            update: function(userData){               
                //console.log(userData);
                var id = userData.userID;
                var visibility = userData.profileHidden;
                var searchRange = userData.rangeValue;
                var bio = userData.bio;
                console.log(bio);
                var url = $resource('http://localhost:3000/api/user/settings/:id/:visibility/:searchRange/:bio',{id: id, visibility: visibility, searchRange: searchRange, bio: bio});
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
                return url.data;               
             
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
    .factory('getNewMatches', function($resource, $http, getCoords, user, getUser) {
        return{  get: function(userId){                    
                var coordsObj = getCoords.getUserCoord();                
                var matches = coordsObj.then(function(data){                    
                    var lat = parseFloat(data.coords.latitude).toFixed(4);
                    var lng = parseFloat(data.coords.longitude).toFixed(4);
                    var radius = 50;                     
                     var url = $http.get('http://localhost:3000/api/newmatches/'+userId+'/'+lat+'/'+lng+'/'+radius);
                    console.log(url);
                    return url;  
                });
                console.log(matches);
                return matches;
                          
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
    // decline a new match for the associated user into the db
    .factory('declineMatch', function($resource) {  
        return{  deny: function(userData){ 
            var requestor = userData.requestor;  
            var requestee = userData.requestee;    
            var url = $resource('http://localhost:3000/api/match/deny/:requestor/:requestee', {requestor: requestor, requestee: requestee});
            return url.save();
            }
        }  
    })
    // Add user into restricted array
    .factory('addToRestricted', function($resource) {  
        return{  add: function(userData){ 
            var requestor = userData.requestor;  
            var requestee = userData.requestee;    
            var url = $resource('http://localhost:3000/api/match/restrict/:requestor/:requestee', {requestor: requestor, requestee: requestee});
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
                //console.log(matchId);                
                return getMatch.getSingleMatch(matchId);
            },
        }
    }])
    // take pictures with camera
   .factory('Camera', function($q, $cordovaCamera, $cordovaFile) {

    return {

        fileTo: function(serverURL) {

            var deferred = $q.defer();

            if (ionic.Platform.isWebView()) {

                var options =   {
                    quality: 100,
                    targetWidth: 551,
                    targetHeight: 260,
                    allowEdit: true,
                    saveToPhotoAlbum: true, 
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG

                }

                $cordovaCamera.getPicture(options).then(

                    function(fileURL) {

                        var uploadOptions = new FileUploadOptions();
                        uploadOptions.fileKey = "file";
                        uploadOptions.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                        uploadOptions.mimeType = "image/jpeg";
                        uploadOptions.chunkedMode = false;

                        $cordovaFile.uploadFile(serverURL, fileURL, uploadOptions).then(

                            function(result) {
                                deferred.resolve(result);
                            }, function(err) {
                                deferred.reject(err);
                            })

                        ;

                    }, function(err){
                        deferred.reject(err);
                    })

                ;

            }
            else {
                deferred.reject('Uploading not supported in browser');
            }

            return deferred.promise;

            }

        }

    })

    // upload pictures from camera 
    .factory('Upload', function($q, $cordovaCamera, $cordovaFile) {

    return {

        fileTo: function(serverURL) {

            var deferred = $q.defer();

            if (ionic.Platform.isWebView()) {

                var options =   {
                    quality: 100,
                    allowEdit: true,
                    saveToPhotoAlbum: false, 
                    targetWidth: 551,
                    targetHeight: 260,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    encodingType: Camera.EncodingType.JPEG

                }

                $cordovaCamera.getPicture(options).then(

                    function(fileURL) {

                        var uploadOptions = new FileUploadOptions();
                        uploadOptions.fileKey = "file";
                        uploadOptions.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                        uploadOptions.mimeType = "image/jpeg";
                        uploadOptions.chunkedMode = false;

                        $cordovaFile.uploadFile(serverURL, fileURL, uploadOptions).then(

                            function(result) {
                                deferred.resolve(result);
                            }, function(err) {
                                deferred.reject(err);
                            })

                        ;

                    }, function(err){
                        deferred.reject(err);
                    })

                ;

            }
            else {
                deferred.reject('Uploading not supported in browser');
            }

            return deferred.promise;

            }

        }

    })
