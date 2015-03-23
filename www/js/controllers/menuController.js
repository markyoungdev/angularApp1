angular.module('sideMenuApp.controllers').controller('MenuController', function ($scope, $location, $ionicSideMenuDelegate, $state, user, getUser) {
       
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };
    var currentUser = user.current;
    var username = currentUser.user_id;
    var name = currentUser.first_name;
    
   /* getUser.getUserData(username)
 	.$promise.then(function(results){
 		$scope.currentUserAvatar = results['avatar'];
 		console.log(results['avatar']);
 	});*/
      
    $scope.init = function () {
        /*getUser.getUserData(username)
         .$promise.then(function(results){
            $scope.currentUserAvatar = results['avatar'];
            console.log(results['avatar']);
        });*/
    }
 
  $scope.init();
    });