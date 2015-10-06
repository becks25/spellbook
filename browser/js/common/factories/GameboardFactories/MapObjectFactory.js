app.factory('MapObjectFactory', function(PosFactory, TilesizeFactory){

    class MapObject {
      constructor(name, position, action, variables){
        console.log(name);
        this.name = name;
        this.position = new PosFactory(position.x, position.y);
        this.action = action || null;
        this.variables = variables || null;

        this.entity = this.basicEntity(name);

      }

      basicEntity(sprite) {
        var e = Crafty.e('2D, Canvas, ' + sprite);
        e._attr({w: TilesizeFactory.TILESIZE, h: TilesizeFactory.TILESIZE, rotation: 0});
        e.origin('top left');

        console.log('entity', e);
        return e;
      }

      setMap(mappy){
        this.map = mappy;
      }

      setMapPos(position) {
        this.map.addObject(this, position);
        this.position = position;
        this.entity.x = position.x * TilesizeFactory.TILESIZE;
        this.entity.y = position.y * TilesizeFactory.TILESIZE;

      }

      getMapPos(){
        return this.position;
      }

    }

    return MapObject;


});