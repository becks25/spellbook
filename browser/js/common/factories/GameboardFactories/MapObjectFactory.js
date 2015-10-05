app.factory('MapObjectFactory', function(){

  var mapPos = {
    x: null,
    y: null
  };
  var passable = true;
  var map = null;

  return {
    mapPos: mapPos,
    passable: passable,
    map: map,
  
    basicEntity: sprite => {
      var e = Crafty.e('2D, Canvas, ' + sprite);
      e.attr({w: 64, h: 64, rotation: 0});
      e.origin(32, 32);
      return e;
    },

    setMap: mappy => {
      map = mappy;
    },

    getMap: () => map,

    getMapPos: () => mapPos,

    setMapPos: (x, y) => {
      map.addObject(x, y);
      mapPos.x = x;
      mapPos.y = y;
    }


});