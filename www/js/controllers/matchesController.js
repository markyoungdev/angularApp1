angular.module('sideMenuApp.controllers').controller('MatchesController', function ($scope, $location, $ionicSideMenuDelegate, $state, matchService, getMatches, addMatch, getMatchesInit) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    var getAllMatches = function() {
           $scope.matches = getMatchesInit;
           console.log(getMatchesInit);
        /*console.log( matchService.findAll());
        matchService.findAll().then(function (test) {
            console.log(test);
            $scope.matches = matches;
        });*/
    }

   /* $scope.doRefresh = function() {
        var userID = getetUserInit._id
        getNewMatches.get(userID) 
         .finally(function() {
           // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete'); 
         });

    }*/ 
    $scope.addMatch = function() {
        addMatch.addMatch;
    }

   
    //getAllMatches();


     
});