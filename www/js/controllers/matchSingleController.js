angular.module('sideMenuApp.controllers').controller('MatchSingleController', function ($scope, $location, $ionicSideMenuDelegate, $state, matchService, $stateParams) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    var getMatch = function() {	    
	    $scope.match = matchService.findById($stateParams.matchId);	        
	    console.log($scope.match);
	}
	getMatch();
});