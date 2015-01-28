angular.module('sideMenuApp.controllers').controller('matchesController', function ($scope, $location, $ionicSideMenuDelegate, $state) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    $scope.matches = [
    	{name: 'Katie', date: 63.1, avatar:'/images/avatar.jpg', id: 1, distance: "2mi", messages: 10},
    	{name: 'Nia', date: 61.8, avatar:'/images/avatar2.jpg', id: 2, distance: "14mi", messages: 2}
	];
});