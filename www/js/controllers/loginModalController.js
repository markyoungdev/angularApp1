angular.module('sideMenuApp.controllers').controller('loginModalController', function ($scope, $location,$ionicSideMenuDelegate, $state, $ionicModal, $rootScope, user) {

  $ionicModal.fromTemplateUrl('partials/login-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $rootScope.$on('user.login', function() {
    $scope.modal.hide();
    $scope.modal.remove();
  });

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