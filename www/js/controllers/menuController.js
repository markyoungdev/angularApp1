angular.module('sideMenuApp.controllers').controller('MenuController', function ($scope, $location, $ionicSideMenuDelegate, $state, getUserImage, user, getUser) {
       
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };
    var currentUser = user.current;
    var username = currentUser.user_id;
    var name = currentUser.first_name;
    
    getUser.getUserData(username)
 	.$promise.then(function(results){
 		$scope.currentUserAvatar = results['avatar'];
 		console.log(results['avatar']);
 	});
      
    });