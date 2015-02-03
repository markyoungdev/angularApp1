var sideMenuApp = angular.module('app', ['ionic', 'ngCordova','sideMenuApp.services','sideMenuApp.controllers','UserApp','ui.bootstrap']);

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
 console.log("navigator.geolocation works well");
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
      controller: 'menuController'
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
     <!-- // test geo controller page -->
     .state('app.geo', {
      url: '/geo',
      views: {
        'menuContent': {
           templateUrl: 'partials/geo.html',
           controller: 'geoController'
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
  
  $urlRouterProvider.otherwise('/app/profile');
  

});