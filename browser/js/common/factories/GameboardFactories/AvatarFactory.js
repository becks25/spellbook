app.factory('AvatarFactory', function(MapObjectFactory, AuthService, UserFactory){


  class Avatar extends MapObjectFactory {

  	
  	constructor(name, position, action, varName, variables, match){
  		super(name, position, action, varName, variables, match)
      	this.type = 'Avatar';
      	this.name = 'WizardBoy1';
      	this.picture = 'WizardBoy1';
      	// console.log("in the obj NOW", this.name)
      	// console.log("the this thing", this)

  //     	sayHi(){
		// var name;
		// AuthService.getLoggedInUser()
		// .then(function(user){
		// 	console.log("look here", user);
		// 	this.name = user.character.picture;
		// 	//return name;
		// 	//console.log(name);
		// })
		// console.log("hi");
		//console.log("down below", name)
		//return name;
	
  }

}


  return Avatar;


  
});