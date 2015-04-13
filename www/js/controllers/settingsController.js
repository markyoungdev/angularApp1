angular.module('sideMenuApp.controllers').controller('SettingsController', function ($scope, $location, $ionicSideMenuDelegate, $state, user ) {
        // "MenuService" is a service returning mock data (services.js)
      
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };
    $scope.settings = {};
    // Get the current user's data
    $scope.currentUser = Parse.User.current();
    console.log($scope.currentUser);
    console.log($scope.currentUser.get('profileHidden'))
    // current users search radius
    if($scope.currentUser.get('searchRadius')){
        $scope.settings.rangeValue = $scope.currentUser.get('searchRadius')
    } else {
        $scope.settings.rangeValue = 50;
    }

    // profile hidden value
     if($scope.currentUser.get('profileHidden')){
        $scope.settings.profileHidden = $scope.currentUser.get('profileHidden')
    } else {
        $scope.settings.profileHidden = 'false';
    }

    // current users bio
     if($scope.currentUser.get('bio')){
        $scope.settings.bio = $scope.currentUser.get('bio')
    } else {
        $scope.settings.bio = '';
    }
   
    // Build out our form object for submission 
    
    $scope.$watch('settings.rangeValue',function(val,old){
       $scope.rangeValue = parseInt(val);         
    });

    /*$scope.$watch('settings.profileHidden',function(val,old){
      $scope.profileHidden = val.toString();  
    });*/
  
    // save our settings.
    // need a better way to loop over these later.
    $scope.saveSettings = function(settings) {
        console.log(settings);       
    	$scope.currentUser.set("searchRadius", settings.rangeValue); 
        $scope.currentUser.set("profileHidden", settings.profileHidden.toString()); 
        $scope.currentUser.set("bio", settings.bio); 
        $scope.currentUser.save(); 
        

    }
});