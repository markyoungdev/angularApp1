angular.module('sideMenuApp.controllers').controller('ProfileController', function ($scope, $location, $ionicSideMenuDelegate, $state, $cordovaImagePicker, $timeout, $cordovaFileTransfer) {
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

	$scope.uploadFile = function() {
		Upload.fileTo('http://localhost:3000/upload/images').then(
			function(res) {
				// Success
			}, function(err) {
				// Error
		});
	};

	 document.addEventListener('deviceready', function () {

	    var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
	    var targetPath = cordova.file.documentsDirectory + "testImage.png";
	    var trustHosts = true
	    var options = {};

	    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
	      .then(function(result) {
	        // Success!
	      }, function(err) {
	        // Error
	      }, function (progress) {
	        $timeout(function () {
	          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
	        })
	      });

	   }, false);


	  document.addEventListener('deviceready', function () {

	    $cordovaFileTransfer.upload(server, filePath, options)
	      .then(function(result) {
	        // Success!
	      }, function(err) {
	        // Error
	      }, function (progress) {
	        // constant progress updates
	      });

	  }, false);
});