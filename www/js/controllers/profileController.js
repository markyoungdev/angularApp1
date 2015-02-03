angular.module('sideMenuApp.controllers').controller('profileController', function ($scope, $location, $ionicSideMenuDelegate, $state, $cordovaImagePicker) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    

	 $scope.getPicturest = function() {
	 	console.log($cordovaImagePicker.getPictures());
	  var options = {
	   maximumImagesCount: 10,
	   width: 800,
	   height: 800,
	   quality: 80
	  };
	  $cordovaImagePicker.getPictures(options)
	    .then(function (results) {
	    	console.log(results)
	      for (var i = 0; i < results.length; i++) {
	        console.log('Image URI: ' + results[i]);
	      }
	    }, function(error) {
	      // error getting photos
      });
	}
});