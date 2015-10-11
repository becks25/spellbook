app.directive('moveTool', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tools/move-tool.html',
        scope:{
            movetool: "=",
            model:"=",
            index: "=",
            parent: "=",
            remove: "="
        }
    }
  });