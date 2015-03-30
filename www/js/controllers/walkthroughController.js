angular.module('sideMenuApp.controllers').controller('WalkthroughController', function ($scope, $state) {

  

  $scope.init = function () {
    console.log('Ran: in loginModalController'); 
  }

  $scope.goToLogIn = function() {
        //$ionicSideMenuDelegate.toggleLeft();
        $state.go('login');           
  };


 
 
  $scope.init();   

});