angular.module('sideMenuApp.controllers').controller('faqsController', function ($scope, $location) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $scope.sideMenuController.toggleLeft();
        $location.url('/' + page);
    };
});