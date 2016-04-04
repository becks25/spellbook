app.factory('TilesizeFactory', ['$window', function($window){
    var numTiles = 6;

    var width = document.querySelector('#right-page').clientWidth;

    return {
      TILESIZE: width/numTiles,
      NumTiles: numTiles
    }

}]);