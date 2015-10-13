app.factory('SpellComponentFactory', function(ConditionFnFactory){
	return {
		possTools: ['move', 'ifStatement', 'whileLoop', 'forLoop', 'pickUp', 'give', 'tell', 'ask'],
		possConcepts:['For Loop', 'While Loop', 'If-statements', 'Conditionals', 'Expressions', 'Movement'],
		possDirections: ['up', 'down', 'left', 'right'],
		makeSpellVar: (variable)=>{
			var name = variable.text.split(' ').join('_');
            return {
            	name: name,
            	 text: variable.text,
            	  value: false, 
            	  type: 'variable', 
            	  varType: variable.varType,
            	  //value is a function that returns true or false depending on the state of the game
            	  value: () => {
            	  	return ConditionFnFactory[variable.fnType](variable.arg);
            	  },
            	};
		},
		makeSpellDir: (dir) => {
	        return  {
	            name: dir,
	            text: dir,
	            type: 'direction',
	            varType: 'direction'
        	};
    	},
		makeToolObj: (toolStr) => {
		  var toolObj = {};
	      switch (toolStr) {
	        case 'move':
	          toolObj.action = 'move';
	          toolObj.text = 'move';
	          toolObj.direction = 'down';
	          value: null;
	          toolObj.distance = 1;
	          toolObj.type = 'tool';
	          break;
	        case 'pickUp':
	          toolObj.action = 'pickUp';
	          toolObj.text = 'pick up';
	          toolObj.variable = null;
	          toolObj.type = 'tool';

	          break;
	        case 'give':
	          toolObj.action = 'give';
	          toolObj.text = 'give';
	          toolObj.person = null;
	          toolObj.variable = null;
	          toolObj.type = 'tool';
	          break;
	        case 'If-Statement':
	          toolObj.action = 'ifStatement';
	          toolObj.text = 'if';
	          toolObj.condition = null;
	          toolObj.expressions = [];
	          toolObj.elseExpr = null;
	          toolObj.type = 'tool';
	          break;
	        case 'For Loop':
	          toolObj.action = 'forLoop';
	          toolObj.text = 'repeat';
	          toolObj.number = 1;
	          toolObj.expressions = [];
	          toolObj.type = 'tool';
	          break;
	        case 'While Loop':
	          toolObj.action = 'whileLoop';
	          toolObj.text = 'repeat while';
	          toolObj.condition = null;
	          toolObj.expressions = [];
	          toolObj.type = 'tool';
	          break;
	        case 'ask':
	          toolObj.action = 'ask';
	          toolObj.text = 'ask';
	          toolObj.person = null;
	          toolObj.variable = null;
	          toolObj.type = 'tool';
	          break;
	        case 'tell':
	          toolObj.action = 'tell';
	          toolObj.text = 'tell';
	          toolObj.person = null;
	          toolObj.variable = null;
	          toolObj.type = 'tool';
	          break;
	        default: 
	          toolObj.action = toolStr;
	          toolObj.text = toolStr;
	          toolObj.person = null;
	          toolObj.variable = null;
	          toolObj.type = toolStr;
	      }
	      return toolObj;
		}
	};

});

