app.factory('MapObjectFactory', function(){

    class MapObject {
      constructor(name, position, action, variables){
        this.name = name;
        this.position = new Pos(position.x, position.y);
        this.action = action || null;
        this.variables = variables || null;

      }

      basicEntity(sprite) {
        var e = Crafty.e('2D, Canvas, ' + sprite);
        e.attr({w: 64, h: 64, rotation: 0});
        e.origin(32, 32);
        return e;
      }

      setMap(mappy){
        this.map = mappy;
      }

      setMapPos(position) {
        map.addObject(this, position);
        this.position = position;

      }

    }

    return MapObject;


});