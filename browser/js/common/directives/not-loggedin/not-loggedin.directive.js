app.directive('notLoggedin', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/not-loggedin/not-loggedin.html',
        link: (scope, elem, attr) => {
        }
    }
  });


app.controller('ModalCtrl', ($scope, $modalInstance)=>{

  $scope.closemodal = ()=>{
    $modalInstance.close();
  };

});