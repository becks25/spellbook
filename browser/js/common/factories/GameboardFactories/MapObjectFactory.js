app.factory('MapObjectFactory', function(PosFactory, TilesizeFactory){

    class MapObject {
      constructor(name, position, action, variables){
        this.name = name;
        this.position = new PosFactory(position.x, position.y);
        this.action = action || null;
        this.variables = variables || null;
        this.passable = true;
        this.entity = this.basicEntity(name);

      }

      basicEntity(sprite) {
        var e = Crafty.e('2D, Canvas, ' + sprite);
        e._attr({w: TilesizeFactory.TILESIZE, h: TilesizeFactory.TILESIZE, rotation: 0});
        e.origin('top left');

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

      move(dir, amt) {
        var newPos = new PosFactory(this.position.x, this.position.y);
        newPos.addDir(dir, amt);

        this.setMapPos(this.position);

        return this.position;

      }

      getMapPos(){
        return this.position;
      }

      onCycle(){
        //go through all the actions on the object
        if(this.action){
          this.action.forEach(action => {
            this[action]();
          });
        }
      }

    }

    return MapObject;


});