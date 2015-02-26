var sideMenuApp = angular.module('app', 
  ['ionic', 
  'ngCordova',
  'sideMenuApp.services',
  'sideMenuApp.controllers',
  'UserApp','ui.bootstrap',
  'ionic.contrib.ui.tinderCards',
  'ngResource']
  );

sideMenuApp.run(function($ionicPlatform, user, $rootScope) {
  $ionicPlatform.ready(function() {
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

  $rootScope.setAuthenticatedUser = function(user){
    user.getCurrent().then(function(currentUser){  
      console.log(currentUser.user);
    });
  }

})

sideMenuApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "partials/menu.html",
      controller: 'menuController',
      resolve: {
        getUserImage: ['user','getUserImages',function(user, getUserImages){
          var currentUser = user.current;
          var username = currentUser.user_id;
          var id = user.getCurrent().then(function(currentUser){     
            //console.log(currentUser.user_id);      
           return getUserImages.get(currentUser.user_id);
          }); 
           
          //console.log(id);
           
        }]
      }
    })
    <!-- // handle the login -->
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      data: { login: true },
      controller: 'loginModalController',
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
      controller: 'forgotPasswordCtrl'      
    })
     <!-- // handle the Faqs -->
     .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
           templateUrl: 'partials/help.html',
           controller: 'helpController'
          }
      }
    })    
    <!-- // handle the settings -->
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'partials/settings.html',
          controller: 'settingsController'
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
      resolve: {
        loadUser: ['user', 'getUser', function( user, getUser ) {
          var user = user.getCurrent().then(function(currentUser) {  
            return currentUser;
          });
          return user;
        }],
        getCoordsInit: function(getCoords){
            return getCoords.getUserCoord();
        },
        getUserInit: ['getUser', 'user','getCoordsInit','addNewUser', function(getUser, user, getCoordsInit, addNewUser) {
          var currentUser = user.current;
          var test = user.getCurrent().then(function(currentUser){                    
            getUser.getUserData(currentUser.user_id)
            .$promise
            .then(function(response){
              var data = JSON.parse(angular.toJson(response));
              //console.log(data);
              if(!data._id) {
                var username = currentUser.user_id;
                var name = currentUser.first_name;
                var lat = parseFloat(getCoordsInit.coords.latitude).toFixed(4);
                var lng = parseFloat(getCoordsInit.coords.longitude).toFixed(4);
                var geoJSON = {'lat': lat, 'lng': lng};
                //console.log(getCoordsInit);
                //console.log(name);
                var userData = {};
                userData.username = username;
                userData.name =  name;
                userData.img = 'img3';
                userData.loc = geoJSON;
                userData.distance = 10;
                userData.hidden = false;
                addNewUser.addUser(userData);
              } 
              return data;
            });
           
          });    
          if(!test.values){
              return getUser.getUserData(currentUser.user_id);
          }
          
        }],
        getNewMatchesInit: ['$state', 'getNewMatches','getUser','user','getUserInit',function($state, getNewMatches, getUser, user, getUserInit){
         // console.log(getUserInit);
          var currentUser = user.current;
          var username = currentUser.user_id;
          var id = getUserInit.$promise.then(function(currentUser){                   
            //return currentUser._id;
             return getNewMatches.get(currentUser._id);  
          });    
        return id;    
                   
        }]
      },
      views: {
        'menuContent': {
           templateUrl: 'partials/new-matches.html',
           controller: 'cardsController'
          }
      }
    })
     <!-- // handle the matches -->
    .state('app.matches', {
      url: '/matches',
      views: {
        'menuContent': {
          templateUrl: 'partials/matches.html',
          controller: 'matchesController'
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
      views: {
        'menuContent': {
           templateUrl: 'partials/profile.html',
           controller: 'profileController'
          }
      }
    })
      <!-- // handle the profile -->
    .state('app.match', {
      url: '/match/:matchId',
      views: {
        'menuContent': {
           templateUrl: 'partials/match-single.html',
           controller: 'matchSingleController'
          }
      },
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/app/new-matches');
  

});