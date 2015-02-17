angular.module('sideMenuApp.controllers')

.controller('cardsController', function($scope, TDCardDelegate, $state, matchService, getMatches, addMatch, getCoordsInit, getNewMatchesInit, user, getUser, updateUser) {
 
  $scope.cardObj = getNewMatchesInit;
  var cardTypes = $scope.cardObj.data;
  //console.log(cardTypes);
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
  $scope.coords = getCoordsInit;
  var lat = parseFloat($scope.coords.coords.latitude).toFixed(4);
  var lng = parseFloat($scope.coords.coords.longitude).toFixed(4);
  //console.log($scope.coords.coords)

  var geoJSON = {'lat': lat, 'lng': lng};

  var currentUser = user.current;
  if (currentUser.authenticated) {
   // console.log(currentUser);
    var username = currentUser.user_id;
    getUser.getUserData(username)
    .$promise.then(function(data){
      console.log(data.loc.lat);
      if(parseFloat(data.loc.lat) != parseFloat(lat) || parseFloat(data.loc.lng) != parseFloat(lng)){
          var userData = {};
          userData.id = username;
          userData.loc = geoJSON;
          console.log('current lat:'+lat+ ' previous lat:'+data.loc.lat);
          updateUser.update(userData);
      } else {
        console.log('location hasn\'t changed');
      }
        
    });
  }
 
  $scope.init();
})

.controller('cardController', function($scope, $ionicSwipeCardDelegate) {
   $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
  console.log($ionicSwipeCardDelegate);
});
