angular.module('sideMenuApp.controllers').controller('menuController', function ($scope, $location, $ionicSideMenuDelegate,$state) {
       
        $scope.goTo = function(page) {
            console.log('Going to ' + page);
            $ionicSideMenuDelegate.toggleLeft();
            $state.go(page);           
        };
    });