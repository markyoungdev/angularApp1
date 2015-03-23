var sideMenuApp = angular.module('app', 
  ['ionic', 
  'ngCordova',
  'sideMenuApp.services',
  'sideMenuApp.controllers',
  'UserApp','ui.bootstrap',
  'ionic.contrib.ui.tinderCards',
  //'com.unarin.cordova.proximity.quickstart.monitoring',
  //'com.unarin.cordova.proximity.quickstart.eventlog',
  //'com.unarin.cordova.proximity.quickstart.ranging',
  'ngResource']
  );

sideMenuApp.run(function($ionicPlatform, user, $rootScope) {
 // console.debug('Running com.unarin.cordova.proximity.quickstart');
  $ionicPlatform.ready(function() {
    //angular.bootstrap(document, ['com.unarin.cordova.proximity.quickstart']);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //PushNotificationsService.register();
  });
  user.init({ appId: '54c951838e11a' });  

})

sideMenuApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
 // window.console.debug('Configuring com.unarin.cordova.proximity.quickstart');
  $stateProvider
    
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "partials/menu.html",
      controller: 'MenuController',
      getUserImage:{
        getUserImages: function(){
          var test = {};
          return test;
        }
      }
      /*resolve: {
        getUserImage: ['user','getUserImages',function(user, getUserImages){
          var currentUser = user.current;
          var username = currentUser.user_id;
          var id = user.getCurrent().then(function(currentUser){     
            //console.log(currentUser.user_id);      
           return getUserImages.get(currentUser.user_id);
          }); 
           
          //console.log(id);
           
        }]
      }*/
    })
    <!-- // walkthrough -->
    .state('walkthrough', {
      url: '/walkthrough',
      templateUrl: 'partials/walkthrough.html',
      data: { public: true },
      controller: 'WalkthroughController'      
    })
    <!-- // handle the login -->
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      data: { login: true },
      controller: 'LoginModalController',
      /*resolve: {
        getCoordsInit: function(getCoords){
          //return getCoords.getUserCoord();
        },
        getUserInit: function() {
          
        }
      }*/
    })
     <!-- // handle the login -->
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      data: { public: true }
      //controller: 'AppCtrl'
    })
      <!-- // handle the forgot password -->
     .state('forgot-password', {
      url: "/forgot-password",
      templateUrl: "partials/password-forgot.html",
      controller: 'ForgotPasswordCtrl'      
    })
     <!-- // handle the Faqs -->
     .state('app.help', {
      url: '/help',
      data: { public: false },
      views: {
        'menuContent': {
           templateUrl: 'partials/help.html',
           controller: 'HelpController'
          }
      }
    })    
    <!-- // handle the settings -->
    .state('app.settings', {
      url: '/settings',
      data: { public: false },
      views: {
        'menuContent': {
          templateUrl: 'partials/settings.html',
          controller: 'SettingsController'
        },
      },
      resolve: {        
        loadUser: ['user', 'getUser', function( user, getUser ) {
          var user = user.getCurrent().then(function(currentUser) {  
            return currentUser;
          });
          return user;
        }],
        getSettings: ['getUserSettings','loadUser',function(getUserSettings, loadUser) {
          var id = loadUser.user_id;          
          return getUserSettings.get(id);
        }],
      }
    })
      <!-- // handle the Faqs -->
     .state('app.newmatches', {
      url: '/new-matches',
      data: { public: false },
      resolve: {
        loadUser: ['user', 'getUser', function ( user, getUser ) {
          var user = user.getCurrent().then(function (currentUser) {            
            return currentUser;
          });         
          return user;
        }],
        loadDbUser: ['loadUser', 'getUser', function ( loadUser, getUser) {          
          return getUser.getUserData(loadUser.user_id);
        }],
        getCoordsInit: function(getCoords){
            return getCoords.getUserCoord();
        },
        getUserInit: ['loadDbUser','getCoordsInit','addNewUser','loadUser', function (loadDbUser, getCoordsInit, addNewUser, loadUser) {                   
         // var test = user.getCurrent().then(function (currentUser){ 
        var test = loadDbUser
                .$promise
                .then(function(response){                  
                  var data = JSON.parse(angular.toJson(response));                   
                  if(!data._id) {       
                    //console.log(loadUser);        
                    var username = loadUser.user_id;
                    var name = loadUser.first_name;
                    var lat = parseFloat(getCoordsInit.coords.latitude).toFixed(4);
                    var lng = parseFloat(getCoordsInit.coords.longitude).toFixed(4);
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
        }],
        getNewMatchesInit: ['$state', 'getNewMatches','getUser','getUserInit',function($state, getNewMatches, getUser, getUserInit){ 
          if(!getUserInit._id){
            var userID = function(getUserInit) {
              getUserInit.then(function(data){
                return data._id;
              })
            }
          } else {              
            var userID = getUserInit._id;
          }
          //console.log(userID);          
        return getNewMatches.get(userID);    
                   
        }]
      },
      views: {
        'menuContent': {
           templateUrl: 'partials/new-matches.html',
           controller: 'CardsController'
          }
      }
    })
     <!-- // handle the matches -->
    .state('app.matches', {
      url: '/matches',
      data: { public: false },
      views: {
        'menuContent': {
          templateUrl: 'partials/matches.html',
          controller: 'MatchesController'
        }
      },
      resolve: {
        loadUser: ['user', 'getUser', function( user, getUser ) {
          var user = user.getCurrent().then(function(currentUser) {  
            //return currentUser;
            return getUser.getUserData(currentUser.user_id);
          });
          // return getUser.getUserData(user.user_id);
          return user;
        }],
        getMatchesInit: ['getMatches','loadUser', function(getMatches, loadUser){
          console.log(loadUser);
          var matches = loadUser.$promise.then(function(data){
            console.log(data);
            //return data._id;
            return getMatches.getMatched(data._id);
          });
          console.log(matches);
         return matches;
          
          
        }]
      }
    })
     <!-- // handle the profile -->
    .state('app.profile', {
      url: '/profile',
      data: { public: false },
      views: {
        'menuContent': {
           templateUrl: 'partials/profile.html',
           controller: 'ProfileController'
          }
      }
    })
      <!-- // handle the profile -->
    .state('app.match', {
      url: '/match/:matchId',
      data: { public: false },
      views: {
        'menuContent': {
           templateUrl: 'partials/match-single.html',
           controller: 'MatchSingleController'
          }
      },
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/app/new-matches');
  

});