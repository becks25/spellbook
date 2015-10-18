app.factory('SpellComponentFactory', function(ConditionFnFactory, LARGE_AVATARS, SPRITES){
	return {
		possTools: ['move', 'ifStatement', 'whileLoop', 'forLoop', 'pickUp', 'give', 'tell', 'ask', 'moveRandom'],
		possDirections: ['up', 'down', 'left', 'right'],
		makeSpellVar: (variable)=>{
			var name = variable.text.split(' ').join('_');
            return {
            	name: name,
            	 text: variable.text,
            	  type: 'variable', 
            	  varType: variable.varType,
            	  //value is a function that returns true or false depending on the state of the game
            	  value: (spell) => {
            	  	return ConditionFnFactory[variable.fnType](variable.arg, spell);
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
	          toolObj.distance = 1;
	          toolObj.type = 'tool';
	          break;
            case 'moveRandom':
              toolObj.action ='moveRandom';
              toolObj.text = 'move random';
              toolObj.direction = 'down';
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
	        case 'ifStatement':
	          toolObj.action = 'ifStatement';
	          toolObj.text = 'if';
	          toolObj.condition = null;
	          toolObj.expressions = [];
	          toolObj.elseExpr = null;
	          toolObj.type = 'tool';
	          break;
	        case 'forLoop':
	          toolObj.action = 'forLoop';
	          toolObj.text = 'repeat';
	          toolObj.number = 1;
	          toolObj.expressions = [];
	          toolObj.type = 'tool';
	          break;
	        case 'whileLoop':
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
		},
		//creates an array of all the sprites with name and imgUrl props
	    buildSpritesObjList(){
	        var allSprites = [];
	        _.forIn(LARGE_AVATARS, (img, sprite)=>{
	            allSprites.push({name:sprite, img:img});
	        });
	        // for (let key of SPRITES){

	        // }
	        return allSprites;
	    }
	};

});

