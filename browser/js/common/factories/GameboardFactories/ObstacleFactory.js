app.factory('ObstacleFactory', function(MapObjectFactory){
  var object = null;
  var position = {
    x: null,
    y: null
  };

  return {
    init: function(object, posX, posY){
      object = MapObjectFactory.basicEntity(object);
      position.x = posX;
      position.y = posY;
    },

    position: position

  }
});