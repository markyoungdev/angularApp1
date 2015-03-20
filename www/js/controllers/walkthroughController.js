angular.module('sideMenuApp.controllers').controller('WalkthroughController', function ($scope, $state, $rootScope, $cordovaNetwork) {

  

  $scope.init = function () {
    console.log('Ran: in loginModalController'); 
  }

  $scope.goToLogIn = function() {
        //$ionicSideMenuDelegate.toggleLeft();
        $state.go('login');           
  };


 document.addEventListener("deviceready", function () {

  var type = $cordovaNetwork.getNetwork()

  var isOnline = $cordovaNetwork.isOnline()

  var isOffline = $cordovaNetwork.isOffline()


  // listen for Online event
  $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
    var onlineState = networkState;
    console.log('is online');
  })

  // listen for Offline event
  $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
    var offlineState = networkState;
    console.dir('is offline');
  })

}, false);
 
  $scope.init();   

});