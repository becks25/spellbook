app.factory('PersonFactory', function(MapObjectFactory){

  class Obstacle extends MapObjectFactory {
      constructor(name, position, action, variables){
      super(name, position, action, variables)
        this.type = 'Person';
      }
  }

  return Obstacle;

  
});