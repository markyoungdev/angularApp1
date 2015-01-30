angular.module('sideMenuApp.services', [])

    .factory('matchService', function($q) {

        var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/avatar.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/avatar2.jpg', id: 2, distance: "14mi", messages: 2}
        ];

        return {
            findAll: function() {
                var deferred = $q.defer();
                deferred.resolve(matches);
                return deferred.promise;
            },

            findById: function(matchId) {
                var deferred = $q.defer();
                var match = matches[matchId - 1];
                console.log(match);
                deferred.resolve(match);
                return deferred.promise;
            },
        }
    });