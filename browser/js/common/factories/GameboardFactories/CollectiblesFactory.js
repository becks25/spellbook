app.factory('CollectiblesFactory', function(MapObjectFactory){

  var object = null;
  var position = {
    x: null,
    y: null
  };

  var hasBeenPickedUp = false;

  return {
    init: function(object, posX, posY){
      object = MapObjectFactory.basicEntity(object);
      position.x = posX;
      position.y = posY;
    },

    position: position,

    pickUp: () => hasBeenPickedUp = true,

    hasBeenPickedUp: hasBeenPickedUp,

    type: 'Collectible'

  }
})