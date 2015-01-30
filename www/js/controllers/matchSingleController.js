angular.module('sideMenuApp.controllers').controller('matchSingleController', function ($scope, $location, $ionicSideMenuDelegate, $state, matchService, $stateParams) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    matchService.findById($stateParams.matchId).then(function(match) {
        $scope.match = match;
        //console.log($stateParams);
    });
});