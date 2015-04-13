angular.module('sideMenuApp.services', [])

	.service('LoggedInUser', function($resource, user, $q, localStorageService, getUser, getUserCoords, addNewUser){
        this.set = function(){             
            var test = user.getCurrent().then(function (currentUser) { 

                if(localStorageService.isSupported) {
                   localStorageService.set('user_id', currentUser.user_id);
                   localStorageService.set('userUAObj', JSON.stringify(currentUser));
                    
                }                                       
                return currentUser.user_id;
            }); 
            return test;
        }
        this.getUAUser = function(){
            return JSON.parse(localStorageService.get('userUAObj'));
        }
        this.getUsername = function(){

            return localStorageService.get('user_id');
        }
        this.getUserData = function(){                
            this.setQueryUser();                              
            //console.log(localStorageService.get('userDbObj').failed)
            if( localStorageService.get('userDbObj') == null || localStorageService.get('userDbObj').hasOwnProperty('failed') || !localStorageService.get('userDbObj')){
                console.log(this.getUAUser());      
                //return localStorageService.get('userDbObj');
                return this.addNewUser();

            } else {
                console.log('already set');
                 return localStorageService.get('userDbObj');
            }
               
           
        }
        this.setQueryUser = function(){            
            var username = this.getUsername();                     
            return getUser.getUserData(username).then(function(user){
                localStorageService.clearAll();               
                localStorageService.set('userDbObj', JSON.stringify(user));
            });
        }
        this.addNewUser = function(){           

            return getUserCoords.get().then(function(coordElm){  
                var username = user.current.user_id;
                var name = user.current.first_name;
                var lat = parseFloat(coordElm.coords.latitude).toFixed(4);
                var lng = parseFloat(coordElm.coords.longitude).toFixed(4);                                
                var geoJSON = {'lat': lat, 'lng': lng};              
                var userData = {};
                userData.username = username;
                userData.name =  name;
                userData.img = 'img3';
                userData.loc = geoJSON;
                userData.distance = 30;
                userData.hidden = false; 
                console.log(userData);
                var newUser = addNewUser.addUser(userData);   
                var userObj = newUser.$promise.then(function(data){                     
                  localStorageService.set('userDbObj', JSON.stringify(data));
                  return localStorageService.get('userDbObj');
                });                 
                return localStorageService.get('userDbObj');
            });             

        }
    })