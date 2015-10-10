app.directive('addVariable', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/add-variable/add-variable.html',
        scope: {
        	tool: '=',
        	// removeFn: '='
        },
        link: (scope, elem, attr) => {
        	console.log('in link');
        	scope.removeFromTool = (index, loc)=>{
        		console.log('removing')
        		loc.splice(index, 1);
        		// console.log(loc)
        	}
        	
        	
        }
    }
  });