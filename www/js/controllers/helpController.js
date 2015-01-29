angular.module('sideMenuApp.controllers').controller('helpController', function ($scope, $location, $ionicSideMenuDelegate, $state) {
        // "MenuService" is a service returning mock data (services.js)
        //$scope.list = MenuService.all();
    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $ionicSideMenuDelegate.toggleLeft();
        $state.go(page);           
    };

    $scope.questions = [
    	{title: 'How do I close my account', answers:'You simply.....'}
    ];
		
	

	/*
	* if given group is the selected group, deselect it
	* else, select the given group
	*/
 	 $scope.toggleGroup = function(question) {
   	 if ($scope.isGroupShown(question)) {
      $scope.shownGroup = null;
   	 } else {
      $scope.shownGroup = question;
  	  }
  	};
 	 $scope.isGroupShown = function(question) {
   	 return $scope.shownGroup === question;
 	};
  
});