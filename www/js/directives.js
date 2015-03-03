var sideMenuApp = angular.module('app')

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.directive('swiper', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        	var mySwiper = new Swiper(".swiper-container", {		    	
		    	effect: 'coverflow',
		    	centeredSlide: true,
		    	slidePerView: 'auto',
		    	coverflow: {
				  rotate: 50,
				  stretch: 0,
				  depth: 100,
				  modifier: 1,
				  slideShadows : true
				}
		    });
		    console.log(mySwiper)
            //angular.element(element).'pluginActivationFunction'(scope.$eval(attrs.directiveName));
        }
    };
}); 