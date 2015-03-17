angular.module('sideMenuApp.controllers').controller('WalkthroughController', function ($scope, $location,$ionicSideMenuDelegate, $state, $ionicModal, $rootScope, user, getUser, addNewUser, getCoords) {

  

  $scope.init = function () {
    console.log('Ran: in loginModalController');
  }
 
  $scope.init();

   /*$scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'partials/login-modal.html',
      //controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };*/

});