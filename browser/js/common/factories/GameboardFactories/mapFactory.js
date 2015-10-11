/**
 * Created by Austin on 10/5/15.
 */
app.factory('MapFactory', function(ClassFactory, TilesizeFactory, AuthService, UserFactory) {
    class Map {
        // fat arrows allow for this to reference MapFactory and not the inner function
        constructor (mapData) {
            this.originalMap = mapData;
            this.avatar = this.getAvatar();
            this.objects = [];
            this.user = null;
            this.mapArray = this.makeBoard();

            this.load(mapData);
        }

        makeBoard (){
            var board = [];
            for(var i=0; i<TilesizeFactory.NumTiles; i++){
                board.push([]);
                for(var j=0; j<TilesizeFactory.NumTiles; j++){
                    board[i].push([]);
                } 
            }
            return board;
        }

        getUser(){
            return AuthService.getLoggedInUser()
                .then(function(user){
                    console.log("the user", user)
                    return user;
                })
        }

        resetMap(){
            Crafty("2D").each(function(i) {
                    this.destroy();
                
            });
            this.load(this.originalMap);
        }

        getAvatar (){
            console.log("getting the avatar...", this.getUser())
            return this.getUser()
                .then(function(user){
                    console.log("inside get avatar", user)
                    console.log(user.character)
                    return user.character
                })
        }


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
        }

        removeObject (obj, position) {
            var index= -1;
            var indices = [];
            // optional position arg for removing obj from specific place
            if(position){
            console.log('removing', obj, this.mapArray[position.x][position.y])
                this.mapArray[position.x][position.y].forEach((item, i) => {
                    if(item.name === obj.name || item.variable === obj.name){
                        indices.push(i);
                    }
                });
            } else {
                //this runs for removing the avatar
                this.objects.forEach((item, i) => {
                    if(item.name === obj.name || item.variable === obj.name){
                        index= i;
                    }
                });
            }
            for(let i=indices.length-1; i>=0; i--){
                this.mapArray[position.x][position.y].splice(indices[i], 1);
            }
            if (position) console.log('new objs', this.mapArray[position.x][position.y])
            this.objects.splice(index, 1);

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
                    mapData[x][y].forEach(object => {
                        this.loadObject(object, x, y);
                    })
                }
            }
        }

        //checks a map position for a given item and returns item or false
        checkPos (pos, itemName){
            console.log('in checkPos')
            console.log(pos, itemName, this.mapArray[pos.x][pos.y])
            var foundObj;
            this.mapArray[pos.x][pos.y].some(obj => {
                    if(obj.varName === itemName){
                        foundObj = obj;
                        return true;
                    }
                });
            return foundObj;
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
            return new ClassFactory[obj.type](obj.name, position, obj.action || null, obj.varName || null, obj.variables || null);
        }

        isPassable (position) {
            if (!this.onMap(position.x,position.y)) return false;

            var passable = this.mapArray[position.x][position.y].every((obj)=>obj.passable);
            return passable;
        }

        onMap (x,y) {
                if(x < 0 || y < 0 || x >= this.mapArray.length || y >= this.mapArray[0].length) return false;
                return true;
            }


   }
    return Map;
});
