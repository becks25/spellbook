app.factory('SpellComponentFactory', function(){
	return {
		makeToolObj: function(toolStr) {
		  var toolObj = {};
	      switch (toolStr) {
	        case 'move':
	          toolObj.action = 'move';
	          toolObj.text = 'move';
	          toolObj.direction = 'UP';
	          toolObj.distance = 1;
	          break;
	        case 'pickUp':
	          toolObj.action = 'pickUp';
	          toolObj.text = 'pick up';
	          toolObj.variable = null;
	          break;
	        case 'putDown':
	          toolObj.action = 'putDown';
	          toolObj.text = 'put down';
	          toolObj.variable = null;
	          break;
	        case 'ifStatement':
	          toolObj.action = 'ifStatement';
	          toolObj.text = 'if';
	          toolObj.condition = null;
	          toolObj.expression = null;
	          toolObj.elseExpr = null;
	          break;
	        case 'forLoop':
	          toolObj.action = 'forLoop';
	          toolObj.text = 'repeat';
	          toolObj.number = 1;
	          toolObj.expression = null;
	          break;
	        case 'whileLoop':
	          toolObj.action = 'whileLoop';
	          toolObj.text = 'repeat while';
	          toolObj.condition = null;
	          toolObj.expression = null;
	          break;
	        case 'ask':
	          toolObj.action = 'ask';
	          toolObj.text = 'ask';
	          toolObj.person = null;
	          toolObj.question = null;
	          break;
	        case 'tell':
	          toolObj.action = 'tell';
	          toolObj.text = 'tell';
	          toolObj.person = null;
	          toolObj.question = null;
	          break;
	      }
	      console.log(toolObj)
	      return toolObj;
		}
	};

});





// move: {
// 	action: 'move',
// 	direction: (enum)['up', 'down', 'left', 'right'],
// 	distance: Number
// }

// pickUp:{
// 	action: 'pickUp',
// 	variable: Object (ref to collectable)
// }

// putDown:{
// 	action: 'putDown',
// 	variable: Object (ref to collectable)
// }

// ifStatement: {
// 	action: 'ifStatement',
// 	condition: scope var (true or false),
// 	expression: another spell component,
// 	elseExpr: (opt) another spell component
// }

// whileLoop:{
// 	action: 'whileLoop',
// 	condition: scope var (true or false),
// 	expression: another spell component
// }

// forLoop: {
// 	action: 'whileLoop',
// 	number: Number,
// 	expression: another spell component
// }

// ask: {
// 	person: scope var,
// 	question: scope var
// }

// tell: {
// 	person: scope var,
// 	answer: scope var
// }