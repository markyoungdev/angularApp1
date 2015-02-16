angular.module('sideMenuApp.controllers').controller('matchesController', function ($scope, $location, $ionicSideMenuDelegate, $state, matchService, getMatches, addMatch) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    var getAllMatches = function() {
           $scope.matches = matchService.findAll();
        /*console.log( matchService.findAll());
        matchService.findAll().then(function (test) {
            console.log(test);
            $scope.matches = matches;
        });*/
    }


    $scope.addMatch = function() {
        addMatch.addMatch;
    }

    $scope.init = function () {
     console.log('Ran: in matchesController');
    }

    
 
    $scope.init();
    getAllMatches();


     
});