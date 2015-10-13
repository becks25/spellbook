app.factory('SpellComponentFactory', function(){
	return {
		possTools: ['move', 'ifStatement', 'whileLoop', 'forLoop', 'pickUp', 'give', 'tell', 'ask'],
		possConcepts: ['expressions', 'movement', 'if statements', 'while loops', 'for loops' ],
		makeToolObj: function(toolStr) {
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

