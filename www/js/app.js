var sideMenuApp = angular.module('app', 
  ['ionic', 
  'ngCordova',
  'sideMenuApp.services',
  'sideMenuApp.controllers',
  'UserApp','ui.bootstrap',
  'ionic.contrib.ui.tinderCards',
  'LocalStorageModule',
  //'com.unarin.cordova.proximity.quickstart.monitoring',
  //'com.unarin.cordova.proximity.quickstart.eventlog',
  //'com.unarin.cordova.proximity.quickstart.ranging',
  'ngResource']
  );

sideMenuApp.run(function($ionicPlatform, user, $rootScope,$http, LoggedInUser) {
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
  $rootScope.$on('user.login', function() {
    LoggedInUser.set();
    $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + user.token());
  });

  $rootScope.$on('user.logout', function() {
      $http.defaults.headers.common.Authorization = null;
      localStorageService.clearAll();
  });

})

sideMenuApp.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
 // window.console.debug('Configuring com.unarin.cordova.proximity.quickstart');
 // Set localStorage type
 localStorageServiceProvider
 .setPrefix('crowdDate')
 .setStorageType('sessionStorage')
 .setNotify(true, true);


  $stateProvider
    
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "partials/menu.html",
      controller: 'MenuController',
     /* getUserImage:{
        getUserImages: function(){
          var test = {};
          return test;
        }
      }*/
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
      public: true,
      controller: 'WalkthroughController',
      resolve:{}      
    })
    <!-- // handle the login -->
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      data: { login: true },
      public: true,
      controller: 'LoginModalController',
      resolve:{
      }
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
      data: { public: true },
      public: true
      //controller: 'AppCtrl'
    })
      <!-- // handle the forgot password -->
     .state('forgot-password', {
      url: "/forgot-password",
      templateUrl: "partials/password-forgot.html",
      controller: 'ForgotPasswordCtrl',
      data: { public: true },
      public: true      
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
      public: false,
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
      public: false,
      resolve: {
        loadUserInit: function(LoggedInUser){
          //console.log(LoggedInUser);
          return LoggedInUser.set();
        },
        loadDbUser: function(LoggedInUser){  
        //console.log(LoggedInUser.getUserData())        
          return LoggedInUser.getUserData();
        },       
        getCoordsInit: function(getUserCoords){
          return getUserCoords.get();
        },            
        getNewMatchesInit: function(getNewMatchesInit){
          console.log(getNewMatchesInit.get());
          return getNewMatchesInit.get();
        }
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
      public: false,
      views: {
        'menuContent': {
          templateUrl: 'partials/matches.html',
          controller: 'MatchesController'
        }
      },
      resolve: {
       loadDbUser: function(LoggedInUser){  
        //console.log(LoggedInUser.getUserData())        
          return LoggedInUser.getUserData();
        },    
        getMatchesInit: ['loadDbUser', 'getMatches' ,function(loadDbUser, getMatches){
          console.log(loadDbUser);         
            return getMatches.getMatched(data._id); 
          
        }]
      }
    })
     <!-- // handle the profile -->
    .state('app.profile', {
      url: '/profile',
      data: { public: false },
      public: false,
      resolve: {
        loadUserInit: function(LoggedInUser){
          //console.log(LoggedInUser);
          return LoggedInUser.set();
        },
        loadDbUser: function(LoggedInUser){  
        //console.log(LoggedInUser.getUserData())        
          return LoggedInUser.getUserData();
        }   
      },
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
      public: false,
      views: {
        'menuContent': {
           templateUrl: 'partials/match-single.html',
           controller: 'MatchSingleController'
          }
      },
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/login');
  

});