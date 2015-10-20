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
			if (this.level.isSolved(argArr.length, this.countMoves(argArr))) return this.level.win();
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
  			this.currentCommand < spellArr.length-1 ? this.currentCommand ++ : this.currentCommand = null;
  		}
  		if (this.currentCommand!==null){
  			return this.executeCommand(spellArr[this.currentCommand]);
  		}
  	}
  	//loops through all the commands in the spell arr to count them
  	//TODO - use this to refactor step through to deep step
  	countMoves(spellArr, count){
  		if(!count) count = 0;
  		count += spellArr.length;
  		spellArr.forEach(component=> {
  			if(component.expressions && component.expressions.length)count = this.countMoves(component.expressions, count);
  		});
  		console.log('num moves', count)
  		return count;
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
console.log('executing', component)
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
            case 'moveRandom':
                var directions = ['down', 'up', 'left', 'right'];
                var randomDirection = directions[Math.floor(Math.random()*4)];
                return moveOne(randomDirection)
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
	    				this.level.updateReq('give', component.variable, toGive.varName);
    				}
    			}
    			break;
	    	case 'pickUp':
	    		//search the map objects on that position for the one that matches component.variable,
	    		var toPick = spell.map.checkPos(this.avatar.position, component.variable);
	    		if (toPick) {
	    			toPick.entity.destroy();
						spell.map.removeObject(toPick, this.avatar.position);
	    			spell.holding[component.variable] = true;
	    			spell.level.updateReq('pickUp', toPick.varName, 'noOne')
                }
	    		break;
	    	case 'ifStatement':
	    		if (component.condition.value(spell)){
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
	    		return promiseWhile(component.condition.value, executeExpressions);
	    		break;
	    	case 'forLoop':
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
	    		var toAsk = spell.map.checkPos(this.avatar.position, component.person);
	    		if (toAsk) {
	    			this.level.updateReq('ask', component.variable, toAsk.varName);
    			}
	    		break;
	    	case 'tell':
	    		var toAsk = spell.map.checkPos(this.avatar.position, component.person);
	    		if (toAsk) {
	    			this.level.updateReq('tell', component.variable, toAsk.varName);
    			}
	    		break;
	    }

	    // ??component is inside the scope of the function that executeExpression is called in???
	    // used as action for promiseWhile()
	    function executeExpressions(){
	    	var expressions = Promise.map(component.expressions, (command)=>command);
	    	return expressions.each((command)=>spell.executeCommand(command));
	    }

	    // action is a function
	    function promiseWhile (condition, action){
		    if (!component.condition.value(spell)) return;
		    return action().then(promiseWhile.bind(null, condition, action));
		}

	    function moveOne(direction){
	    	var newPos = avatar.move(direction, 1);
	        if (newPos) {
	          // Do the move!
	          return avatar.promTweenQueen({x: newPos.x*TilesizeFactory.TILESIZE, y: newPos.y*TilesizeFactory.TILESIZE}, 200)
	          .then(()=>{
		          avatar.setMapPos(newPos);
	          });

	        } else {
	          // Bump!
	          var curPos = avatar.entity;
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
