app.directive('addVariable', ['$rootScope', '$state', 'SpellFactory', function ($rootScope, $state, SpellFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/add-variable/add-variable.html',
        scope: {
        	tool: '=',
        	// spell: '='
        },
        link: (scope, elem, attr) => {
        	scope.removeFromTool = (index, loc)=>{
        		// console.log('removing')
        		loc.splice(index, 1);
        		// scope.spell.reset();
        	}
        	
        	
        }
    };
  }]);