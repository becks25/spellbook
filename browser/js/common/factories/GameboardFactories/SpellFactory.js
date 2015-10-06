app.factory('spellFactory', function(MapObjectFactory){
	// List of valid commands
  var CODES = ['fire', 'left', 'move', 'right', 'wait']

  class Spell 

  return {
	  init: (level) => {
	    this.level = level;
	    this.map = level.map;
	    this.key = level.key;
	    this.avitar = this.map.getAvitar();
	    this.reset();
	    this.reload();
	  },

	  reset: () => {
	    this.locks = 0;
	    this.ok = true;
	    this.running = false;
	    this.errors = {};
	    this.commands = [];
	  },
	  
	  lock: () => {
	    this.locks += 1;
	  },
	  
	  unlock: () => {
	    this.locks -= 1;
	    if (this.locks == 0) {
	      this.cycle();
	    }
	  },
	  
	  reload: () => {
	    var state = Level.getState(this.key);
	    $('#program').val(state.program || '');
	    $('#program').focus();
	  },
	  
	  save: () => {
	    var state = Level.getState(this.key);
	    state.program = $('#program').val();
	    Level.setState(this.key, state);
	  },
	  
	  run: function() {
	    this.save();
	    this.reset();
	    this.parse();
	    if (this.ok) {
	      this.execute();
	    }
	  },
	  
	  //grab items in spell box
	  //make (if nec) objects with action prop, and poss others
	  // make array of component objs
	  parse: function(){}

  }
  
};