/**
 * Created by Austin on 10/5/15.
 */
app.factory('MapFactory', function(ClassFactory) {
    class Map {
        // fat arrows allow for this to reference MapFactory and not the inner function
        constructor (mapData) {
            this.avatar = null;
            this.objects = [];
            this.mapArray = [
                [[],[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[],[]]
            ];
            this.load(mapData);
        }
        destroy () {
            MapFactory.each(obj => {
                obj.destroy();
            });
            this.objects = [];
            this.mapArray = null;
        }
        getAvatar (){
            return this.avatar
        }

        //took out each function, this is where it would have gone
        //it checked each tile in the path for the tank and saw if a bullet would hit anything

        // position is an object with x and y coordinates
        getObject (position, type) {
          var objs = this.getObjects(position);
          for (var i = 0; i < objs.length; i++) {
              if(objs[i].type === type) {
                  return objs[i];
              }
          }
            return null;
        }

        getObjects (position) {
            return this.mapArray[position.x][position.y]
        }

        addObject (obj, position) {
            this.removeObject(obj);
            this.objects.push(obj);
            this.getObjects(position).push(obj);
        }

        removeObject (obj) {
            this.objects = this.arrayRemove(this.objects, obj);
            var oldPos = obj.getMapPos();
            if (this.onMap(oldPos)) {
                var objs = this.getObjects(oldPos);
                this.mapArray[oldPos.x][oldPos.y] = this.arrayRemove(objs, obj);
            }
        }

        arrayRemove (array, obj) {
            var index = array.indexOf(obj);
            if(index > -1) {
                array.splice(index, 1);
            }
            return array;
        }

        load (mapData) {
            var x, y;
            var len = mapData.length;
            for(x = 0; x< len; x++) {
                for(y = 0; y < len; y++) {
                    console.log(mapData[x][y]);
                    mapData[x][y].forEach(object => {
                        this.loadObject(object, x, y);
                    })
                }
            }
        }

        loadObject (key, x, y) {
            var obj = this.createObject(key, x, y);
            if(obj) {
                if(obj.type === 'Avatar' )
                    this.avatar = obj;
            }
            obj.setMap(this);
            var position = {x: x, y: y};

            obj.setMapPos(position);
        }

        createObject (obj, x, y) {
            var position = {x: x, y: y};
            return new ClassFactory[obj.type](obj.name, position, obj.action || null, obj.variables || null);
        }

        isPassable (position) {
            if (!this.onMap(position.x,position.y)) return false;

            var passable = true;

            this.each(position.x, position.y, obj => {
                if (!obj.isPassable()) {
                    passable = false;
                }
            });
            return passable;
        }

        onMap (x,y) {
                if(x < 0 || y < 0 || x >= this.mapArray.length || y >= this.mapArray.length) return false;
                return true;
            }

   }
    return Map;
});
