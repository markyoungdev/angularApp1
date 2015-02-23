angular.module('sideMenuApp.controllers')

.controller('cardsController', function($scope, TDCardDelegate, $state, matchService, getMatches, addMatch, getCoordsInit, getNewMatchesInit, user, getUser, updateUser, getUserInit) {
  /**
  *
  * Define scope variables that
  * have been passed from the state resolve
  *
  **/  
  $scope.cardObj = getNewMatchesInit;
  console.log(getUserInit);
  $scope.userData = getUserInit;  
  var cardTypes = $scope.cardObj.data;  

  /**
  *
  * Test to see if the $scope.userData variable returned without data 
  * and requery the user if so.
  *
  **/
  if(!$scope.userData.usernmae){
    var currentUser = user.current;
       user.getCurrent().then(function(currentUser){                    
       $scope.userData = getUser.getUserData(currentUser.user_id);
      
    });     
  }
      
  /**
  *
  * Generate cards
  *
  **/    
  $scope.cards = Array.prototype.slice.call(cardTypes, 1);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    //$scope.$apply();
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
     //addMatch.addMatch;
  }

  $scope.cardSwipedLeft = function(index, card) {
    console.log('LEFT SWIPE');
    $scope.addCard();
    $scope.cardDestroyed();
    //card.swipe();
  };
  $scope.cardSwipedRight = function(index, card) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
    console.log(card._id);
    //card.swipe();
    $scope.cardDestroyed();
    $scope.addMatch(card._id);  
   // $scope.$apply();
  };
  $scope.addMatch = function(requestee) {
     var currentUser = user.current;
      if (currentUser.authenticated) {
        // console.log(currentUser);
        var username = currentUser.user_id;
        var matchData = {};
        matchData.requestor = username;
        matchData.requestee = requestee;
        addMatch.add(matchData);
      }
  }  
  $scope.init = function () {
    //console.log('Ran: in cardsController');
  }
  /**
  *
  * Get the current coordinates
  *
  **/  
  $scope.coords = getCoordsInit;
  var lat = parseFloat($scope.coords.coords.latitude).toFixed(4);
  var lng = parseFloat($scope.coords.coords.longitude).toFixed(4);
  /**
  *
  * Add the current coordinates to an object
  *
  **/
  var geoJSON = {'lat': lat, 'lng': lng};
  /**
  *
  * Update the user if the location has changed 
  *
  **/  
  var currentUser = user.current;
  if (currentUser.authenticated) {
    console.log($scope.userData);     
      //console.log(data.loc.lat);
      if(parseFloat($scope.userData.loc.lat) != parseFloat(lat) || parseFloat($scope.userData.loc.lng) != parseFloat(lng)){
          var userData = {};
          userData.id = $scope.userData.username;
          userData.loc = geoJSON;
          console.log('current lat:'+lat+ ' previous lat:'+$scope.userData.loc.lat);
          updateUser.update(userData);          
      } else {
        console.log('location hasn\'t changed');
      }
        

  }

  $scope.pollNewUsers = function() {
     $scope.$on('addNewUser:userAdded', function() {
      console.log('New User added');
     });
  }
  $scope.pollNewUsers();
  $scope.init();
})

.controller('cardController', function($scope, $ionicSwipeCardDelegate) {
   $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
  console.log($ionicSwipeCardDelegate);
});
