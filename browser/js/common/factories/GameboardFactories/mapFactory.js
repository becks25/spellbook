/**
 * Created by Austin on 10/5/15.
 */
app.factory('MapFactory', function() {
    return {
        // fat arrows allow for this to reference MapFactory and not the inner function
        init: mapData => {
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
        },
        destroy: () => {
            MapFactory.each(obj => {
                obj.destroy();
            });
            this.objects = [];
            this.mapArray = null;
        },
        getAvatar: () => this.avatar,

        //took out each function, this is where it would have gone
        //it checked each tile in the path for the tank and saw if a bullet would hit anything

        // position is an object with x and y coordinates
        getObject: (position, type) => {
          var objs = this.getObjects(position);
          for (var i = 0; i < objs.length; i++) {
              if(objs[i].type === type) {
                  return objs[i];
              }
          }
            return null;
        },

        getObjects: (position) => this.mapArray[position.x][position.y],

        addObject: (obj, position) => {
            this.removeObject(obj);
            this.objects.push(obj);
            this.getObjects(position.x, position.y).push(obj);
        },

        removeObject: obj => {
            this.objects = this.arrayRemove(this.objects, obj);
            var oldPos = obj.getMapPos();
            if (this.onMap(oldPos)) {
                var objs = this.getObjects(oldPos);
                this.mapArray[oldPos.y][oldPos.x] = this.arrayRemove(objs, obj);
            }
        },

        arrayRemove: (array, obj) => {
            var index = array.indexOf(obj);
            if(index > -1) {
                array.splice(index, 1);
            }
            return array;
        },

        load: mapData => {
            var x, y;
            for(y = 0; y<8; y++) {
                var row = mapData[y].split('');
                for(x = 0; x < 8; x++) {
                    this.loadObject(row[x], x, y);
                }
            }
        },

        loadObject: (key, x, y) => {
            var obj = this.createObject(key);
            if(obj) {
                if(obj.classRef === )
            }
        }



   };
});
