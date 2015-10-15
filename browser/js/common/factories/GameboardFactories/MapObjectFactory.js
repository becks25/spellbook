app.factory('MapObjectFactory', function(PosFactory, TilesizeFactory, AuthService, UserFactory, LARGE_AVATARS, SPRITES){

    class MapObject {
      constructor(name, position, action, varName, variables, match){
        //name matches scope variable from spells tools
        this.name = name;
        this.position = new PosFactory(position.x, position.y);
        this.action = action || null;
        this.variables = variables || null;
        this.passable = true;
        this.varName = varName;
        this.entity = this.basicEntity(name);
        this.match = match || null
      }

      basicEntity(sprite) {
        var e = Crafty.e('2D, Tween, Canvas, ' + sprite);
        e._attr({w: TilesizeFactory.TILESIZE, h: TilesizeFactory.TILESIZE, rotation: 0});
        e.origin('top left');

        return e;
      }

      setMap(mappy){
        this.map = mappy;
      }

      setMapPos(position) {
        var pos = new PosFactory(position.x, position.y);
        //this.map.removeObject(this);
        this.map.addObject(this, pos);
        this.position = pos;
        this.entity.x = pos.x * TilesizeFactory.TILESIZE;
        this.entity.y = pos.y * TilesizeFactory.TILESIZE;

      }


      move(dir, amt) {
        var newPos = new PosFactory(this.position.x, this.position.y);
        newPos.addDir(dir, amt);

        if(this.map.isPassable(newPos)){
          return newPos;
        }else{
          return false;
        }

      }

      getMapPos(){
        return this.position;
      }

      tween(attrs, duration, callback){
        this.entity.requires('Tween');
        this.entity.tween(attrs,duration);
        // Set up callback to run once at end of tweening...
        if (callback) {
          var self = this;
          var onceFn = function() {
            self.entity.unbind('TweenEnd', onceFn);
            setTimeout(function() {callback.call(self)}, 50);
          };
          this.entity.bind('TweenEnd', onceFn);
        }
      }

      promTweenQueen(attrs, duration){
        var self = this;
        return new Promise(function(resolve, reject){
          self.tween(attrs, duration, function(err, res){
            if(err) reject(err);
            else resolve(res);
          });
        });
      }

      onCycle(){
        //go through all the actions on the object
        if(this.action){
          this.action.forEach(action => {
            this[action]();
          });
        }
      }

      //creates an array of all the sprites with name and imgUrl props
      buildSpitesListObj(){
        let allSprites = [];
        for (let key of LARGE_AVATARS){
          allSprites.push({name:key, img:LARGE_AVATARS[key]})
        }
        for (let key of SPRITES){

        }
      }

    }

    return MapObject;


});
