angular.module('sideMenuApp.controllers')

.controller('cardsController', function($scope, TDCardDelegate, $state, matchService, getMatches, addMatch) {
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq.jpeg' },
    { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
    { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
  ];

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
})

.controller('cardController', function($scope, TDCardDelegate) {
    console.log('card controller');
  
});