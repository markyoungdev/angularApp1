angular.module('sideMenuApp.controllers').controller('forgotPasswordCtrl', function ($scope, $ionicSideMenuDelegate, $state, $stateParams) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };    
});