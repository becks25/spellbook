app.controller('DragAndDropCtrl', function ($scope, DraggedFactory) {

    $scope.handleDragStart = function (e) {
        becks.log(['started drag', e]);
        e.stopPropagation();
        DraggedFactory.dragged=this;
        this.style.opacity = '0.4';
    };
    $scope.handleDragEnd = function (e) {
        this.style.opacity = '1.0';

    };
    $scope.handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('droppable', this);
        var draggedElem = angular.element(DraggedFactory.dragged);
        var left = e.pageX;
        var top = e.pageY/2;

        draggedElem.css('left', left + 'px');
        draggedElem.css('top', top + 'px');
        draggedElem.css('position', 'absolute');

        this.style.transform = 'scale(1.0)';
    };
    $scope.handleDragOver = function (e) {
        e.preventDefault(); // Necessary. Allows us to drop.
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

        return false;
    };
    $scope.handleDragLeave = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

    };
});