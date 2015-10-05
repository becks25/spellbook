app.factory('AvatarFactory', function(MapObjectFactory){
  var character = null;
  var startPosition = {
    x: null,
    y: null
  };

  return {
    init: function(character, startPosX, startPosY){
      character = MapObjectFactory.basicEntity(character);
      startPosition.x = startPosX;
      startPosition.y = startPosY;
    },

    newPos: function(x, y){
      MapObjectFactory.setMapPos(x, y);
    }

  };

});