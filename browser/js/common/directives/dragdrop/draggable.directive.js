app.directive('draggable', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element[0].draggable=true;
      element[0].addEventListener('ondragstart', scope.handleDragStart, false);
      element[0].addEventListener('ondragend', scope.handleDragEnd, false);
    },
    controller: 'DragAndDropCtrl'
  };
});