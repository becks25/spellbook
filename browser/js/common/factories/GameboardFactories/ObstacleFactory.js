app.factory('ObstacleFactory', function(MapObjectFactory){

  class Obstacle extends MapObjectFactory {
  		constructor(name, position, action, variables){
  		super(name, position, action, variables)
      	this.type = 'Obstacle';
  		}
	}

  return Obstacle;

  
});