app.factory('ObstacleFactory', function(MapObjectFactory){

  class Obstacle extends MapObjectFactory {
  		constructor(name, position, action, variables){
  		super(name, position, action, variables)
      	this.type = 'Obstacle';
        this.passable = false;
  		}
	}

  return Obstacle;

  
});