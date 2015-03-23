angular.module('sideMenuApp.controllers').controller('LoginModalController', function ($scope, $location,$ionicSideMenuDelegate, $state, $ionicModal, $rootScope, user, getUser, addNewUser, getCoords) {

  /*$ionicModal.fromTemplateUrl('partials/login-modal.html', {
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
  });*/
  /*$rootScope.$on('user.login', function() {
    //$scope.modal.hide();
    //$scope.modal.remove();
    getCoords.getUserCoord().then(function(position){
     $scope.lat = parseFloat(position.coords.latitude).toFixed(4);
     $scope.lng = parseFloat(position.coords.longitude).toFixed(4);
     $scope.geoJSON = {'lat': $scope.lat, 'lng': $scope.lng};
      console.log(position);
      console.log($scope.lat);
      console.log($scope.lng);   

       var currentUser = user.current;
    if (currentUser.authenticated) {
      //console.log(currentUser);
      var username = currentUser.user_id;
      var name = currentUser.first_name;
      getUser.getUserData(username)
      .$promise.then(function(data){
        if(!data._id){
          var userData = {};
          userData.username = username;
          userData.name =  name;
          userData.img = 'img3';
          userData.loc = $scope.geoJSON;
          userData.distance = 10;
          userData.hidden = false;
          console.log(userData);
          //console.log(userData);
          //console.log('current lat:'+$scope.lat+ ' previous lat:'+data.loc.lat);
          //addNewUser.addUser(userData);
          }
      });
     
    }   

    });    
  });*/

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