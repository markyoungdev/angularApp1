var sideMenuApp = angular.module('app', ['ionic', 'sideMenuApp.controllers','UserApp']);

sideMenuApp.run(function($ionicPlatform, user) {
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
      controller: 'menuController'
    })
    <!-- // handle the login -->
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      data: { login: true }
      //controller: 'AppCtrl'
    })
     <!-- // handle the login -->
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      data: { public: true }
      //controller: 'AppCtrl'
    })
     <!-- // handle the Faqs -->
     .state('app.faqs', {
      url: '/faqs',
      views: {
        'menuContent': {
           templateUrl: 'partials/faqs.html',
           controller: 'faqsController'
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
    .state('app.profile.details', {
      url: '/:profileId',
      views: {
        'menuContent': {
           templateUrl: 'partials/profile-single.html',
           controller: 'profileController'
          }
      }
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/');
  

});