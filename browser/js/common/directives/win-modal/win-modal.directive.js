app.directive('winModal', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/win-modal/win-modal.html',
        link: (scope, elem, attr) => {
        }
    }
  });


app.controller('ModalCtrl', ($scope, $modalInstance)=>{

  $scope.closemodal = ()=>{
    $modalInstance.close();
  };

});