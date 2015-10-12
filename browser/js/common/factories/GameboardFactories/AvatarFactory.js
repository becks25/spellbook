app.factory('AvatarFactory', function(MapObjectFactory, AuthService, UserFactory){

	//var theUser;
	// function getUser(){
	// 	return AuthService.getLoggedInUser()
 //    		.then(function(user){
 //    			console.log("user in AvatarFactory", user)
 //    			theuser =  user;
 //    		})

	// }

	// var character;

	

	// function getAvatar (){
	// 	console.log("getting the avatar...in AvatarFactory")
	// 	return getUser()
	// 	.then(function(user){
	// 		console.log("inside get avatart fact", user)
	// 		console.log("the user info", user)
	// 		character = user;
	// 	})
	// }

	// getAvatar();
	

	
	// = getAvatar();
	// function LogName(){
	// console.log("the char name type", character)
	// console.log( "the user")
	// 	}

	// 	LogName();

	//var name;


	function getUser(){
		return AuthService.getLoggedInUser()
		.then(function(user){
			console.log("in get user", user)
			return UserFactory.find(user._id)
		})
	}

	// var coolName;
	// var placeholder = getUser()
	// .then(function(user){
	// 	console.log("trying to get name", user)
	// 	var coolName = user.character.name;
	// 	console.log("and here's the name", name)
	// 	})


	function writeName(){
		console.log("the name", name)
		return name;

	}

	writeName();






  class Avatar extends MapObjectFactory {

  	
  	constructor(name, position, action, variables){
  		super(name, position, action, variables)
      	this.type = 'Avatar';
      	//this.placeholder = placeholder
      	this.name = writeName();
      	console.log("in the obj NOW", this.name)
      	console.log("the this thing", this)
      }


        
  }




  return Avatar;

  
});