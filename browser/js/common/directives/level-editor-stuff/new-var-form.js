app.directive('newVarForm', ['$rootScope', '$state', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/level-editor-stuff/new-var-form.html',
        link: (scope, elem, attr) => {
        }
    };
  }]);