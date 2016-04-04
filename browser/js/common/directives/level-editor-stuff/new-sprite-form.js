app.directive('newSpriteForm', ['$rootScope', '$state', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/level-editor-stuff/new-sprite-form.html',
        link: (scope, elem, attr) => {
        }
    };
  }]);