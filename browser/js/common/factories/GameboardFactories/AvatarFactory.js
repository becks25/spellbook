app.factory('AvatarFactory', function(MapObjectFactory){

  class Avatar extends MapObjectFactory {
  	constructor(name, position, action, variables){
  		super(name, position, action, variables)
      	this.type = 'Avatar';
  }
}

  return Avatar;

  
});