angular.module('sideMenuApp.controllers').controller('settingsController', function ($scope, $location, $ionicSideMenuDelegate, $state) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    $scope.rangeValue = 0;
    
    $scope.$watch('settings.rangeValue',function(val,old){
       $scope.rangeValue = parseInt(val); 
        
    });

    $scope.saveSettings = function(settings) {
    	console.log(settings);
    }
});