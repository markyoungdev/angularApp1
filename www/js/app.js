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
  });
  user.init({ appId: '54c951838e11a' }); 
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
      controller: 'loginModalController'
    })
     <!-- // handle the login -->
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      data: { public: true }
      //controller: 'AppCtrl'
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
        }
      }
    })
      <!-- // handle the Faqs -->
     .state('app.newmatches', {
      url: '/new-matches',
      resolve: {
        getCoordsInit: function(getCoords){
            return getCoords.getUserCoord();
        },
        getNewMatchesInit: ['$state', 'getNewMatches','getUser','user',function($state, getNewMatches, getUser, user){
          var currentUser = user.current;
          var username = currentUser.user_id;
          var id = user.getCurrent().then(function(currentUser){           
            return currentUser.user_id;
          });          
          return getNewMatches.get(id);            
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