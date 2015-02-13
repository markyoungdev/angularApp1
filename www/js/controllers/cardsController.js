angular.module('sideMenuApp.controllers')

.controller('cardsController', function($scope, TDCardDelegate, $state, matchService, getMatches, addMatch, getCoordsInit, getNewMatchesInit) {
 
  $scope.cardObj = getNewMatchesInit;
  var cardTypes = $scope.cardObj.data;
  console.log(cardTypes);
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
     //addMatch.addMatch;
  }

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index, card) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
    console.log(card);
    //addMatch.addMatch;  
  };
  $scope.init = function () {
    //console.log('Ran: in cardsController');
  }
  $scope.coords = getCoordsInit;
  console.log($scope.coords);
 
  $scope.init();
})

.controller('cardController', function($scope, TDCardDelegate) {
   // console.log('card controller');
  
});
