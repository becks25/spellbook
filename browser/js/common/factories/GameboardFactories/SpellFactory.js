app.factory('spellFactory', function(LevelFactory){
	// List of valid commands
  var CODES = ['move', 'if', 'loop', 'pickUp', 'putDown', 'ask', 'tell'];

  class Spell {
  	constructor(level){
  		this.level = level;
	    this.map = level.map;
	    this.key = level.key;
	    this.avatar = this.map.getAvatar();
	    this.reset();
	    // this.reload();
  	}

	reset (){
		this.locks = 0;
		this.ok = true;
		this.running = false;
		this.errors = {};
		this.commands = [];
		this.level.resetMap();
	}

	lock (){
		this.locks += 1;
	}

	unlock (){
		this.locks -= 1;
		if (this.locks === 0) {
		  this.cycle();
		}
	}

	// reload(){
	// 	var state = Level.map;
	// 	$('#spell-box').val(state.program || '');
	// 	$('#spell-box').focus();
	// }

	// save(){
	// 	var state = Level.getState(this.key);
	// 	state.program = $('#spell-box').val();
	// 	Level.setState(this.key, state);
	// }

	run(){
		// this.save();
		this.reset();
		// this.parse();
		if (this.ok) {
		  this.execute();
		}
		if (isSolved()) return this.level.win();
		else return this.level.lose();
	}

	//grab items in spell box
	//make (if nec) objects with action prop, and poss others
	// make array of component objs
	parse(){}
		//todo - how are spells being stored/passed in???
		//do we need to translate them?
  	}

 //  	execute() {
	//     this.running = true;
	//     this.cycle(this.avatar.position);

	//     this.executeCommand()
	// }

	// //cycles all events on a particular position
	// cycle(positionObj) {
	//     if (!this.running) { return; }
	//       this.map.each(function(obj) {
	//         obj.onCycle();
	//       });
 //    	}
	// }
      
 //    // Get command and run it!
 //    if (!this.running) { return; }
 //    var cmd = this.commands[this.currentCommand];
 //    var amt = cmd.amt;
 //    if (amt === null) { amt = 1; }
 //    // for (var times=0;times < amt; times++) {
 //    this.executeCommand(cmd.code);
 //    // }
 //  },

	// executeCommand (component) {
	//     //component is an obj that was part of the array of components dragged to the spell
	//     //has props for action, and any other additional props
	//     var spell = this;
	//     var avatar = this.avatar;
	//     var map = this.map;
	    
	//     // Lock for initial command, more locks may be applied by animations, etc.
	//     program.lock();
	    
	// }
  return Spell;


  });