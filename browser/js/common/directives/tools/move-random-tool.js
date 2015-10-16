app.directive('moveToolRandom', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tools/move-random-tool.html',
        scope:{
            movetool: "=",
            model:"=",
            index: "=",
            parent: "=",
            remove: "="
        }
    }
});
