angular.module('sideMenuApp.controllers').controller('SettingsController', function ($scope, $location, $ionicSideMenuDelegate, $state, user, getUser, loadUser, updateUserSettings, getSettings) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };
    // Get the current user's data
    $scope.userCurrent = loadUser;
    getSettings.$promise.then(function(settings){
       $scope.oldSettings = settings;
       console.log(settings);
       if($scope.oldSettings){
            $scope.settings.rangeValue = $scope.oldSettings.distance;
            $scope.settings.profileHidden  = $scope.oldSettings.hidden;   
            $scope.settings.bio  = $scope.oldSettings.bio;
        } else {
            $scope.settings.rangeValue = 10;
            $scope.settings.profileHidden  = false;  
            $scope.settings.bio = '';
        }    

    });
    // Build out our form object for submission
    $scope.settings = {};
    $scope.settings.userID = $scope.userCurrent.user_id;

    
    $scope.$watch('settings.rangeValue',function(val,old){
       $scope.rangeValue = parseInt(val);         
    });

  

    $scope.saveSettings = function(settings) {
        console.log(settings)
    	updateUserSettings.update(settings);
    }
});