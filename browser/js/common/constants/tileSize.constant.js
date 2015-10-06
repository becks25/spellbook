app.factory('TilesizeFactory',function($window){
    var numTiles = 6;

    return {
      TILESIZE: $window.innerWidth/(2 * numTiles),
      NumTiles: numTiles
    }

});