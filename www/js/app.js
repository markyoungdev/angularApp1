var sideMenuApp = angular.module('app', 
  ['ionic', 
  'ngCordova',
  'sideMenuApp.services',
  'sideMenuApp.controllers',
  'UserApp','ui.bootstrap',
  'ionic.contrib.ui.tinderCards',
  'LocalStorageModule',
  'parse-angular',
  'parse-angular.enhance',
  //'com.unarin.cordova.proximity.quickstart.monitoring',
  //'com.unarin.cordova.proximity.quickstart.eventlog',
  //'com.unarin.cordova.proximity.quickstart.ranging',
  'ngResource']
  );

sideMenuApp.run(['$ionicPlatform', 'user', '$rootScope', '$http', '$location', 'localStorageService', function($ionicPlatform, user, $rootScope, $http, $location, localStorageService) {
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
 
    user.init({ appId: '54c951838e11a' });  
    $rootScope.$on('user.login', function() {      
     
      $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + user.token());
    });

    $rootScope.$on('Parse.User.logOut', function() {
        $http.defaults.headers.common.Authorization = null;
        localStorageService.clearAll();

    });

    $rootScope.$on('user.error', function(sender, error) {
      console.log(error.message);
    });
      var currentUser = Parse.User.current();
        if (!currentUser) {
         $location.path('/');
        } 

    
  });

}])

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
    .state('/', {
      url: '/login',
      templateUrl: 'partials/login.html',
      data: { login: true },
      login: true,
      public: true,
      controller: 'LoginController',
      resolve:{

      }     
    })
     <!-- // handle the login -->
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      data: { public: true },
      public: true,
      controller: 'SignupController'
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
       data: { public: true },
      public: true,
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
      data: { public: true },
      public: true,
      views: {
        'menuContent': {
          templateUrl: 'partials/settings.html',
          controller: 'SettingsController'
        },
      },
      resolve: {    
        
      }
    })
      <!-- // handle the Faqs -->
     .state('app.newmatches', {
      url: '/new-matches',
      data: { public: true },
      public: true,
      resolve: {        
        /*loadUserInit: function(LoggedInUser){
          console.log( LoggedInUser )
          LoggedInUser.set();
        },    
        loadDbUser: ['loadUserInit','LoggedInUser',function(loadUserInit, LoggedInUser){  
        console.log(LoggedInUser.getUserData())        
          return LoggedInUser.getUserData();
        }],       
        getCoordsInit: function(getUserCoords){
          return getUserCoords.get();
        },            
        getNewMatchesInit: function(getNewMatchesInit){
          console.log(getNewMatchesInit.get());
          return getNewMatchesInit.get();
        }*/
      },
      views: {
        'menuContent': {
           templateUrl: 'partials/new-matches.html',
           controller: 'NewMatchesController'
          }
      }
    })
     <!-- // handle the matches -->
    .state('app.matches', {
      url: '/matches',
      data: { public: true },
      public: true,
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
          var userObj = loadDbUser;
          console.log(userObj);         
            return getMatches.getMatched(userObj._id); 
          
        }]
      }
    })
     <!-- // handle the profile -->
    .state('app.profile', {
      url: '/profile',
      data: { public: true },
      public: true,
      views: {
        'menuContent': {
           templateUrl: 'partials/profile.html',
           controller: 'ProfileController'
          }
      },
      resolve: {        
        
      }
      
    })
      <!-- // handle the profile -->
    .state('app.match', {
      url: '/match/:matchId',
      data: { public: true },
      public: true,
      views: {
        'menuContent': {
           templateUrl: 'partials/match-single.html',
           controller: 'MatchSingleController'
          }
      },
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  //$urlRouterProvider.otherwise('/app.matches');
   $urlRouterProvider.otherwise( function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("/");
        });
  

});