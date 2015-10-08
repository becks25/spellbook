/**
 * Created by Austin on 10/5/15.
 */
app.factory('MapFactory', function(ClassFactory) {
    class Map {
        // fat arrows allow for this to reference MapFactory and not the inner function
        constructor (mapData) {
            console.log('map', mapData);

            this.originalMap = mapData;
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
            console.log('%%%%%%%%%% mapArray after load', this.mapArray) //empty
            console.log('objects on map?', this.objects) //only tree2????
        }
        // destroy () {
        //     // this.each(obj => {
        //     //     obj.destroy();
        //     // });


        //     this.objects = [];

        //     // this.mapArray = null;


        // }

        resetMap(){
            console.log('map reset', this);
            Crafty("2D").each(function(i) {
                console.log('entity', this);
                    this.destroy();
                
            });
            this.load(this.originalMap);
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
            return this.mapArray[position.x][position.y];
        }

        addObject (obj, position) {
            this.removeObject(obj);
            this.objects.push(obj);
            this.mapArray[position.x][position.y].push(obj);

            //this.getObjects(position).push(obj);
        }

        removeObject (obj) {
            var index= -1;
            this.objects.forEach((item, i) => {
                if(item.name === obj.name){
                    index= i;
                }
            });
            this.objects.splice(index, 1);

            // var oldPos = obj.getMapPos();
            // if (this.onMap(oldPos)) {
            //     // var objs = this.getObjects(oldPos);
            //     // var i = this.mapArray[oldPos.x][oldPos.y].indexOf(obj);
            //     // this.mapArray[oldPos.x][oldPos.y].splice(i, 1);

            //     var i= this.getObjects(oldPos).indexOf(obj);
            //     this.getObjects(oldPos).splice(i, 1);
            // }
        }

        arrayRemove (array, obj) {
            var index = array.indexOf(obj);
            if(index > -1) {
                array.splice(index, 1);
            }
            return array;
        }

        load (mapData) {
            console.log('loading');
            var x, y;
            var len = mapData.length;
            for(x = 0; x< len; x++) {
                for(y = 0; y < len; y++) {
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

            console.log(obj);
            //this.objects.push(obj);

            obj.setMap(this);
            var position = {x: x, y: y};

            obj.setMapPos(position);
        }

        createObject (obj, x, y) {
            var position = {x: x, y: y};
            return new ClassFactory[obj.type](obj.name, position, obj.action || null, obj.variables || null);
        }

        isPassable (position) {
            console.log('running map.isPassable')
            console.log('mapArray', typeof this.mapArray[position.x][position.y], this.mapArray[position.x][position.y])
            console.log('))))))))) looking for map objects', this.objects) //just the avatar, though sometimes an Avatar and sometimes and Obstacle
            if (!this.onMap(position.x,position.y)) return false;

            

            // this.each(position.x, position.y, obj => {
            //     if (!obj.isPassable()) {
            //         passable = false;
            //     }
            // });

            var passable = this.mapArray[position.x][position.y].every(obj => { //never run bc array is empty
                console.log('$$$$$$$$$$$$$ passible obj?', obj); 
                return obj.passable === true;
                
            });
            return passable;
        }

        onMap (x,y) {
                if(x < 0 || y < 0 || x >= this.mapArray.length || y >= this.mapArray[0].length) return false;
                return true;
            }


   }
    return Map;
});
