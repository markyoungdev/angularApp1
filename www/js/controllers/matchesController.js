angular.module('sideMenuApp.controllers').controller('matchesController', function ($scope, $location, $ionicSideMenuDelegate, $state, matchService) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    var getAllMatches = function() {
        matchService.findAll().then(function (matches) {
            $scope.matches = matches;
        });
    }
    getAllMatches();
});