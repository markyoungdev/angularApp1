angular.module('sideMenuApp.controllers').controller('LoginController', function ($scope, $state, setUserAttrs, $rootScope, $location) {

  $scope.currentUser = Parse.User.current();  


  if ( $scope.currentUser ) {
    $location.path("/app/new-matches");
  } 

  function loginSuccessful(user) {
    setUserAttrs.then(function(data){
      var latitude = data.coords.latitude;
      var longitude = data.coords.longitude;
      var point = new Parse.GeoPoint({latitude: latitude, longitude: longitude});
      user.set("location", point); 
      user.save();         
    });

    $rootScope.$apply(function() {
      $rootScope.currentUser = Parse.User.current();
      $location.path("/app/new-matches");
    });
  }

  function loginUnsuccessful(user, error) {
    alert("Error: " + error.message + " (" + error.code + ")");
  }


  $scope.logIn = function(form) {    
 
    Parse.User.logIn(form.username, form.password, {
      success: loginSuccessful,
      error: loginUnsuccessful
    });   
  };  

  $scope.init = function () {
    console.log('Ran: in loginController');
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