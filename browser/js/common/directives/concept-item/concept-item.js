app.directive('conceptItem', ['UserFactory', function(UserFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/concept-item/concept-item.html',
    scope: {
      concept: '=',
      user: '='
    },
    link: function(scope) {
    	scope.getScore = (conceptObj) => {
            return Math.floor(conceptObj.pointsEarned/conceptObj.pointsPossible*100);     
    	};
    }
  };
}]);