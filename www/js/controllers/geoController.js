sideMenuApp.controller('geoController', function($cordovaGeolocation,$scope) {

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
   /*$cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.position = position;
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.lat = lat;
      $scope.long = long;
      console.log($scope.lat);
    }, function(err) {
      // error
    });*/
    
   $scope.getCurrentPosition = function () {
     $cordovaGeolocation.getCurrentPosition().then(function(value){
      console.log(value);
      $scope.test = value.coords;
     })
  };
$scope.getCurrentPosition();
    //$scope.test = test;

 /* var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
  });


  watch.clearWatch();
  // OR
  $cordovaGeolocation.clearWatch(watch)
    .then(function(result) {
      // success
      }, function (error) {
      // error
    });*/
});