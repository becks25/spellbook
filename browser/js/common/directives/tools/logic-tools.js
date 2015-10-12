app.directive('logicTools', function ($rootScope, $state, $compile) {

    return {
        restrict: 'E',
        replace:true,
        templateUrl: 'js/common/directives/tools/logic-tools.html',
        scope:{
          logictool: "=",
          model:"=",
          index: "=",
          parent: "=",
          remove: "="
        },
        link: (scope, elem) => {
          if(angular.isArray(scope.logictool.expressions)){
            elem.append(`<add-variable tool='logictool'></add-variable>
`);
            $compile(elem.contents())(scope);
          }

          scope.re = /_/g;
        }
    }
  });