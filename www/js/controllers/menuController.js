angular.module('sideMenuApp.controllers').controller('MenuController', function ($scope, $window, $location, $ionicSideMenuDelegate, $state, user, getUser) {
       
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };
    var currentUser = user.current;
    var username = currentUser.user_id;
    var name = currentUser.first_name;
    //console.log($window);
    $scope.windowSize = $window.innerWidth;
    $scope.percentage = (70/100);
    $scope.sideMenuWidth = $scope.percentage * $scope.windowSize;
    
   /* getUser.getUserData(username)
 	.$promise.then(function(results){
 		$scope.currentUserAvatar = results['avatar'];
 		console.log(results['avatar']);
 	});*/
    $scope.logout = function(){
        var currentUser = Parse.User.current();
        Parse.User.logOut();
        $location.path("/");
        console.log(currentUser);
    }

    $scope.init = function () {
       
    }

    
 
  $scope.init();
    });