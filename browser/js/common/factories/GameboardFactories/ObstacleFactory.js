app.factory('ObstacleFactory', function(MapObjectFactory){

  class Obstacle extends MapObjectFactory {
  		constructor(name, position, action, varName, variables, match){
  		super(name, position, action, varName, variables, match)
      	this.type = 'Obstacle';
        this.passable = false;
  		}
	}

  return Obstacle;

  
});