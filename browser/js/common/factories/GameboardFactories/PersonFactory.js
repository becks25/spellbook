app.factory('PersonFactory', function(MapObjectFactory){

  class Obstacle extends MapObjectFactory {
      constructor(name, position, action, varName, variables, match){
      	super(name, position, action, varName, variables, match);
        this.type = 'Person';
      }
  }

  return Obstacle;

  
});