app.factory('SpellFactory', function(TilesizeFactory){
	// List of valid commands

  class Spell {
  	constructor(level){
  		this.level = level;
	    this.map = level.map;
	    this.key = level.key;
	    this.avatar = this.map.getAvatar();
	    this.currentCommand = null;
	   	this.holding = [];
	    this.reset();
	    // this.reload();
  	}

	reset (){
		// this.locks = 0;
		this.ok = true;
		this.running = false;
		this.errors = {};
		this.commands = [];
		this.map.resetMap();
		this.avatar = this.map.getAvatar();
		this.level.resetRequirements();
		this.currentCommand = null;
		this.holding = {};
	}

	lock (){
		this.locks += 1;
	}

	unlock (){
		this.locks -= 1;
		if (this.locks === 0) {
		  this.cycle(this.avatar.position);
		}
	}

	//runs the whole program, acts if solved/unsolved
	run(argArr){
		// this.save();
		this.reset();
		// this.parse();
		if (this.ok) {
		  return this.execute(argArr)
		  .then(()=>{
			if (this.level.isSolved()) return this.level.win();
			else return this.level.lose();
		  });
		}
	}

  	//this stepThough function runs through spell components by index,
  	//which solves the problem of repeated commands
  	// spell arr can't be changed during function (the stuff already stepped through can't change)
	stepThrough(spellArr){
  		if(this.currentCommand === null) {
  			this.reset();
  			this.currentCommand = 0;

  		} else {
  			console.log(this.currentCommand)
  			this.currentCommand < spellArr.length-1 ? this.currentCommand ++ : this.currentCommand = null;
  		}
  		if (this.currentCommand!==null){
  			return this.executeCommand(spellArr[this.currentCommand]);
  		}
  	}


  	//executes the spell
  	execute(argArr){
	    // this.running = true;
	    this.cycle(this.avatar.position);
	    // var noPromSpellArr = this.parse(argArr);
	    //makes a promise for the spell arr to use with Promise.each
	    var spellArr = Promise.map(argArr, spell => spell);
	    // run async execute command fn on each of the commands in the spell, serially
	    // return Promise.reduce(argArr, (nothing, component) => {
	    // 	console.log('component', component)
	    //  return this.executeCommand(component);
		// });
	    return spellArr.each((component) => this.executeCommand(component));
	    this.running = false;
	    return Promise.resolve(spellArr);
	}

	//cycles all events on a particular position
	cycle(position) {
	    // if (!this.running) return;
	    this.map.mapArray[position.x][position.y].forEach(obj=>obj.onCycle());
	}

	//executes single step of spell arr
	executeCommand (component) {
	    //component is an obj that was part of the array of components dragged to the spell
	    //has props for action, and any other additional props
	    var spell = this;
	    var avatar = this.avatar;
	    var map = this.map;

	    // Lock for initial command, more locks may be applied by animations, etc.
	    // this.lock();

	    switch(component.action){
	    	case 'move':
	    		var distArr = [];
	    		for(var i = 0; i<component.distance; i++){
	    			distArr.push(i);
	    		}
	    		var promArr = Promise.map(distArr, (num)=>num)
	    		return promArr.each(()=>moveOne(component.direction))
	    		.then(()=>spell.cycle(avatar.position));

	    		// return Promise.reduce(distArr, (nothing, num)=>moveOne(component.direction))
	    		// .then(()=>spell.cycle(avatar.position));
	    	case 'give':
            	// collectable obj (ref) has to be passed into the function as .variable
            	//search map pos for person to give to
            	var toGive = spell.map.checkPos(this.avatar.position, component.person);
	    		if (toGive) {
    				if(spell.holding[component.variable]){
    					spell.holding[component.variable] = false;
	    				this.level.updateReq(toGive, 'give', component.variable);
    				}
    			}
    			break;
	    	case 'pickUp':
	    		console.log('picking up', component.variable)
	    		//search the map objects on that position for the one that matches component.variable,
	    		var toPick = spell.map.checkPos(this.avatar.position, component.variable);
	    		if (toPick) {
	    			console.log('found it')
	    			toPick.entity.destroy();
	    			// console.log('before set', toPick.entity)
	    			// toPick.setMapPos({x:3, y:3})
	    			// spell.map.removeObject(toPick, this.avatar.position);
	    			spell.holding[component.variable] = true;
	    			spell.level.updateReq(component.variable, 'pickUp', 'val')
                }
	    		break;
	    	case 'ifStatement':
	    		if (component.condition){
	    			var expressions = Promise.map(component.expressions, (command)=>command);
	    			return expressions.each(command => spell.executeCommand(command));

	    			// return Promise.reduce(component.expressions,(nothing, command)=> spell.executeCommand(command));
	    		}
	    		else if (component.elseExpr) {
	    			var expressions = Promise.map(component.elseExpr, (command)=>command);
	    			return expressions.each(command => spell.executeCommand(command));

	    			// return Promise.reduce(component.expressions, (nothing, command)=> spell.executeCommand(command));
	    		}
	    		break;
	    	case 'whileLoop':
	    		return promiseWhile(component.condition, executeExpressions);
	    		break;
	    	case 'forLoop':
	    		console.log('for loop')
	    		var numArr = [];
	    		for(var i = 0; i<component.number; i++){
	    			numArr.push(i);
	    		}
	    		promArr = Promise.map(numArr, (num)=>num)
	    		var expressions = Promise.map(component.expressions, (command)=>command);
	    		return promArr.each(()=>expressions.each((command)=> this.executeCommand(command)));
	    		// return Promise.reduce(numArr, (nothing)=>expressions.each((command)=> spell.executeCommand(command)));
	    		break;
	    	case 'ask':
	    	//not sure what these do
	    		console.log('asking')
	    		var toAsk = spell.map.checkPos(this.avatar.position, component.person);
	    		if (toAsk) {
	    			this.level.updateReq(toAsk, 'ask', component.variable);
    			}
	    		break;
	    	case 'tell':
	    		console.log('telling')
	    		var toAsk = spell.map.checkPos(this.avatar.position, component.person);
	    		if (toAsk) {
	    			this.level.updateReq(toAsk, 'ask', component.variable);
    			}
	    		break;
	    }

	    // ??component is inside the scope of the function that executeExpression is called in???
	    // used as action for promiseWhile()
	    function executeExpressions(){
	    	var expressions = Promise.map(component.expressions, (command)=>command);
	    	return expressions.each((command)=>spell.executeCommand(command))
	    }

	    // action is a function
	    function promiseWhile (condition, action){
		    if (!condition) return;
		    return action().then(promiseWhile.bind(null, condition, action));
		}

	    function moveOne(direction){
	    	var newPos = avatar.move(direction, 1);
	        if (newPos) {
	          // Do the move!
	          console.log(newPos)
	          return avatar.promTweenQueen({x: newPos.x*TilesizeFactory.TILESIZE, y: newPos.y*TilesizeFactory.TILESIZE}, 200)
	          .then(()=>{
		          avatar.setMapPos(newPos);
	          });

	        } else {
	          // Bump!
	          console.log('bump')
	          var curPos = avatar.entity;
	          // var newPos = curPos.dup().addDir(direction, 8);
	          var heightBump = 0;
	          var latBump = 0;
	          switch (direction){
	          	case 'down':
	          		heightBump = TilesizeFactory.TILESIZE/4;
	          		break;
	          	case 'up':
	          		heightBump = 0 - TilesizeFactory.TILESIZE/4;
	          		break;
	          	case 'left':
	          		latBump = 0 - TilesizeFactory.TILESIZE/4;
	          		break;
	          	case 'right':
	          		latBump = TilesizeFactory.TILESIZE/4;
	          		break;

	          }
	          return avatar.promTweenQueen({x: curPos.x + latBump, y: curPos.y + heightBump}, 100)
	          .then(()=>{
	            return avatar.promTweenQueen({x: curPos.x - latBump, y: curPos.y - heightBump}, 100)
	          }).then(()=>{
	            return Promise.delay(400);
	          });
	      	}

	    }


	}



  }
  return Spell;
  });
